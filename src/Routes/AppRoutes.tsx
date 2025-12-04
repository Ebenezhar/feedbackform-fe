import { Routes, Route } from "react-router-dom";
import  { FeedbackList } from "../Pages/Feedback";
import FeedbackForm from "../Pages/FeedbackForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FeedbackList />} />
      <Route path="/feedback-form" element={<FeedbackForm />} />
    </Routes>
  );
};

export default AppRoutes;
