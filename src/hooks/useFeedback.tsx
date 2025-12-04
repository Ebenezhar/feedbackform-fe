import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../store/hooks";
import { feedbackApi } from "../api/feedbackApi";
import {
  setFeedbacks,
  addFeedback,
  setLoading,
  setError,
  clearError,
} from "../store/feedbackSlice";
import { useEffect } from "react";

export const useFeedback = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const {
    data: feedbacks,
    isLoading: isFetching,
    error: fetchError,
    refetch: refetchFeedbacks,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: feedbackApi.getFeedbacks,
    retry: false,
  });

  // Handle success
  useEffect(() => {
    if (feedbacks) {
      dispatch(setFeedbacks(feedbacks));
    }
  }, [feedbacks, dispatch]);

  // Handle error
  useEffect(() => {
    if (fetchError) {
      dispatch(setError((fetchError as Error).message));
    }
  }, [fetchError, dispatch]);

  // Submit feedback mutation
  const submitFeedback = useMutation({
    mutationFn: feedbackApi.submitFeedback,
    onMutate: () => {
      dispatch(setLoading(true));
      dispatch(clearError());
    },
    onSuccess: (data) => {
      console.log("DATA==>", data);

      // Add to Redux store
      dispatch(addFeedback(data));
      dispatch(setLoading(false));

      // Invalidate and refetch
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
    submitFeedback,
    isLoading: submitFeedback.isPending,
  };
};
