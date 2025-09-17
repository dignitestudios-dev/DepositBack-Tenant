/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaTimes, FaStar } from "react-icons/fa";
import axios from "../../axios"; // adjust path
import { ErrorToast, SuccessToast } from "../global/Toaster";

const FeedbackModal = ({ landlordId, isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      return ErrorToast("Please provide both rating and comment");
    }
    try {
      setLoading(true);
      const body = {
        landlordId,
        rating,
        comment,
        isAnonymous,
      };

      const response = await axios.post("/reviews", body);
      if (response.status === 200 || response.status === 201) {
        SuccessToast("Feedback submitted successfully!");
        onClose();
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Leave Feedback</h2>

        {/* Rating */}
        <div className="flex gap-2 mb-4">
          {[...Array(5)].map((_, index) => {
            const value = index + 1;
            return (
              <FaStar
                key={value}
                size={28}
                className={`cursor-pointer transition-colors ${
                  value <= (hover || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(value)}
                onMouseEnter={() => setHover(value)}
                onMouseLeave={() => setHover(0)}
              />
            );
          })}
        </div>

        {/* Comment */}
        <textarea
          placeholder="Write your feedback..."
          className="w-full border rounded-lg p-3 text-sm mb-4 resize-none"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Anonymous Toggle */}
        <label className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          <span className="text-sm text-gray-600">Post anonymously</span>
        </label>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 text-sm bg-gray-200 rounded-lg"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
