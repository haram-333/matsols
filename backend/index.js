import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET || "matsols-super-secret-key-2026";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- Health Check ---
app.get("/api/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health Check Error:", error);
    res.status(500).json({
      status: "error",
      database: "disconnected",
      error: error.message,
      // Only show partial URL for security if available
      db_initialized: !!process.env.DATABASE_URL,
    });
  }
});

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Access denied. Token missing." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ error: "Invalid or expired token." });
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json({ error: "Unauthorized. Admin access required." });
  }
  next();
};

// --- Auth Endpoints ---

// Register
app.post("/api/auth/register", async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role: role || "STUDENT" },
    });
    res
      .status(201)
      .json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    console.error("Registration Error:", error);
    if (error.code === "P2002")
      return res.status(400).json({ error: "Email already exists" });
    res.status(500).json({
      error: "Registration failed",
      details: error.message,
      code: error.code,
    });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" },
    );
    res.json({
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// --- Degree Endpoints ---

// Get all degrees
app.get("/api/degrees", async (req, res) => {
  try {
    const degrees = await prisma.degree.findMany({
      orderBy: { name: "asc" },
    });
    res.json(degrees);
  } catch (error) {
    console.error("Fetch Degrees Error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch degrees", details: error.message });
  }
});

// Get single degree by slug
app.get("/api/degrees/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const degree = await prisma.degree.findUnique({
      where: { slug },
    });
    if (!degree) return res.status(404).json({ error: "Degree not found" });
    res.json(degree);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch degree details" });
  }
});

// --- Lead Endpoints ---

// Submit a new lead
app.post("/api/leads", async (req, res) => {
  const { fullName, email, phone, citizenship, targetCountry } = req.body;
  try {
    const lead = await prisma.lead.create({
      data: { fullName, email, phone, citizenship, targetCountry },
    });
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ error: "Failed to submit lead" });
  }
});

// Admin: Get all leads
app.get("/api/leads", authenticateToken, isAdmin, async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

// Admin: Update lead status/priority
app.put("/api/leads/:id", authenticateToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { status, priority } = req.body;
  try {
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(priority && { priority }),
      },
    });
    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ error: "Failed to update lead" });
  }
});

// Admin: Delete lead
app.delete("/api/leads/:id", authenticateToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.lead.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete lead" });
  }
});

// Advanced chat endpoint with keyword-search RAG logic
app.post("/api/chat", authenticateToken, async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    // 1. Persist the user message
    await prisma.chatMessage.create({
      data: { userId, role: "user", content },
    });

    // 2. Simple "RAG" - Search database for context
    const keywords = content
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 3);
    let contextDegrees = [];

    if (keywords.length > 0) {
      contextDegrees = await prisma.degree.findMany({
        where: {
          OR: [
            { name: { contains: keywords[0], mode: "insensitive" } },
            ...keywords
              .slice(1)
              .map((kw) => ({ name: { contains: kw, mode: "insensitive" } })),
            ...keywords.map((kw) => ({
              about: { contains: kw, mode: "insensitive" },
            })),
          ],
        },
        take: 3,
      });
    }

    // 3. Build AI Response (Simulated RAG output)
    let reply =
      "I'm your MATSOLS advisor. Could you tell me more about your academic goals?";

    if (contextDegrees.length > 0) {
      reply = `Based on your interest, I found some great options for you: ${contextDegrees.map((d) => d.name).join(", ")}. Would you like to know about the admission requirements for these?`;
    } else if (
      content.toLowerCase().includes("visa") ||
      content.toLowerCase().includes("apply")
    ) {
      reply =
        "Visa requirements depend on your target country (UK, USA, Canada). I can help you prepare the right documents once you select a program.";
    }

    // 4. Persist and return the bot response
    const botMessage = await prisma.chatMessage.create({
      data: { userId, role: "agent", content: reply },
    });

    res.status(201).json(botMessage);
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Failed to process chat" });
  }
});

// Get chat history for the logged-in user
app.get("/api/messages", authenticateToken, async (req, res) => {
  try {
    const messages = await prisma.chatMessage.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "asc" },
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// --- Updates Endpoints ---

// Get all updates
app.get("/api/updates", async (req, res) => {
  try {
    const updates = await prisma.update.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(updates);
  } catch (error) {
    console.error("Fetch Updates Error:", error);
    res.status(500).json({
      error: "Failed to fetch updates",
      details: error.message,
      code: error.code,
    });
  }
});

// Create new update
app.post("/api/updates", authenticateToken, isAdmin, async (req, res) => {
  const {
    title,
    category,
    date,
    excerpt,
    image,
    isImportant,
    expiryDate,
    ctaText,
    ctaLink,
  } = req.body;

  // Transform empty strings to null for optional fields and handle date parsing
  const formattedExpiry = expiryDate ? new Date(expiryDate) : null;

  try {
    const update = await prisma.update.create({
      data: {
        title,
        category,
        date,
        excerpt,
        image: image || null,
        isImportant: isImportant || false,
        expiryDate: formattedExpiry,
        ctaText: ctaText || null,
        ctaLink: ctaLink || null,
      },
    });
    res.status(201).json(update);
  } catch (error) {
    console.error("Failed to create update:", error);
    res.status(500).json({ error: "Failed to create update" });
  }
});

// Delete update
app.delete("/api/updates/:id", authenticateToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.update.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete update" });
  }
});

// --- University Endpoints ---

// Get all universities
app.get("/api/universities", async (req, res) => {
  try {
    const universities = await prisma.university.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(universities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch universities" });
  }
});

// Create new university
app.post("/api/universities", authenticateToken, isAdmin, async (req, res) => {
  const {
    name,
    country,
    image,
    websiteUrl,
    description,
    about,
    campusLife,
    admissionCriteria,
    rank,
    location,
    status,
  } = req.body;
  try {
    const uni = await prisma.university.create({
      data: {
        name,
        country,
        image,
        websiteUrl,
        description,
        about,
        campusLife,
        admissionCriteria,
        rank,
        location,
        status: status || "Active",
      },
    });
    res.status(201).json(uni);
  } catch (error) {
    console.error("Create University Error:", error);
    res.status(500).json({ error: "Failed to create university" });
  }
});

// Update university
app.put(
  "/api/universities/:id",
  authenticateToken,
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    const {
      name,
      country,
      image,
      websiteUrl,
      description,
      about,
      campusLife,
      admissionCriteria,
      rank,
      location,
      status,
    } = req.body;
    try {
      const uni = await prisma.university.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(country && { country }),
          ...(image && { image }),
          ...(websiteUrl && { websiteUrl }),
          ...(description && { description }),
          ...(about && { about }),
          ...(campusLife && { campusLife }),
          ...(admissionCriteria && { admissionCriteria }),
          ...(rank && { rank }),
          ...(location && { location }),
          ...(status && { status }),
        },
      });
      res.json(uni);
    } catch (error) {
      console.error("Update University Error:", error);
      res.status(500).json({ error: "Failed to update university" });
    }
  },
);

// Delete university
app.delete(
  "/api/universities/:id",
  authenticateToken,
  isAdmin,
  async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.university.delete({ where: { id } });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete university" });
    }
  },
);

// Get single university
app.get("/api/universities/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const uni = await prisma.university.findUnique({ where: { id } });
    if (!uni) return res.status(404).json({ error: "University not found" });
    res.json(uni);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch university" });
  }
});

// --- Application Endpoints ---

// Submit a new application
app.post("/api/applications", authenticateToken, async (req, res) => {
  const { universityId, courseName } = req.body;
  if (!universityId || !courseName) {
    return res
      .status(400)
      .json({ error: "University and Course Name are required" });
  }

  try {
    const application = await prisma.application.create({
      data: {
        userId: req.user.id,
        universityId,
        courseName,
        status: "Submitted",
        step: 1,
      },
      include: { university: true },
    });
    res.status(201).json(application);
  } catch (error) {
    console.error("Failed to create application:", error);
    res.status(500).json({ error: "Failed to create application" });
  }
});

// Get user applications
app.get("/api/applications", authenticateToken, async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: { userId: req.user.id },
      include: { university: true },
      orderBy: { appliedDate: "desc" },
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// --- Document Endpoints ---

// Get user documents
app.get("/api/documents", authenticateToken, async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      where: { userId: req.user.id },
      orderBy: { uploadedAt: "desc" },
    });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

// Upload document metadata (simulated file upload)
app.post("/api/documents", authenticateToken, async (req, res) => {
  const { name, type, size, url } = req.body;
  try {
    const doc = await prisma.document.create({
      data: {
        userId: req.user.id,
        name,
        type,
        size,
        url,
        status: "Pending Review",
      },
    });
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload document" });
  }
});

// --- Admin Analytics Endpoints ---

// --- Real Admin Stats & Charts Endpoints ---
// --- Real Admin Stats & Charts Endpoints ---

app.get("/api/admin/stats", authenticateToken, async (req, res) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).json({ error: "Access denied" });
  try {
    const [totalStudents, underReview, totalLeads, totalApps] =
      await Promise.all([
        prisma.user.count({ where: { role: "STUDENT" } }),
        prisma.application.count({ where: { status: "Under Review" } }),
        prisma.lead.count(),
        prisma.application.count(),
      ]);

    // Estimated revenue based on applications (£500 per app as a baseline)
    const revenue = `£${(totalApps * 500).toLocaleString()}`;

    res.json({
      totalStudents,
      applicationsUnderReview: underReview,
      totalLeads,
      revenue,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

app.get("/api/admin/charts", authenticateToken, async (req, res) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).json({ error: "Access denied" });
  try {
    // Real Weekly Data (Registrations per day)
    const registrations = await prisma.user.findMany({
      where: { role: "STUDENT" },
      select: { createdAt: true },
    });

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const weeklyData = days.map((day) => ({ name: day, students: 0 }));

    registrations.forEach((reg) => {
      const dayIndex = (new Date(reg.createdAt).getDay() + 6) % 7; // Map 0 (Sun) to index 6, 1 (Mon) to 0
      weeklyData[dayIndex].students++;
    });

    // Real Destination Mix (Top countries from universities)
    const universities = await prisma.university.findMany({
      select: { country: true },
    });
    const countryCounts = {};
    universities.forEach((u) => {
      countryCounts[u.country] = (countryCounts[u.country] || 0) + 1;
    });

    const colors = ["#06b6d4", "#ff863c", "#6366f1", "#10b981", "#8b5cf6"];
    const countryData = Object.entries(countryCounts)
      .map(([name, value], index) => ({
        name,
        value: value * 10, // Multiplied for better visualization
        color: colors[index % colors.length],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    res.json({ weeklyData, countryData });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch charts" });
  }
});

// Get all applications (Admin Only)
app.get("/api/admin/applications", authenticateToken, async (req, res) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).json({ error: "Access denied" });
  try {
    const apps = await prisma.application.findMany({
      include: {
        user: { select: { fullName: true, email: true } },
        university: { select: { name: true, country: true } },
      },
      orderBy: { appliedDate: "desc" },
    });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// Update application status (Admin Only)
app.put("/api/admin/applications/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).json({ error: "Access denied" });
  const { status, step } = req.body;
  try {
    const updatedApp = await prisma.application.update({
      where: { id: req.params.id },
      data: { status, step },
    });
    res.json(updatedApp);
  } catch (error) {
    res.status(500).json({ error: "Failed to update application" });
  }
});

// Get all pending documents (Admin Only)
app.get("/api/admin/documents", authenticateToken, async (req, res) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).json({ error: "Access denied" });
  try {
    const docs = await prisma.document.findMany({
      where: { status: "Pending Review" },
      include: {
        user: { select: { fullName: true, email: true } },
      },
      orderBy: { uploadedAt: "desc" },
    });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

// Update document status (Admin Only)
app.put("/api/admin/documents/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).json({ error: "Access denied" });
  const { status } = req.body;
  try {
    const updatedDoc = await prisma.document.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(updatedDoc);
  } catch (error) {
    res.status(500).json({ error: "Failed to update document" });
  }
});

// --- Student Profile & Dashboard Endpoints ---

app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        email: true,
        fullName: true,
        phone: true,
        bio: true,
        location: true,
        avatar: true,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

app.put("/api/profile", authenticateToken, async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        fullName: req.body.fullName,
        phone: req.body.phone,
        bio: req.body.bio,
        location: req.body.location,
        avatar: req.body.avatar,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

app.get("/api/dashboard/summary", authenticateToken, async (req, res) => {
  try {
    const [apps, docs, actions] = await Promise.all([
      prisma.application.findMany({ where: { userId: req.user.id } }),
      prisma.document.findMany({ where: { userId: req.user.id } }),
      prisma.dashboardAction.findMany({
        where: { userId: req.user.id, isCompleted: false },
      }),
    ]);

    // Initialize default actions if none exist
    if (actions.length === 0) {
      const defaultActions = [
        {
          title: "Upload Passport Copy",
          description: "Required for visa processing",
          type: "upload",
          priority: "high",
        },
        {
          title: "Complete Profile Information",
          description: "Add your emergency contact details",
          type: "task",
          priority: "med",
          link: "/dashboard/settings",
        },
      ];
      // Create them for this user
      await Promise.all(
        defaultActions.map((a) =>
          prisma.dashboardAction.create({
            data: { ...a, userId: req.user.id },
          }),
        ),
      );
    }

    const latestActions = await prisma.dashboardAction.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    res.json({
      stats: {
        total: apps.length,
        inProgress: apps.filter((a) => a.status !== "Visa Process").length,
        offers: apps.filter((a) => a.status === "Offer Decision").length,
        needed: docs.filter((d) => d.status === "Rejected").length,
      },
      latestApp: apps[0] || null,
      actions: latestActions,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard summary" });
  }
});

// --- System Settings Endpoints ---

// Get current system settings (Publicly accessible for toggles, though restricted fields could be hidden)
app.get("/api/settings", async (req, res) => {
  try {
    let settings = await prisma.systemSetting.findUnique({
      where: { id: "singleton" },
    });

    if (!settings) {
      // Initialize with defaults if not exists
      settings = await prisma.systemSetting.create({
        data: { id: "singleton" },
      });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

// Update system settings (Admin only)
app.post("/api/settings", authenticateToken, async (req, res) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const updatedSettings = await prisma.systemSetting.upsert({
      where: { id: "singleton" },
      update: req.body,
      create: { ...req.body, id: "singleton" },
    });
    res.json(updatedSettings);
  } catch (error) {
    console.error("Settings Update Error:", error);
    res.status(500).json({ error: "Failed to update settings" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
