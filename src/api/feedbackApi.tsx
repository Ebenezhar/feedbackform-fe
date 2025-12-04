import { API_CONFIG } from "../config/api.config";
import type { Feedback } from "../types/feedback.types";

export const feedbackApi = {
  // Get all feedbacks
  getFeedbacks: async (): Promise<Feedback[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await fetch(`${API_CONFIG.BASE_URL}/api/feedback`, {
      method: API_CONFIG.METHODS.GET,
      headers: API_CONFIG.DEFAULT_HEADERS,
    });

    // IMPORTANT: Don't call response.json() twice
    if (!response.ok) {
      const err = await response.text();
      console.error("Fetch failed:", response.status, err);
      throw new Error(`Failed to fetch feedbacks: ${response.status}`);
    }
    const result = await response.json();
    return result.data; // returns the array
  },

  // Submit new feedback
  submitFeedback: async (
    data: Omit<Feedback, "id" | "createdAt">
  ): Promise<Feedback> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(`${API_CONFIG.BASE_URL}/api/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return response.json();
  },
};
