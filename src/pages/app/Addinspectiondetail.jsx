import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Header from "../../components/global/Header";
import Footer from "../../components/global/Footer";
import pdfIcon from "../../assets/pdficon.png"; // Replace with actual path
import { useNavigate } from "react-router";
import { ImCross } from "react-icons/im";

const Addinspectiondetail = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);
  const navigation = useNavigate("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imagesAndVideos = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );
    const documents = files.filter((file) => file.type === "application/pdf");

    setMediaFiles([...mediaFiles, ...imagesAndVideos]);
    setDocumentFiles([...documentFiles, ...documents]);
  };

  const removeMedia = (index) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  const removeDocument = (index) => {
    setDocumentFiles(documentFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-[1260px] mx-auto pt-8 pb-[10em] min-h-screen bg-[#F6FAFF] p-6 text-[#333]">
      {/* Top Navigation */}

      <div className="flex justify-between">
        <div className="flex gap-3 items-center mb-6 pt-3">
          <button type="button" onClick={() => window.history.back()}>
            <FaArrowLeft size={20} className="mb-8" />
          </button>
          <div className="space-y-2">
            <h1 className="text-3xl font-[600]">Add Inspection Details</h1>
            <p>
              Document the condition of your rental property to ensure a smooth
              leasing experience. Upload photos or videos for each area of the
              property.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white mt-0 rounded-xl flex justify-center shadow-lg p-8">
        <div className="w-[36em]">
          {/* Upload Box */}
          <div className="border-2 border-dashed bg-white border-blue-500 rounded-lg p-10 text-center cursor-pointer block">
            <label
              htmlFor="fileUpload"
              className=" rounded-lg p-10 text-center cursor-pointer"
            >
              <p className="text-black">Upload “Documents”</p>
              <p className="text-sm text-gray-400">Upto 20MB PDF, JPG, PNG</p>
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
                  className="absolute top-2 right-1 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => removeMedia(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Document List */}
          <div className="mt-6 justify-between flex flex-row gap-3">
            {documentFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded"
              >
                <div className="flex items-center gap-2">
                  <img src={pdfIcon} alt="pdf" className="w-5 h-5" />
                  <p className="text-sm">{file.name}</p>
                </div>
                <button
                  onClick={() => removeDocument(index)}
                  className="text-gray-600 ml-3 text-sm"
                >
                  <ImCross size={10} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                navigation("/app/property-linked-success");
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
            >
              Pay Deposit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addinspectiondetail;
