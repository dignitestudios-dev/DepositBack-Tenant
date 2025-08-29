/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import pdfIcon from "../../../assets/pdficon.png";
import axios from "../../../axios";
import { ErrorToast } from "../../global/Toaster";
import { RiLoader5Line } from "react-icons/ri";

const UploadPropertyDocs = ({
  setIsUploadFile,
  activeCategory,
  propertyId,
}) => {
  const activeCategoryName = activeCategory.split(" ")[0].toLowerCase();
  console.log(
    "🚀 ~ UploadPropertyDocs ~ activeCategoryName:",
    activeCategoryName
  );
  const [mediaError, setMediaError] = useState(null);

  const [loading, setLoading] = useState(false);

  const [mediaFiles, setMediaFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);

  const handleFileChange = (e) => {
    setMediaError(null);

    const files = Array.from(e.target.files);
    const imagesAndVideos = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );
    const documents = files.filter((file) => file.type === "application/pdf");

    setDocumentFiles([...documentFiles, ...documents]);
    setMediaFiles([...mediaFiles, ...imagesAndVideos]);
  };

  const removeMedia = (index) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  const removeDocument = (index) => {
    setDocumentFiles(documentFiles.filter((_, i) => i !== index));
  };

  const handleUploadFile = async () => {
    try {
      if (mediaFiles.length === 0 && documentFiles.length === 0) {
        setMediaError("Upload Property Images");
        return;
      }
      setLoading(true);
      const formData = new FormData();

      // if (activeCategoryName === "property") {
      //   mediaFiles.forEach((file) => {
      //     if (file.type.startsWith("image/")) {
      //       formData.append("landlordPropertyConditionImages", file);
      //     } else {
      //       formData.append("landlordPropertyConditionVideos", file);
      //     }
      //   });
      // }
      if (activeCategoryName === "in") {
        mediaFiles.forEach((file) => {
          if (file.type.startsWith("image/")) {
            formData.append("tenantMoveInImages", file);
          } else {
            formData.append("tenantMoveInVideos", file);
          }
        });
      }

      if (activeCategoryName === "out") {
        mediaFiles.forEach((file) => {
          if (file.type.startsWith("image/")) {
            formData.append("tenantMoveOutImages", file);
          } else {
            formData.append("tenantMoveOutVideos", file);
          }
        });
      }

      if (activeCategoryName === "repairs") {
        documentFiles.forEach((file) => {
          formData.append("tenantRepairs", file);
        });
      }

      if (activeCategoryName === "agreements") {
        documentFiles.forEach((file) => {
          formData.append("tenantAgreements", file);
        });
      }

      if (activeCategoryName === "uv") {
        mediaFiles.forEach((file) => {
          formData.append("uvLightImagesTenant", file);
        });
      }

      formData.append("currentDate", new Date().toLocaleString());

      for (const [key, value] of formData.entries()) {
        console.log(`this is -->  ${key}: ${value}`);
      }

      const response = await axios.put(
        `/properties/${propertyId}/updateDocsTenant`,
        formData
      );
      console.log("🚀 ~ handleUploadFile ~ response:", response);

      if (response.status === 200) {
        setIsUploadFile(false);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-[1260px] mx-auto pt-8 pb-[10em] text-[#333]">
      {/* Top Navigation */}

      <div className="flex justify-between">
        <div className="flex gap-3 items-center mb-6 pt-3">
          <button type="button" onClick={() => setIsUploadFile(false)}>
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-[600]">Upload Files</h1>
        </div>
      </div>

      <div className="bg-[#F9FAFA] mt-0 rounded-xl shadow-lg p-8">
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
              accept={
                activeCategoryName === "agreements" ||
                activeCategoryName === "repairs"
                  ? "application/pdf"
                  : "image/*,video/*"
              }
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
        {mediaError && (
          <p className="text-red-500 text-xs mt-2">{mediaError}</p>
        )}
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
                <img src={pdfIcon} alt="pdf" className="w-5 h-5" />
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

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            disabled={loading}
            onClick={handleUploadFile}
            className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
          >
            <div className="flex justify-center items-center">
              <span className="mr-1">Upload</span>
              {loading && <RiLoader5Line className="animate-spin text-lg" />}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPropertyDocs;
