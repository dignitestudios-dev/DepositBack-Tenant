import { TiWarning } from "react-icons/ti";
import Input from "./Input";

export default function AddRentPropertyModal({
  isOpen,
  onClose,
  onAction,
}) {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[30em] shadow-lg relative">
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

        {/* Title & Description */}
        <h2 className="text-2xl font-semibold mt-2 mb-2">Link Your Rental Property</h2>
        <p className="text-gray-600 mb-2">Enter the unique property code provided by your landlord to securely link your account to the correct rental property.</p>
        <div className="py-4" >
          <form action="" onSubmit={(e) => e.preventDefault()} >
            <div>
              <Input
                placeholder={"Text goes here"}
                label={"Enter Unique Property Code"}
              />
            </div>
          </form>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-3 items-center">
          <button
            onClick={onAction}
            className="w-full px-4 py-2 gradient-color text-white rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
