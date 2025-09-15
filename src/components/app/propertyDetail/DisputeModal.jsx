import { TiWarning } from "react-icons/ti";

export default function Modal({ isOpen, onClose, onAction, data }) {
    if (!isOpen) return null;

    const {
        iconBgColor = "bg-red-600",
        icon = <TiWarning className="h-10 w-10 text-white" />,
        title = "Title Here",
        description = "Description here...",
        actionText,
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
                    <div className={`w-20 h-20 ${iconBgColor} rounded-full flex items-center justify-center`}>
                        {icon}

                    </div>
                </div>
                <h2 className="text-2xl font-[600] mb-2">{title}</h2>
                <p className="text-gray-600 mb-6 font-normal">{description}</p>
                  {actionText && (
                <button
                    onClick={onAction}
                    className="w-full px-4 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition"
                >
                    {actionText}
                </button>
                  )}
            </div>
        </div>
    );
}
