/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "../../axios";
import { ErrorToast } from "../global/Toaster";
import { useNavigate } from "react-router";

const AddChecklistModal = ({
  setIsAddCheckListModal,
  onSave,
  viewMode,
  existingChecklist = [],
  propertyId,
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Checklist options
  const checklistPoints =
    viewMode === "Move In"
      ? [
          "Inspect walls and paint condition",
          "Check all lights and switches",
          "Test plumbing and faucets",
          "Verify appliances are functional",
          "Inspect windows and locks",
          "Check for any damages or stains",
        ]
      : [
          "Ensure property is clean and empty",
          "Check for any missing items",
          "Inspect for damages or repairs",
          "Verify all utilities turned off",
          "Lock all windows and doors",
        ];

  // ✅ Load existing checklist names on open
  const [selectedPoints, setSelectedPoints] = useState([]);
  console.log(existingChecklist, "existingChecklist");
  useEffect(() => {
    if (existingChecklist && existingChecklist.length > 0) {
      // Handle both object-based and string-based checklists
      const names = existingChecklist.map((item) =>
        typeof item === "string" ? item : item.name
      );
      setSelectedPoints(names);
    }
  }, [existingChecklist]);

  // ✅ Toggle checklist items (check/uncheck)
  const togglePoint = (point) => {
    setSelectedPoints(
      (prev) =>
        prev.includes(point)
          ? prev.filter((p) => p !== point) // uncheck
          : [...prev, point] // check
    );
  };

  // ✅ Save handler
  // ✅ Save handler (updated payload structure)
  const handleSave = async () => {
    setLoading(true);

    // Send array of strings instead of objects
    const propertyCheckList =
      viewMode === "Move In"
        ? { MoveIn: selectedPoints }
        : { MoveOut: selectedPoints };

    try {
      const response = await axios.put(`/properties/updateCheckList`, {
        _id: propertyId,
        propertyCheckList,
      });

      if (response.status === 200) {
        onSave(propertyCheckList); // update parent state
        setIsAddCheckListModal(false);
        navigate(`/app/property-detail/${propertyId}`);
      } else {
        ErrorToast("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error updating checklist:", error);
      ErrorToast("Failed to update checklist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[400px] rounded-2xl shadow-xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => setIsAddCheckListModal(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <IoMdClose size={22} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-[#003897] mb-4 text-center">
          {viewMode === "Move In" ? "Move-In Checklist" : "Move-Out Checklist"}
        </h2>

        {/* Checklist Items */}
        <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-2">
          {checklistPoints?.map((point, idx) => (
            <label
              key={idx}
              className={`flex items-center gap-2 border p-2 rounded-lg cursor-pointer transition-colors ${
                selectedPoints.includes(point)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedPoints.includes(point)}
                onChange={() => togglePoint(point)}
                className="accent-blue-600 w-4 h-4"
              />
              <span className="text-sm text-gray-700">{point}</span>
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={() => setIsAddCheckListModal(false)}
            className="px-4 py-2 rounded-full text-sm font-medium border border-gray-400 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-6 py-2 rounded-full text-white text-sm font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-700 to-blue-500"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChecklistModal;
