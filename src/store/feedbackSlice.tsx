import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Feedback, FeedbackState } from '../types/feedback.types';




const initialState: FeedbackState = {
  feedbacks: [],
  isLoading: false,
  error: null,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setFeedbacks: (state, action: PayloadAction<Feedback[]>) => {
      state.feedbacks = action.payload;
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

export const { setFeedbacks, addFeedback, setLoading, setError, clearError } = feedbackSlice.actions;
export default feedbackSlice.reducer;