export interface Feedback {
  id?: string;
  name: string;
  email: string;
  rating: number;
  feedback: string;
  createdAt?: Date;
}

export interface FeedbackState {
  feedbacks: Feedback[];
  isLoading: boolean;
  error: string | null;
}

export interface FeedbackFormData {
  name: string;
  email: string;
  rating: number;
  comment: string;
}