import { TiWarning } from "react-icons/ti";

<<<<<<< HEAD
export default function Modal({
  isOpen,
  onClose,
  onAction,
  data,
  disputeLoading,
}) {
  if (!isOpen) return null;
=======
export default function DisputeModal({ isOpen, onClose, onAction, data }) {
    if (!isOpen) return null;
>>>>>>> 42840f4706ee6f37762616d3feff6d54005f1ea0

  const {
    icon = <TiWarning className="h-10 w-10 text-white" />,
    title = "Title Here",
    description = "Description here...",
    actionText,
    iconBgColor,
    hoverBgColor,
  } = data || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[26em] text-center shadow-lg relative">
        {typeof onClose === "function" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-black hover:text-gray-600 font-[400] text-4xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        )}

        <div className="flex justify-center mb-4">
          <div
            className={`w-20 h-20 ${iconBgColor} rounded-full flex items-center justify-center`}
          >
            {icon}
          </div>
        </div>
        <h2 className="text-2xl font-[600] mb-2">{title}</h2>
        <p className="text-gray-600 mb-6 font-normal">{description}</p>
        {actionText && (
          <button
            disabled={disputeLoading}
            onClick={onAction}
            className={`w-full px-4 py-3 ${iconBgColor} text-white rounded-full font-semibold ${hoverBgColor} transition`}
          >
            {disputeLoading ? "Loading..." : actionText}
          </button>
        )}
      </div>
    </div>
  );
}
