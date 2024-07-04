"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useVoice } from "@humeai/voice-react";
import { handleStopConversation } from "./controls";

const getTopTwoScores = (scores) => {
  const allScores = scores.map(({ name, score }) => ({
    name,
    score: parseFloat(score),
  }));
  allScores.sort((a, b) => b.score - a.score);
  return allScores.slice(0, 2);
};

const Messages = ({ messages, setMessageConversation, messageScores, setMessageScores, setFeedback, setIsLoading }) => { // Add setIsLoading
  const { messages: voiceMessages, disconnect } = useVoice();
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setMessageConversation(voiceMessages);
    console.log("Messages component updated. Messages:", voiceMessages);

    if (voiceMessages.length > 0) {
      const latestMessage = voiceMessages[voiceMessages.length - 1];
      const messageId = latestMessage.id || `${latestMessage.type}_${voiceMessages.length - 1}`;

      if (latestMessage.message && latestMessage.message.role === "user") {
        const scoresArray = [];
        if (latestMessage.models && latestMessage.models.prosody && latestMessage.models.prosody.scores) {
          Object.entries(latestMessage.models.prosody.scores).forEach(([name, score]) => {
            const parsedScore = parseFloat(score);
            if (!isNaN(parsedScore)) {
              scoresArray.push({ name, score: parsedScore });
            } else {
              console.warn(`Failed to parse score for ${name}: ${score}`);
            }
          });
        }
        const topScores = getTopTwoScores(scoresArray);
        setMessageScores((prevScores) => ({
          ...prevScores,
          [messageId]: topScores,
        }));
        console.log(`Top scores for message ${messageId}:`, topScores); // Added log
      }
    }

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [voiceMessages, setMessageConversation, setMessageScores]);

  const handleGoBack = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    handleStopConversation(
      messages,
      messageScores,
      setFeedback,
      () => {}, // No need to update feedback completion here
      disconnect,
      setIsLoading, // Pass setIsLoading
      setMessageConversation // Pass setMessageConversation
    ).then(() => {
      setIsProcessing(false);
      router.push("/language");
    });
  };

  return (
    <div className="mt-8 mx-8 relative">
      <h3 className="text-3xl font-semibold mb-4 text-black text-center">
        Conversation:
      </h3>
      <div className="space-y-4 mb-80">
        {messages.length === 0 && (
          <p className="text-center text-gray-500">
            No messages yet.
            <br />
            Select Start Session to chat.
          </p>
        )}
        {messages.map((msg, index) => {
          if (msg.type === "user_message" || msg.type === "assistant_message") {
            const isUser = msg.message && msg.message.role === "user";
            const messageId = msg.id || `${msg.type}_${index}`;
            const scores = messageScores[messageId] || [];
            return (
              <div
                key={messageId}
                className={`mb-2 flex ${isUser ? "justify-end" : "justify-start"} mx-2`}
              >
                <div
                  className={`max-w-lg w-full md:w-2/3 lg:w-1/2 p-4 rounded-lg shadow-2xl animate-fade ${
                    isUser ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                  }`}
                >
                  <strong>{isUser ? "You:" : "AI:"}</strong>
                  <div className="ml-2">
                    {msg.message ? msg.message.content : "No content"}
                  </div>
                  {isUser && (
                    <div className="mt-2">
                      {scores.map((score, idx) => (
                        <div key={idx}>
                          {score.name}: {score.score.toFixed(2)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          }
          return null;
        })}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="fixed bottom-4 left-4">
        <button
          onClick={handleGoBack}
          className="px-4 mb-2 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Messages;
