import { TiWarning } from "react-icons/ti";

export default function Addmorepropertymodal({
  isOpen,
  onClose,
  onAction,
  onSecondaryAction,
  data,
}) {
  if (!isOpen) return null;

  const { iconBgColor, title, description } = data || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[26em] text-center shadow-lg relative">
        {/* Close Button */}
        {typeof onClose === "function" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-black hover:text-gray-600 font-[400] text-4xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        )}

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-20 h-20 ${iconBgColor} rounded-full flex items-center justify-center`}
          >
            <TiWarning size={40} color="white" />
          </div>
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>

        {/* Action Buttons */}
        <div className="flex gap-3 items-center">
          <button
            onClick={onSecondaryAction}
            className="w-full px-4 py-2 bg-[#E7E7E8] text-[#000000] text-[14px] rounded-full font-semibold transition"
          >
            Add Property
          </button>
          <button
            onClick={onAction}
            className="w-full px-4 py-2 gradient-color text-white rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Link Property
          </button>
        </div>
      </div>
    </div>
  );
}
