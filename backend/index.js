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
    if (error.code === "P2002")
      return res.status(400).json({ error: "Email already exists" });
    res.status(500).json({ error: "Registration failed" });
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
    res.status(500).json({ error: "Failed to fetch degrees" });
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

// Advanced chat endpoint with keyword-search RAG logic
app.post("/api/chat", async (req, res) => {
  const { sessionId, content } = req.body;

  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    // 1. Persist the user message
    await prisma.chatMessage.create({
      data: { sessionId, role: "user", content },
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
      data: { sessionId, role: "agent", content: reply },
    });

    res.status(201).json({
      ...botMessage,
      reply, // for frontend compatibility
    });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Failed to process chat" });
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
    res.status(500).json({ error: "Failed to fetch updates" });
  }
});

// Create new update
app.post("/api/updates", authenticateToken, isAdmin, async (req, res) => {
  const { title, category, date, excerpt, image } = req.body;
  try {
    const update = await prisma.update.create({
      data: { title, category, date, excerpt, image },
    });
    res.status(201).json(update);
  } catch (error) {
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

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
