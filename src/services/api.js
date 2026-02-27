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

  // AI Chat
  async getAIChatResponse(message, sessionId) {
    try {
      const resp = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message, sessionId }),
      });
      return await resp.json();
    } catch (error) {
      return Promise.resolve({
        content:
          "I'm currently in offline mode. Please check your connection to chat with the live MATSOLS AI.",
      });
    }
  },

  // Updates (CMS)
  async getUpdates() {
    try {
      const resp = await fetch(`${API_BASE_URL}/updates`);
      if (!resp.ok) throw new Error("Backend unreachable");
      return await resp.json();
    } catch (error) {
      console.warn("Using local fallback for Updates");
      const saved = localStorage.getItem("matsols_updates");
      const { initialUpdates } = await import("../data/updatesData");
      return saved ? JSON.parse(saved) : initialUpdates;
    }
  },

  async createUpdate(updateData) {
    try {
      const resp = await fetch(`${API_BASE_URL}/updates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      });
      return await resp.json();
    } catch (error) {
      console.error("Failed to delete update:", error);
      return Promise.resolve({ success: false });
    }
  },
};
