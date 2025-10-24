import { Fragment, useState } from "react";
import { FaArrowLeft, FaPlay } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import Moveout from "../../components/app/Moveout";
import UploadPropertyDocs from "../../components/app/propertyDetail/UploadPropertyDocs";
import FeedbackModal from "../../components/app/FeedbackModal";
import { useTranslation } from "react-i18next";
import AddChecklistModal from "../../components/app/AddChecklistModal";

const Inspection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Photos");
  const [viewMode, setViewMode] = useState("Move In");
  const [previewItem, setPreviewItem] = useState(null);
  const [addCheckListModal, setIsAddCheckListModal] = useState(false);
  const [moveInChecklist, setMoveInChecklist] = useState([]);
  const [moveOutChecklist, setMoveOutChecklist] = useState([]);
  const [isUploadFile, setIsUploadFile] = useState(false);
  const [activeCategory, setActiveCategory] = useState("in");
  const [feedback, setFeedback] = useState(false);

  const location = useLocation();
  const { t } = useTranslation();

  const {
    propertyId,
    landlordId,
    tenantMoveInImages = [],
    tenantMoveInVideos = [],
    tenantMoveOutImages = [],
    tenantMoveOutVideos = [],
    propertyCheckList = {},
  } = location.state || {};

  const handleSaveChecklist = (data) => {
    if (data.MoveIn) setMoveInChecklist(data.MoveIn);
    if (data.MoveOut) setMoveOutChecklist(data.MoveOut);
  };

  const checklistData =
    viewMode === "Move In"
      ? moveInChecklist.length
        ? moveInChecklist
        : propertyCheckList?.MoveIn || []
      : moveOutChecklist.length
      ? moveOutChecklist
      : propertyCheckList?.MoveOut || [];

  return (
    <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-20 min-h-screen bg-[#F6FAFF] text-[#333]">
      {isUploadFile ? (
        <UploadPropertyDocs
          setIsUploadFile={setIsUploadFile}
          handleUpload={() => {
            setIsUploadFile(false);
            navigate(`/app/property-detail/${propertyId}`);
          }}
          activeCategory={activeCategory}
          propertyId={propertyId}
          setFeedback={setFeedback}
        />
      ) : (
        <Fragment>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} type="button">
                <FaArrowLeft size={20} />
              </button>
              <h1 className="text-3xl font-[600]">
                {t("headings.inspection")}
              </h1>
            </div>

            <div>
              {/* Move In / Move Out Toggle */}
              <div className="bg-white flex flex-col ms-auto justify-end rounded-full w-[250px] mb-3">
                <div className="p-1 flex gap-1 justify-between">
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
              </div>

              <div className="flex justify-end gap-4 pt-3">
                <button
                  onClick={() => setIsUploadFile(true)}
                  className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white text-sm px-4 py-3 rounded-full font-medium"
                >
                  + Upload Files
                </button>

                <button
                  onClick={() => setIsAddCheckListModal(true)}
                  className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white text-sm px-4 py-3 rounded-full font-medium"
                >
                  + Add Checklist
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mb-8">
            {["Photos", "Videos", "Checklist"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-base font-medium pb-2 border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-blue-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "Photos" && (
            <div>
              {(viewMode === "Move In"
                ? tenantMoveInImages
                : tenantMoveOutImages
              ).length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(viewMode === "Move In"
                    ? tenantMoveInImages
                    : tenantMoveOutImages
                  ).map((src, idx) => (
                    <div
                      key={idx}
                      className="relative group border-2 border-transparent hover:border-blue-500 rounded-md overflow-hidden cursor-pointer"
                      onClick={() =>
                        setPreviewItem({
                          type: "image",
                          src: src?.fileUrl,
                          title: src?.title || "Untitled",
                        })
                      }
                    >
                      <img
                        src={src?.fileUrl}
                        alt={`Photo ${idx}`}
                        className="w-full h-[150px] object-cover rounded-md"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <h2 className="text-white text-sm font-medium truncate">
                          {src?.title || "Untitled"}
                        </h2>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center h-[250px] font-medium text-gray-500">
                  No Photos Uploaded
                </div>
              )}
            </div>
          )}

          {activeTab === "Videos" && (
            <div>
              {(viewMode === "Move In"
                ? tenantMoveInVideos
                : tenantMoveOutVideos
              ).length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(viewMode === "Move In"
                    ? tenantMoveInVideos
                    : tenantMoveOutVideos
                  ).map((src, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-md overflow-hidden cursor-pointer"
                      onClick={() =>
                        setPreviewItem({
                          type: "video",
                          src: src?.fileUrl,
                          title: src?.title || "Untitled",
                        })
                      }
                    >
                      <video
                        src={src?.fileUrl}
                        className="w-full h-[150px] object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <h2 className="text-white text-sm font-medium truncate">
                          {src?.title || "Untitled"}
                        </h2>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-2 rounded-full shadow-lg">
                          <FaPlay className="text-black" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center h-[250px] font-medium text-gray-500">
                  No Videos Uploaded
                </div>
              )}
            </div>
          )}

          {activeTab === "Checklist" && (
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-[#003897]">
                {viewMode === "Move In"
                  ? "Move-In Checklist"
                  : "Move-Out Checklist"}
              </h3>

              {checklistData?.length > 0 ? (
                <ul className="space-y-2">
                  {checklistData?.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 border p-3 rounded-lg hover:bg-blue-50"
                    >
                      <input
                        type="checkbox"
                        disabled
                        checked
                        className="accent-blue-600 w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No checklist found.</p>
              )}
            </div>
          )}

          {/* ✅ Preview Modal */}
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
                  {previewItem?.title}
                </h3>
              </div>
            </div>
          )}
        </Fragment>
      )}

      {/* Feedback Modal */}
      {feedback && (
        <FeedbackModal
          landlordId={landlordId}
          isOpen={feedback}
          onClose={() => {
            setFeedback(false);
            navigate(-1);
          }}
        />
      )}

      {/* Add Checklist Modal */}
      {addCheckListModal && (
        <AddChecklistModal
          propertyId={propertyId}
          setIsAddCheckListModal={setIsAddCheckListModal}
          onSave={handleSaveChecklist}
          viewMode={viewMode}
          existingChecklist={
            viewMode === "Move In"
              ? moveInChecklist.length
                ? moveInChecklist
                : propertyCheckList?.MoveIn || []
              : moveOutChecklist.length
              ? moveOutChecklist
              : propertyCheckList?.MoveOut || []
          }
        />
      )}
    </div>
  );
};

export default Inspection;
