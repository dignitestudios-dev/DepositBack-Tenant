import React, { useState, useEffect } from "react";
import { IoArrowBack, IoTimeOutline } from "react-icons/io5";
import { LuCalendar } from "react-icons/lu";
import { useNavigate, useParams } from "react-router"; // Corrected import for react-router
import { FaTimes, FaCheck } from "react-icons/fa";
import axios from "../../axios";
import { FaFilePdf } from "react-icons/fa"; // Importing PDF icon from react-icons
import moment from "moment";

export default function Report() {
  const navigate = useNavigate();
  const { _id } = useParams(); // Get the propertyId from the URL

  // Debugging propertyId
  useEffect(() => {
    console.log("Property ID from URL:", _id);
  }, [_id]);

  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [type, setType] = useState(""); // For the "Type Of Report" input
  const [witnesses, setWitnesses] = useState([]); // For witnesses
  const [description, setDescription] = useState(""); // For the description
  const [suspectDescription, setSuspectDescription] = useState(""); // For suspect description
  const [media, setMedia] = useState(null); // For the media upload (images, videos)
  const [documents, setDocuments] = useState(null); // For the document upload (PDFs, images)

  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [mediaFiles, setMediaFiles] = useState([]); // Store multiple media files (images/videos)
  const [documentFiles, setDocumentFiles] = useState([]); // Store multiple document files (PDFs/images)
  const [isLoading, setIsLoading] = useState(false);

  // Time modal handlers
  const handleTimeChange = (e) => setSelectedTime(e.target.value);
  const handleOpenTimeModal = () => setIsTimeModalOpen(true);
  const handleCloseTimeModal = () => setIsTimeModalOpen(false);

  // Date modal handlers
  const handleOpenDateModal = () => setIsDateModalOpen(true);
  const handleCloseDateModal = () => setIsDateModalOpen(false);

  const today = new Date().toISOString().split("T")[0];

  const formatDate = (dateStr, timeStr) => {
    const date = new Date(dateStr); // Create a Date object from the selected date
    const timeParts = timeStr.split(":"); // Split the time (HH:MM)
    date.setHours(timeParts[0]);
    date.setMinutes(timeParts[1]);

    // Add seconds and milliseconds to the time to make it match the required format
    date.setSeconds(47); // You can modify this to dynamically get seconds if required
    date.setMilliseconds(423); // Same for milliseconds (you can also modify it as needed)

    // Return the date in the required ISO format
    return date.toISOString(); // Returns ISO format: "yyyy-MM-ddTHH:mm:ss.sssZ"
  };

  // Handle report submission with Axios
  const handleReportSubmit = async () => {
    setIsLoading(true);

    const formattedDateTime = moment(
      `${selectedDate} ${selectedTime}`,
      "YYYY-MM-DD hh:mm A" // <-- depends on how you're storing time (12hr with AM/PM)
    ).toISOString();
    console.log(
      "🚀 ~ selecte=> " + selectedTime + " ~ formattedDateTime:",
      formattedDateTime
    );

    const formData = new FormData();

    formData.append("type", type);
    formData.append("date", selectedDate);
    formData.append("time", formattedDateTime);
    formData.append("description", description);
    formData.append("suspectDescription", suspectDescription);
    formData.append("propertyId", _id);

    // Append media files
    mediaFiles.forEach((file) => {
      if (file.type.startsWith("image")) {
        formData.append("mediaImages", file); // Append images to 'mediaImages'
      } else if (file.type.startsWith("video")) {
        formData.append("mediaVideos", file); // Append videos to 'mediaVideos'
      }
    });

    // Append document files
    documentFiles.forEach((file) => {
      formData.append("documents", file); // Append document files (PDFs/images)
    });

    // Append witnesses
    witnesses.forEach((witness, index) => {
      formData.append(`witnesses[${index}]`, witness);
    });

    try {
      const response = await axios.post("/reports", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowSuccessModal(true); // Show success modal after successful report submission
      navigate("/app/report-history"); // Navigate to report history page
    } catch (error) {
      console.error("Error submitting the report", error);
    } finally {
      // Stop loading (whether successful or failed)
      setIsLoading(false);
    }
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);

    // Separate images and videos
    const imageFiles = files.filter((file) => file.type.startsWith("image"));
    const videoFiles = files.filter((file) => file.type.startsWith("video"));

    // Update media files state
    setMediaFiles((prevFiles) => [...prevFiles, ...imageFiles, ...videoFiles]); // Add both image and video files to state

    // Append files to FormData
    const formData = new FormData();

    // Append images with 'mediaImages' key
    imageFiles.forEach((file) => {
      formData.append("mediaImages", file);
    });

    // Append videos with 'mediaVideos' key
    videoFiles.forEach((file) => {
      formData.append("mediaVideos", file);
    });

    // Assuming you're submitting the form data here
    // You can use `axios.post` or another function to send this FormData
  };

  // Handle document (PDF or images) change
  const handleDocumentChange = (e) => {
    const files = Array.from(e.target.files);
    setDocumentFiles((prevFiles) => [...prevFiles, ...files]); // Add new files to the existing ones
  };

  const isFormValid = () => {
    // Check if all required fields are filled
    return (
      type && selectedDate && selectedTime && description && suspectDescription
      // (mediaFiles.length > 0 || documentFiles.length > 0)
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F8FF]">
      <div className="max-w-7xl mx-auto py-8 px-6">
        <div className="flex items-center gap-3 mb-2">
          <IoArrowBack
            size={24}
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-[32px] font-semibold text-black">
            Report Landlord
          </h1>
        </div>

        <p className="text-gray-500 text-[16px] mb-6">
          Share the issue you faced. Your report will be kept confidential and
          reviewed carefully.
        </p>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Type Of Report
              </label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Enter text here"
                className="w-full rounded-full border border-gray-200 p-3 text-gray-600"
                required
                maxLength={50}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date</label>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-full border border-gray-200 p-3 text-gray-600 cursor-pointer"
                required
                max={today}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Time</label>
              <div className="relative">
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)} // e.g. "12:19"
                  className="w-full rounded-full border border-gray-200 p-3 text-gray-600 cursor-pointer"
                  required
                />
                {/* <IoTimeOutline
                  onClick={() => setIsTimeModalOpen(true)}
                  className="absolute right-3 top-3.5 text-gray-400 cursor-pointer"
                /> */}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Witnesses
              </label>
              <input
                type="text"
                onChange={(e) => setWitnesses(e.target.value.split(","))}
                placeholder="Enter text here"
                className="w-full rounded-full border border-gray-200 p-3 text-gray-600"
                required
                maxLength={500}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter text here"
                className="w-full rounded-xl border border-gray-200 p-3 text-gray-600"
                required
                maxLength={500}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description Of Suspect
              </label>
              <textarea
                rows={4}
                value={suspectDescription}
                onChange={(e) => setSuspectDescription(e.target.value)}
                placeholder="Enter text here"
                className="w-full rounded-xl border border-gray-200 p-3 text-gray-600"
                required
                maxLength={500}
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 h-[134px] md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Upload photos/Videos
              </label>
              {/* Media Upload Section (Images/Videos) */}
              <div className="border-2 border-dashed border-blue-400 rounded-xl p-9 text-center text-gray-500">
                <input
                  type="file"
                  onChange={handleMediaChange}
                  className="hidden"
                  accept="image/*,video/*"
                  id="media-upload"
                  multiple // Allow multiple file selection
                />
                <label htmlFor="media-upload" className="cursor-pointer">
                  <p className="mb-2">Upload “Property Images/Videos”</p>
                  <p className="text-sm">Upto 20MB JPG, PNG, MP4</p>
                </label>

                {/* Media previews below the upload field */}
                <div className="mt-4 flex flex-wrap gap-4">
                  {mediaFiles.map((file, index) => {
                    const previewUrl = URL.createObjectURL(file);
                    return file.type.startsWith("image") ||
                      file.type.startsWith("video") ? (
                      <div key={index} className="w-[70px] h-[70px]">
                        {file.type.startsWith("image") ? (
                          <img
                            src={previewUrl}
                            alt="Media Preview"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          <video
                            src={previewUrl}
                            controls
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>

            <div>
              {/* Document Upload Section (PDFs) */}
              <label className="block text-sm font-medium mb-1">
                Upload Documents
              </label>
              <div className="border-2 border-dashed border-blue-400 rounded-xl p-9 text-center text-gray-500">
                <input
                  type="file"
                  onChange={handleDocumentChange}
                  className="hidden"
                  accept="application/pdf,image/*"
                  id="documents-upload"
                  multiple // Allow multiple file selection
                />
                <label htmlFor="documents-upload" className="cursor-pointer">
                  <p className="mb-2">Upload “Documents”</p>
                  <p className="text-sm">Upto 20MB PDF, JPG, PNG</p>
                </label>

                {/* Document previews below the upload field */}
                <div className="mt-4 flex flex-wrap gap-4">
                  {documentFiles.map((file, index) => (
                    <div
                      key={index}
                      className="w-[120px] h-[120px] text-center"
                    >
                      {file.type === "application/pdf" ? (
                        <FaFilePdf
                          size={50}
                          color="#d9534f"
                          className="mx-auto"
                        /> // Show PDF icon
                      ) : (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Document Preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-36 text-center">
            <button
              onClick={handleReportSubmit}
              disabled={!isFormValid() || isLoading} // Disable if form is not valid or loading
              className={`${
                isFormValid() && !isLoading
                  ? "bg-gradient-to-r from-[#003897] to-[#0151DA]" // Original color when enabled
                  : "bg-gray-400 cursor-not-allowed" // Gray color when disabled
              } text-white font-semibold w-[542px] py-3 rounded-full`}
            >
              {isLoading ? (
                <span className="animate-spin">Loading...</span> // Simple loading spinner text
              ) : (
                "Report"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-[471px] max-w-sm text-center">
            <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
              <FaCheck size={24} />
            </div>

            <h2 className="font-semibold text-2xl mb-1">Report Submitted</h2>
            <p className="text-sm text-gray-600 mb-6">
              You’ve successfully reported the landlord.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white font-semibold py-2 px-36 rounded-full"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
