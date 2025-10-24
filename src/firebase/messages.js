import { onMessage } from "firebase/messaging";
import { auth, db, messaging } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";

export function getUserChatsWithDetails(currentRole, userId, callback) {
  if (!userId) {
    callback([]);
    return () => {}; // safe unsubscribe fallback
  }

  const chatsRef = collection(db, "chats");
  const q = query(
    chatsRef,
    where(`participants.${currentRole}`, "==", userId)
    // orderBy("timestamp", "asc")
  );

  // Return unsubscribe function
  return onSnapshot(q, async (snapshot) => {
    const chatList = await Promise.all(
      snapshot.docs.map(async (chatDoc) => {
        let chatData = { id: chatDoc.id, ...chatDoc.data() };
        const participants = chatData.participants || {};

        const otherRole = currentRole === "tenant" ? "landlord" : "tenant";
        const otherUserId = participants[otherRole];

        if (otherUserId) {
          const otherUserRef = doc(db, "users", otherUserId);
          const otherUserSnap = await getDoc(otherUserRef);

          if (otherUserSnap.exists()) {
            const userDoc = otherUserSnap.data();
            const roleData = (userDoc.roles || {})[otherRole];

            if (roleData) {
              chatData.user = {
                uid: otherUserId,
                email: userDoc.email,
                id: userDoc._id,
                name: roleData.name,
                profilePicture: roleData.profilePicture,
                role: otherRole,
              };
            }
          }
        }

        return chatData;
      })
    );

    callback(chatList);
  });
}

export async function sendMessage(chatId, senderId, text, isEmergency = false) {
  const messagesRef = collection(db, "chats", chatId, "messages");

  await addDoc(messagesRef, {
    senderId,
    text,
    timestamp: serverTimestamp(),
    emergency: isEmergency, // ✅ ye key add ho jayegi
  });
}

const key = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const genAI = new GoogleGenerativeAI(key);

// ✅ Create chat session globally (persistent)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: "You are a helpful assistant specialized in property management. Respond in a friendly, helpful tone.",
        },
      ],
    },
  ],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 200,
  },
});

export async function generateAIResponse(prompt) {
  try {
    console.log("Gemini Key:", key);

    // ✅ Send new message in ongoing chat
    const result = await chat.sendMessage(prompt);

    const text =
      result?.response?.text?.() ||
      result?.response?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        .join(" ") ||
      "Sorry, I didn’t get that 😅";

    return text;
  } catch (err) {
    console.error("AI Error:", err);
    return "Sorry, I couldn’t process that right now 😅";
  }
}

