import { API_CONFIG } from "../config/api.config";
import type { Feedback, PaginatedFeedbacksResponse } from "../types/feedback.types";

export const feedbackApi = {
  // Get all feedbacks
  getFeedbacks: async (page: number, limit: number): Promise<PaginatedFeedbacksResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await fetch(
      `${API_CONFIG.BASE_URL}/api/feedback?page=${page}&limit=${limit}`,
      {
        method: API_CONFIG.METHODS.GET,
        headers: API_CONFIG.DEFAULT_HEADERS,
      }
    );

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      throw new Error(
        errorData.message || `Request failed with status ${response.status}`
      );
    }
    const result = await response.json();
    return result;
  },

  // Submit new feedback
  submitFeedback: async (
    data: Omit<Feedback, "id" | "createdAt">
  ): Promise<Feedback> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(`${API_CONFIG.BASE_URL}/api/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      throw new Error(
        errorData.message || `Request failed with status ${response.status}`
      );
    }
    return response.json();
  },
};
