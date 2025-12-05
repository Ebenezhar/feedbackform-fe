export interface Feedback {
  id?: string;
  name: string;
  email: string;
  rating: number;
  feedback: string;
  created_at?: string;
}

export interface FeedbackState {
  feedbacks: Feedback[];
  isLoading: boolean;
  error: string | null;
  paginationInfo:PaginationInfo
}

export interface PaginationInfo {
    current_page: number; 
    total_pages: number;  
    total_items: number;  
    has_next: boolean;    
    has_previous: boolean; 
}

export interface FeedbackFormData {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

export interface PaginatedFeedbacksResponse {
    data: Feedback[];
    pagination: PaginationInfo;
}