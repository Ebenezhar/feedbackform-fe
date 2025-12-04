import { useEffect } from "react";
import { useFeedback } from "../hooks/useFeedback";
import { useAppSelector } from "../store/hooks";
// import { useEffect } from "react";
import { FaStar } from "react-icons/fa";

export const FeedbackList: React.FC = () => {
  const { feedbacks, isLoading } = useAppSelector((state) => state.feedback);
  const { refetchFeedbacks } = useFeedback();

  useEffect(() => {
    refetchFeedbacks();
  }, []);

  if (isLoading) {
    return <div>Loading feedbacks...</div>;
  }

  if (feedbacks.length === 0) {
    return <div>No feedbacks yet.</div>;
  }

  return (
    <div className="w-full h-screen m-5">
      <header className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Customer Feedback
        </h1>
        <p className="text-lg text-gray-500 mt-1">
          A collection of reviews from our valued users.
        </p>
      </header>
      {feedbacks.map((feedback) => (
        <div
          key={feedback.id}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-800">
                {feedback.rating}
              </span>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <svg
                  key={star}
                  className={`w-6 h-6  ${
                    feedback.rating >= star
                      ? "text-yellow-500"
                      : "text-gray-400 text-"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.288 3.974a1 1 0 00.95.69h4.177c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.782.57-1.837-.197-1.538-1.118l1.288-3.974a1 1 0 00-.364-1.118L2.243 9.401c-.783-.57-.38-1.81.588-1.81h4.177a1 1 0 00.95-.69l1.288-3.974z" />
                </svg>
              ))}
            </div>

            {/* <span className="text-sm text-gray-400">${feedback.date}</span> */}
          </div>

          <p className="text-gray-700 leading-relaxed  italic">
            {feedback.feedback}
          </p>

          <div className="pt-4 border-t border-gray-100">
            <p className="font-semibold text-gray-800 text-lg">
              {feedback.name}
            </p>
            <p className="text-sm text-blue-600 truncate">{feedback.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
