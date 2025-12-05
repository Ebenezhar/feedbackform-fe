import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Feedback,
  FeedbackState,
  PaginationInfo,
} from "../types/feedback.types";

const initialState: FeedbackState = {
  feedbacks: [],
  isLoading: false,
  error: null,
  paginationInfo: {
    current_page: 1,
    total_pages: 0,
    total_items: 0,
    has_next: false,
    has_previous: false,
  },
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedbacks: (state, action: PayloadAction<Feedback[]>) => {
      state.feedbacks = action.payload;
    },
    setPageInfo: (state, action: PayloadAction<PaginationInfo>) => {
      state.paginationInfo = action.payload;
    },
    addFeedback: (state, action: PayloadAction<Feedback>) => {
      state.feedbacks.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setFeedbacks,
  addFeedback,
  setLoading,
  setError,
  clearError,
  setPageInfo,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
