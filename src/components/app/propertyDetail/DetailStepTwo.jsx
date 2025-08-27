import { useEffect, useState } from "react";
import { PiIdentificationBadge } from "react-icons/pi";
import { ErrorToast } from "../../global/Toaster";

const DetailStepTwo = ({
  prevStep,
  nextStep,
  stepTwoData,
  inspectionDetail,
}) => {
  console.log("🚀 ~ DetailStepTwo ~ stepTwoData:", stepTwoData);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imagesAndVideos = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );
    const documents = files.filter((file) => file.type === "application/pdf");

    setMediaFiles((prev) => [...prev, ...imagesAndVideos]);
    setDocumentFiles((prev) => [...prev, ...documents]);
  };

  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeDocument = (index) => {
    setDocumentFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (mediaFiles.length > 0 || documentFiles.length > 0) {
      inspectionDetail({ documentFiles, mediaFiles });
      nextStep();
    } else {
      ErrorToast("Please upload at least one media or document file.");
    }
  };

  useEffect(() => {
    if (stepTwoData) {
      if (
        Array.isArray(stepTwoData.mediaFiles) &&
        stepTwoData.mediaFiles.length > 0
      ) {
        setMediaFiles(stepTwoData.mediaFiles);
      }
      if (
        Array.isArray(stepTwoData.documentFiles) &&
        stepTwoData.documentFiles.length > 0
      ) {
        setDocumentFiles(stepTwoData.documentFiles);
      }
    }
  }, [stepTwoData]);

  return (
    <div className="bg-[#F9FAFA] mt-20 rounded-xl shadow-lg p-8">
      <p className="text-black pb-6">
        Document the condition of your rental property to ensure a smooth
        leasing experience. Upload photos or videos for each area of the
        property.
      </p>

      {/* Upload Box */}
      <div className="border-2 border-dashed bg-white border-blue-500 rounded-lg p-10 text-center cursor-pointer block">
        <label
          htmlFor="fileUpload"
          className=" rounded-lg p-10 text-center cursor-pointer"
        >
          <p className="text-black">Upload “Documents”</p>
          <p className="text-sm text-gray-400">Upto 20mbps PDF, JPG, PNG</p>
          <input
            type="file"
            id="fileUpload"
            accept="image/*,video/*,application/pdf"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Media Preview */}
      <div className="mt-6 flex flex-wrap gap-3">
        {mediaFiles.map((file, index) => (
          <div
            key={index}
            className="relative w-28 h-28 rounded overflow-hidden"
          >
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <video
                src={URL.createObjectURL(file)}
                className="w-full h-full object-cover rounded"
                controls
              />
            )}
            <button
              className="absolute top-1 right-1 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center"
              onClick={() => removeMedia(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Document List */}
      <div className="mt-6 flex flex-col gap-3">
        {documentFiles.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded"
          >
            <div className="flex items-center gap-2">
              <img src={PiIdentificationBadge} alt="pdf" className="w-5 h-5" />
              <p className="text-sm">{file.name}</p>
            </div>
            <button
              onClick={() => removeDocument(index)}
              className="text-gray-600 text-lg"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={prevStep}
          className="px-[10em] py-3 rounded-full bg-gray-200 text-gray-700 font-medium"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DetailStepTwo;
