import React, { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { ErrorToast } from "../../components/global/Toaster";
import { useNavigate } from "react-router";

const LinkYourRentalProperty = () => {
  const [propertyCode, setPropertyCode] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate("");

  const handleInputChange = (e) => {
    const value = e.target.value;

    // If a non-numeric character is entered, show an alert
    if (!/^\d*$/.test(value)) {
      ErrorToast("Please enter only numbers.");
    } else {
      setPropertyCode(value);
      if (value.trim()) {
        setShowError(false);
      }
    }
  };

  const handleSkip = () => {
    console.log("Skip clicked");
  };

  const handleNext = () => {
    if (!propertyCode.trim()) {
      setShowError(true);
      ErrorToast("Property code cannot be empty.");
    } else {
      setShowError(false);
      console.log("Next clicked with code:", propertyCode);
      // Add your navigation logic here if needed, e.g., navigate("/app/success")
      navigate("/app/property-detail-link");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F8FF] p-20 rounded-2xl">
      <div className="text-left mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">
          Link Your Rental Property
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          Enter the unique property code provided by your landlord to securely
          link your account to the correct rental property.
        </p>
      </div>
      <div className="bg-white rounded-lg flex justify-center shadow-sm max-w-[7xl] w-full mx-auto p-8">
        <div className="space-y-6 max-w-md w-full">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Enter Unique Property Code
            </label>
            <input
              type="text"
              placeholder="Enter Code"
              value={propertyCode}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          {showError && (
            <div className="flex items-center space-x-2 text-red-600 mt-2">
              <FiAlertTriangle className="w-5 h-5" />
              <p className="text-sm">
                The property code you entered is invalid. Please check with your
                landlord and try again.
              </p>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSkip}
              className="flex-1 py-3 px-6 bg-gray-400 text-white font-medium rounded-full hover:bg-gray-500 transition-colors"
            >
              Skip
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-[#003897] to-[#0151DA] text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkYourRentalProperty;
