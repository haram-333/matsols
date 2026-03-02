import { degreesData } from "../data/degreesData";

// API Configuration
// Use 'http://localhost:5000/api' for local development
// Use your Hostinger domain (e.g., 'https://yourdomain.com/api') for production
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "/api";

export const apiService = {
  // Degrees
  async getAllDegrees() {
    try {
      const resp = await fetch(`${API_BASE_URL}/degrees`);
      if (!resp.ok) throw new Error("Backend unreachable");
      return await resp.json();
    } catch (error) {
      console.warn("Using local fallback for Degrees");
      return Promise.resolve(degreesData);
    }
  },

  async getDegreeDetail(slug) {
    try {
      const resp = await fetch(`${API_BASE_URL}/degrees/${slug}`);
      if (!resp.ok) throw new Error("Backend unreachable");
      return await resp.json();
    } catch (error) {
      console.warn("Using local fallback for Degree Detail");
      const degree = degreesData.find((d) => d.slug === slug);
      return Promise.resolve(degree);
    }
  },

  // Leads
  async submitLead(leadData) {
    try {
      const resp = await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
      return await resp.json();
    } catch (error) {
      console.error("Lead submission failed:", error);
      return Promise.resolve({ success: false, message: "Server error" });
    }
  },

  async getLeads() {
    try {
      const resp = await fetch(`${API_BASE_URL}/leads`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
      });
      if (!resp.ok) throw new Error("Backend unreachable");
      return await resp.json();
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      return Promise.resolve([]);
    }
  },

  async updateLead(id, data) {
    try {
      const resp = await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
        body: JSON.stringify(data),
      });
      return await resp.json();
    } catch (error) {
      console.error("Failed to update lead:", error);
      return Promise.resolve({ success: false });
    }
  },

  async deleteLead(id) {
    try {
      const resp = await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
      });
      return await resp.json();
    } catch (error) {
      console.error("Failed to delete lead:", error);
      return Promise.resolve({ success: false });
    }
  },

  // --- Universities ---
  async getUniversities() {
    try {
      const resp = await fetch(`${API_BASE_URL}/universities`);
      if (!resp.ok) throw new Error("Backend unreachable");
      return await resp.json();
    } catch (error) {
      console.error("Failed to fetch universities:", error);
      return Promise.resolve([]);
    }
  },

  async getUniversityById(id) {
    try {
      const resp = await fetch(`${API_BASE_URL}/universities/${id}`);
      if (!resp.ok) throw new Error("University not found");
      return await resp.json();
    } catch (error) {
      console.error("Failed to fetch university by ID:", error);
      return null;
    }
  },

  async createUniversity(data) {
    try {
      const resp = await fetch(`${API_BASE_URL}/universities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
        body: JSON.stringify(data),
      });
      return await resp.json();
    } catch (error) {
      console.error("Failed to create university:", error);
      return Promise.resolve({ success: false });
    }
  },

  async updateUniversity(id, data) {
    try {
      const resp = await fetch(`${API_BASE_URL}/universities/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
        body: JSON.stringify(data),
      });
      return await resp.json();
    } catch (error) {
      console.error("Failed to update university:", error);
      return Promise.resolve({ success: false });
    }
  },

  async deleteUniversity(id) {
    try {
      const resp = await fetch(`${API_BASE_URL}/universities/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
      });
      return await resp.json();
    } catch (error) {
      console.error("Failed to delete university:", error);
      return Promise.resolve({ success: false });
    }
  },

  // AI Chat
  async getAIChatResponse(message) {
    try {
      const resp = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
        body: JSON.stringify({ content: message }),
      });
      return await resp.json();
    } catch (error) {
      return Promise.resolve({
        content:
          "I'm currently in offline mode. Please check your connection to chat with the live MATSOLS AI.",
      });
    }
  },

  async fetchChatHistory() {
    try {
      const resp = await fetch(`${API_BASE_URL}/messages`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
      });
      if (!resp.ok) throw new Error("Failed to fetch chat history");
      return await resp.json();
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
      return [];
    }
  },

  // Authentication
  async login(email, password) {
    try {
      const resp = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      return await resp.json();
    } catch (error) {
      console.error("Login failed:", error);
      return { error: "Server connection failed" };
    }
  },

  async register(userData) {
    try {
      const resp = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      return await resp.json();
    } catch (error) {
      console.error("Registration failed:", error);
      return { error: "Server connection failed" };
    }
  },

  // Updates (CMS)
  async getUpdates() {
    try {
      const resp = await fetch(`${API_BASE_URL}/updates`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
      });
      if (!resp.ok) throw new Error("Backend unreachable");
      const data = await resp.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.warn("Using local fallback for Updates");
      try {
        const saved = localStorage.getItem("matsols_updates");
        if (saved) return JSON.parse(saved);

        const { initialUpdates } = await import("../data/updatesData");
        // Convert object structure to flat array if needed
        if (initialUpdates && !Array.isArray(initialUpdates)) {
          const flat = [
            ...(initialUpdates.hero || []),
            ...(initialUpdates.grid || []),
          ].map((u) => ({
            ...u,
            category: u.badge,
            excerpt: u.desc,
          }));
          return flat;
        }
        return Array.isArray(initialUpdates) ? initialUpdates : [];
      } catch (e) {
        return [];
      }
    }
  },

  async createUpdate(updateData) {
    try {
      const resp = await fetch(`${API_BASE_URL}/updates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
        body: JSON.stringify(updateData),
      });
      return await resp.json();
    } catch (error) {
      console.error("Failed to create update:", error);
      return Promise.resolve({ success: false });
    }
  },

  async deleteUpdate(id) {
    try {
      const resp = await fetch(`${API_BASE_URL}/updates/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
      });
      return await resp.json();
    } catch (error) {
      console.error("Failed to delete update:", error);
      return Promise.resolve({ success: false });
    }
  },
  // --- Applications ---
  async getApplications() {
    try {
      const resp = await fetch(`${API_BASE_URL}/applications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
      });
      if (!resp.ok) throw new Error("Failed to fetch applications");
      return await resp.json();
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      return [];
    }
  },

  async createApplication(data) {
    try {
      const resp = await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
        body: JSON.stringify(data),
      });
      return await resp.json();
    } catch (error) {
      console.error("Failed to create application:", error);
      return { error: "Server error" };
    }
  },

  // --- Documents ---
  async getDocuments() {
    try {
      const resp = await fetch(`${API_BASE_URL}/documents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
      });
      if (!resp.ok) throw new Error("Failed to fetch documents");
      return await resp.json();
    } catch (error) {
      console.error("Failed to fetch documents:", error);
      return [];
    }
  },

  async uploadDocument(data) {
    try {
      const resp = await fetch(`${API_BASE_URL}/documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
        body: JSON.stringify(data),
      });
      return await resp.json();
    } catch (error) {
      console.error("Failed to upload document:", error);
      return { error: "Server error" };
    }
  },

  // --- Admin Analytics ---
  async getAdminStats() {
    try {
      const resp = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
      });
      if (!resp.ok) throw new Error("Failed to fetch admin stats");
      return await resp.json();
    } catch (error) {
      console.error("Failed to fetch admin stats:", error);
      return null;
    }
  },

  async getAdminCharts() {
    try {
      const resp = await fetch(`${API_BASE_URL}/admin/charts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
      });
      if (!resp.ok) throw new Error("Failed to fetch admin charts");
      return await resp.json();
    } catch (error) {
      console.error("Failed to fetch admin charts:", error);
      return null;
    }
  },

  // --- System Settings ---
  async getSettings() {
    try {
      const resp = await fetch(`${API_BASE_URL}/settings`);
      if (!resp.ok) throw new Error("Failed to fetch settings");
      return await resp.json();
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      return null;
    }
  },

  async updateSettings(data) {
    try {
      const resp = await fetch(`${API_BASE_URL}/settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
        body: JSON.stringify(data),
      });
      return await resp.json();
    } catch (error) {
      console.error("Failed to update settings:", error);
      return { error: "Server error" };
    }
  },

  // --- Profile & Dashboard ---
  async getProfile() {
    try {
      const resp = await fetch(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
      });
      if (!resp.ok) throw new Error("Failed to fetch profile");
      return await resp.json();
    } catch (error) {
      console.error("Profile Fetch Error:", error);
      return null;
    }
  },

  async updateProfile(data) {
    try {
      const resp = await fetch(`${API_BASE_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
        body: JSON.stringify(data),
      });
      return await resp.json();
    } catch (error) {
      console.error("Profile Update Error:", error);
      return { error: "Server error" };
    }
  },

  async getDashboardSummary() {
    try {
      const resp = await fetch(`${API_BASE_URL}/dashboard/summary`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
      });
      if (!resp.ok) throw new Error("Failed to fetch dashboard summary");
      return await resp.json();
    } catch (error) {
      console.error("Dashboard Summary Error:", error);
      return null;
    }
  },

  // --- Admin Application & Document Management ---
  async getAdminApplications() {
    try {
      const resp = await fetch(`${API_BASE_URL}/admin/applications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
      });
      if (!resp.ok) throw new Error("Failed to fetch admin applications");
      return await resp.json();
    } catch (error) {
      console.error("Admin Applications Fetch Error:", error);
      return [];
    }
  },

  async updateApplicationStatus(id, data) {
    try {
      const resp = await fetch(`${API_BASE_URL}/admin/applications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
        body: JSON.stringify(data),
      });
      return await resp.json();
    } catch (error) {
      console.error("Admin Application Update Error:", error);
      return { error: "Server error" };
    }
  },

  async getAdminDocuments() {
    try {
      const resp = await fetch(`${API_BASE_URL}/admin/documents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
      });
      if (!resp.ok) throw new Error("Failed to fetch admin documents");
      return await resp.json();
    } catch (error) {
      console.error("Admin Documents Fetch Error:", error);
      return [];
    }
  },

  async updateDocumentStatus(id, data) {
    try {
      const resp = await fetch(`${API_BASE_URL}/admin/documents/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("matsols_token")}`,
        },
        body: JSON.stringify(data),
      });
      return await resp.json();
    } catch (error) {
      console.error("Admin Document Update Error:", error);
      return { error: "Server error" };
    }
  },
};
