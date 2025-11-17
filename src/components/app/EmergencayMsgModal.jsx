import { useState } from "react";
import { sendMessage } from "../../firebase/messages";
import { ErrorToast } from "../global/Toaster";


const EmergencayMsgModal = ({ chatId, userId, onClose }) => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

const handleSend = async () => {
  if (!chatId) return ErrorToast("Chat not selected");
  if (!message.trim()) return ErrorToast("Message cannot be empty");

  setSending(true);
  try {
    // 👇 Don't await — fire and forget
    sendMessage(chatId, userId, message.trim(), true);
    setMessage("");
    onClose(); // close modal immediately
  } catch (err) {
    ErrorToast("Failed to send message");
  } finally {
    setSending(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Emergency Message 🚨
        </h2>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full border rounded-lg p-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Type your emergency message..."
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-sm"
          >
            Cancel
          </button>
          <button
            disabled={sending}
            onClick={handleSend}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencayMsgModal;
