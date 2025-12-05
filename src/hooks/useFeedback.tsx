import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../store/hooks";
import { feedbackApi } from "../api/feedbackApi";
import {
  setFeedbacks,
  addFeedback,
  setLoading,
  setError,
  clearError,
  setPageInfo,
} from "../store/feedbackSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { PaginatedFeedbacksResponse } from "../types/feedback.types";

export const useFeedback = (page: number = 1, limit: number = 10) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: feedbacks,
    isLoading: isFetching,
    error: fetchError,
    refetch: refetchFeedbacks,
  } = useQuery<PaginatedFeedbacksResponse>({
    queryKey: ["feedbacks", page, limit],
    queryFn: () => feedbackApi.getFeedbacks(page, limit),
    retry: false,
  });

  useEffect(() => {

    if (feedbacks?.data) {
      dispatch(setFeedbacks(feedbacks.data));
    }
    if (feedbacks?.pagination) {
      dispatch(setPageInfo(feedbacks.pagination));
    }
  }, [feedbacks, dispatch]);

  useEffect(() => {
    if (fetchError) {
      dispatch(setError((fetchError as Error).message));
    }
  }, [fetchError, dispatch]);

  useEffect(() => {
    dispatch(setLoading(isFetching));
  }, [isFetching, dispatch]);

  // Submit feedback mutation
  const submitFeedback = useMutation({
    mutationFn: feedbackApi.submitFeedback,
    onMutate: () => {
      dispatch(setLoading(true));
      dispatch(clearError());
    },
    onSuccess: (data) => {
      dispatch(addFeedback(data));
      dispatch(setLoading(false));
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
    onError: (error) => {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    },
  });

  return {
    // Query state
    feedbacks,
    isFetching,
    fetchError,
    refetchFeedbacks,
    submitFeedback: submitFeedback.mutate,
    isLoading: submitFeedback.isPending,
  };
};
