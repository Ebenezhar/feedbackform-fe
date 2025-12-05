import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import InteractiveStarRating from "../components/FeedbackForm/InteractiveStarRating";
import { useFeedback } from "../hooks/useFeedback";
import { useAppSelector } from "../store/hooks";

function FeedbackForm() {
  const navigate = useNavigate();
  const { submitFeedback, isLoading } = useFeedback();
  const { error } = useAppSelector((state) => state.feedback);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    feedback: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // ---- FEEDBACK LENGTH CHECK FIRST ----
    if (name === "feedback") {
      if (value.length > 500) {
        return; //
      }
    }

    // ---- Update form state ----
    setFormData((prev) => ({ ...prev, [name]: value }));

    // ---- Email validation ----
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value)
          ? ""
          : "Please enter a valid email address",
      }));
    }
  };

  const handleSubmit = () => {
    submitFeedback(formData);
  };

  return (
    <div className="w-full flex flex-col items-center h-screen overflow-y-scroll p-2">
      <header className="relative w-full my-8 border-b border-gray-200 pb-4 flex items-center">
        {/* Back button on the left */}
        <button
          className="flex items-center px-4 py-2 rounded-md text-black font-medium transition absolute left-0 hover:scale-105 hover:underline"
          onClick={() => navigate("/")}
        >
          <IoIosArrowBack className="mr-1 w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Centered title */}
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-extrabold text-gray-800">
          Provide your feedback here.
        </h2>
      </header>
      <section className="w-full max-w-xl mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Feedback</h3>

        {/* Name */}
        <div className="mb-4">
          <p className="block text-gray-700 font-semibold mb-1">
            <span>Name</span>
            <span className="text-red-500 ml-1">*</span>
          </p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <p className="block text-gray-700 font-semibold mb-1">
            <span>Email</span>
            <span className="text-red-500 ml-1">*</span>
          </p>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full px-4 py-2 rounded-md border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none`}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <p className="block text-gray-700 font-semibold mb-1">
            <span>Rating ({formData.rating}/10)</span>
          </p>
          <InteractiveStarRating
            value={formData.rating}
            onChange={(rating) => setFormData({ ...formData, rating })}
          />
        </div>

        {/* Feedback */}
        <div className="mb-6">
          <p className="text-gray-700 font-semibold mb-1 flex justify-between">
            <span>Feedback</span>
            <span className=" ml-1 text-xs text-gray-600">
              ({formData.feedback.length}/500)
            </span>
          </p>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            rows={4}
            placeholder="Write your feedback here..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none"
          />
        </div>

        <button
          disabled={
            formData.name === "" ||
            formData.email === "" ||
            errors.email !== "" ||
            isLoading
          }
          onClick={handleSubmit}
          className="cursor-pointer w-full py-3 rounded-md font-bold bg-[#DD27F5] text-white hover:bg-[#c05acd] transition disabled:bg-gray-300 disabled:text-gray-500"
        >
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm mr-2"
              aria-hidden="true"
            >
              Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </button>
        <p className="w-full flex justify-center my-1 text-xs text-red-500">{error}</p>
      </section>
    </div>
  );
}

export default FeedbackForm;
