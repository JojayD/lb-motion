// ./components/Messages.js
"use client";
import { useVoice } from "@humeai/voice-react";

export default function Messages() {
  const { messages } = useVoice();

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Conversation:</h3>
      {messages.map((msg, index) => {
        if (msg.type === "user_message" || msg.type === "assistant_message") {
          return (
            <div key={msg.type + index} className="mb-2">
              <strong>{msg.message.role === "user" ? "You:" : "AI:"}</strong>
              <div>{msg.message.content}</div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
