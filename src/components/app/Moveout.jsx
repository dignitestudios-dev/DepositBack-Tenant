/* eslint-disable react/prop-types */

import { useState } from "react";
import { FaPlay } from "react-icons/fa";

const Moveout = ({ tenantMoveOutImages, tenantMoveOutVideos }) => {
  const [previewItem, setPreviewItem] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [viewingOnly, setViewingOnly] = useState("");
  return (
    <div>
      {tenantMoveOutImages.length > 0 || tenantMoveOutVideos?.length > 0 ? (
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
                  ? tenantMoveOutImages
                  : tenantMoveOutImages.slice(0, 8)
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
                  ? tenantMoveOutVideos
                  : tenantMoveOutVideos.slice(0, 8)
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
                <h3 className="font-semibold text-sm mb-2">Title Goes Here</h3>
                <p className="text-xs text-gray-600">
                  This file has been unlocked and is now available for viewing.
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center max-w-xl">
          <h1 className="text-3xl font-[600] text-black mb-4">
            No Move-Out Files Yet!
          </h1>
          <p className="text-base text-gray-700 leading-relaxed">
            The tenant hasn’t uploaded any move-out photos, videos, or documents
            yet. <br />
            You can remind them to submit the required files to ensure a smooth
            move-out process.
          </p>
        </div>
      )}
    </div>
  );
};

export default Moveout;
