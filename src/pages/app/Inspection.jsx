import { Fragment, useState } from "react";
import { FaArrowLeft, FaPlay } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import Moveout from "../../components/app/Moveout";
import UploadPropertyDocs from "../../components/app/propertyDetail/UploadPropertyDocs";

// const dummyImages = [
//   Homeone,
//   Hometwo,
//   Homethree,
//   Homefour,
//   Homeone,
//   Hometwo,
//   Homethree,
//   Homefour,
//   Homeone,
//   Hometwo,
//   Homethree,
//   Homefour,
// ];

// const dummyVideos = [
//   Homethree,
//   Hometwo,
//   Homeone,
//   Homefour,
//   Hometwo,
//   Homethree,
//   Homefour,
//   Homeone,
//   Homethree,
//   Hometwo,
//   Homeone,
//   Homefour,
//   Hometwo,
//   Homethree,
//   Homefour,
//   Homeone,
// ];

const Inspection = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("Move In");
  const [previewItem, setPreviewItem] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [viewingOnly, setViewingOnly] = useState(""); // '' | 'photos' | 'videos'

  const [isUploadFile, setIsUploadFile] = useState(false);
  const [activeCategory, setActiveCategory] = useState("in");

  const location = useLocation();

  const {
    propertyId,
    tenantMoveInImages = [],
    tenantMoveInVideos = [],
  } = location.state || {};

  return (
    <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-20 min-h-screen bg-[#F6FAFF] text-[#333]">
      {isUploadFile ? (
        <UploadPropertyDocs
          setIsUploadFile={() => {
            setIsUploadFile();
            navigate("/app/dashboard");
          }}
          activeCategory={activeCategory}
          propertyId={propertyId}
        />
      ) : (
        <Fragment>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (viewingOnly) {
                    // If viewing only photos or videos, go back to full view
                    setViewingOnly("");
                    setShowAllPhotos(false);
                    setShowAllVideos(false);
                  } else {
                    navigate(-1);
                  }
                }}
                type="button"
              >
                <FaArrowLeft size={20} />
              </button>

              <h1 className="text-3xl font-[600]">
                {viewingOnly === "photos"
                  ? "Photos"
                  : viewingOnly === "videos"
                  ? "Videos"
                  : "Inspection"}
              </h1>
            </div>

            <div>
              {/* Move In / Move Out Toggle */}
              {viewingOnly === "" && (
                <div className="bg-white p-1 rounded-full flex gap-1">
                  <button
                    onClick={() => {
                      setViewMode("Move In");
                      setActiveCategory("in");
                    }}
                    className={`text-sm px-6 py-2 rounded-full font-medium ${
                      viewMode === "Move In"
                        ? "bg-gradient-to-r from-[#003897] to-[#0151DA] text-white"
                        : "text-black"
                    }`}
                  >
                    Move In
                  </button>
                  <button
                    onClick={() => {
                      setViewMode("Move Out");
                      setActiveCategory("out");
                    }}
                    className={`text-sm px-6 py-2 rounded-full font-medium ${
                      viewMode === "Move Out"
                        ? "bg-gradient-to-r from-[#003897] to-[#0151DA] text-white"
                        : "text-black"
                    }`}
                  >
                    Move Out
                  </button>
                </div>
              )}
              <div className="flex justify-end  pt-3">
                <button
                  onClick={() => setIsUploadFile(true)}
                  className="bg-gradient-to-r from-[#003897] to-[#0151DA] hover:bg-[#0151DA]
                 text-white text-sm px-4 py-3 rounded-full font-medium "
                >
                  + Upload Files
                </button>
              </div>
            </div>
          </div>

          {tenantMoveInImages.length === 0 &&
          tenantMoveInVideos.length === 0 ? (
            <div className="flex justify-center items-center h-[300px] text-xl font-semibold">
              No Document Uploaded
            </div>
          ) : (
            <Fragment>
              {/* Move In Mode */}
              {viewMode === "Move In" && (
                <>
                  {/* Photos Section */}
                  {viewingOnly !== "videos" && (
                    <div className="mb-10">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">
                          {showAllPhotos ? "" : "Photos"}
                        </h2>
                        <button
                          onClick={() => {
                            setShowAllPhotos(!showAllPhotos);
                            setViewingOnly(showAllPhotos ? "" : "photos");
                            if (!showAllPhotos) setShowAllVideos(false);
                          }}
                          className="text-blue-600 text-base font-medium underline"
                        >
                          {showAllPhotos ? "Show less" : "View all photos"}
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {(showAllPhotos
                          ? tenantMoveInImages
                          : tenantMoveInImages.slice(0, 8)
                        ).map((src, idx) => (
                          <div
                            key={idx}
                            className="relative group border-2 border-transparent hover:border-blue-500 rounded-md overflow-hidden cursor-pointer"
                            onClick={() =>
                              setPreviewItem({
                                type: "image",
                                src: src?.fileUrl,
                              })
                            }
                          >
                            <img
                              src={src?.fileUrl}
                              alt={`Photo ${idx}`}
                              className={`w-full h-[150px] object-cover rounded-md`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Videos Section */}
                  {viewingOnly !== "photos" && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">
                          {showAllVideos ? "" : "Videos"}
                        </h2>
                        <button
                          onClick={() => {
                            setShowAllVideos(!showAllVideos);
                            setViewingOnly(showAllVideos ? "" : "videos");
                            if (!showAllVideos) setShowAllPhotos(false);
                          }}
                          className="text-blue-600 text-base font-medium underline"
                        >
                          {showAllVideos ? "Show less" : "View all videos"}
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {(showAllVideos
                          ? tenantMoveInVideos
                          : tenantMoveInVideos.slice(0, 8)
                        ).map((src, idx) => (
                          <div
                            key={idx}
                            className="relative group rounded-md overflow-hidden cursor-pointer"
                            onClick={() =>
                              setPreviewItem({
                                type: "video",
                                src: src?.fileUrl,
                              })
                            }
                          >
                            <video
                              src={src?.fileUrl}
                              alt={`Video ${idx}`}
                              className={`w-full h-[150px] object-cover`}
                            />

                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-white p-2 rounded-full shadow-lg">
                                <FaPlay className="text-black" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preview Modal */}
                  {previewItem && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                      <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-4 relative">
                        <button
                          className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
                          onClick={() => setPreviewItem(null)}
                        >
                          ✕
                        </button>
                        <p className="text-sm font-semibold mb-2">Preview</p>
                        {previewItem.type === "image" ? (
                          <img
                            src={previewItem.src}
                            className="w-full h-auto rounded-md mb-4"
                            alt="Preview"
                          />
                        ) : (
                          <video
                            controls
                            src={previewItem.src}
                            className="w-full rounded-md mb-4"
                          />
                        )}
                        <h3 className="font-semibold text-sm mb-2">
                          Title Goes Here
                        </h3>
                        <p className="text-xs text-gray-600">
                          This file has been unlocked and is now available for
                          viewing.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {viewMode === "Move Out" && <Moveout />}
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Inspection;
