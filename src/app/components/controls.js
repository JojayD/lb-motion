"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Controls({
  messages,
  messageScores,
  onStop,
  setFeedback,
  feedback,
  setCompletedFeedback,
}) {
  const { connect, disconnect, readyState } = useVoice();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    console.log("Feedback updated:", feedback);
  }, [feedback]);

  const sendMessagesToBackend = async (messages) => {
    setIsProcessing(false);

    console.log("Sending messages to backend:", messages);
    try {
      const selectedLanguage =
        localStorage.getItem("selectedLanguage") || "defaultLanguage"; // Providing a fallback directly here
      const filteredMessages = messages
        .map(({ message }, index) => ({
          role: message?.role || "assistant", 
          content: message?.content,
          id: `user_message_${index}`
        }));

      // Include the top two scores
      const topScores = [];
      messages.forEach((msg, index) => {
        const messageId = `user_message_${index}`;
        if (messageScores && messageScores[messageId]) { // Check if messageScores and messageScores[messageId] exist
          topScores.push({ messageId, scores: messageScores[messageId] });
        }
      });
      console.log("Top scores to be sent:", topScores); // Added log

      const response = await axios.post("http://127.0.0.1:8000/receive_text", {
        messages: filteredMessages,
        language: selectedLanguage,
        topScores,
      });

      setFeedback(response.data.feedback);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleStopConversation = () => {
    if (isProcessing) return;
    setIsProcessing(true);

    sendMessagesToBackend(messages);
    console.log(localStorage.getItem("selectedLanguage"));
    console.log("Stopping conversation. Sending messages:", messages);
    localStorage.removeItem("selectedLanguage");
    setCompletedFeedback(true);
    disconnect();
    // onStop();
  };

  if (readyState === VoiceReadyState.OPEN) {
    return (
      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleStopConversation}
          className="cursor-pointer transition-all 
bg-gray-700 text-white px-6 py-2 rounded-lg
border-red-400
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-red-300 shadow-red-300 active:shadow-none"
        >
          End Session
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => {
          connect()
            .then(() => {
              console.log("connected!");
              /* handle success */
            })
            .catch((e) => {
              console.log("disconnected");
              console.log(e);
              /* handle error */
            });
        }}
        className="cursor-pointer transition-all 
bg-gray-700 text-white px-6 py-2 rounded-lg
border-green-400
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none"
      >
        Start Session
      </button>
    </div>
  );
}
