"use client";

import { useState, useEffect } from "react";
import { VoiceProvider, useVoice } from "@humeai/voice-react";
import Messages from "./messages";
import Controls from "./controls";
import Feedback from "./Feedback";
import LoadingSpinner from "./loadingSpinner"; // Import the loading spinner

export default function ClientComponent({ accessToken }) {
  const [messageConversation, setMessageConversation] = useState([]);
  const [completedFeedback, setCompletedFeedback] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [messageScores, setMessageScores] = useState({});
  const [configId, setConfigId] = useState("db090a99-a760-41ce-a044-974216c42bc8");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    const selectedDifficulty = localStorage.getItem("selectedDifficulty");
    switch (selectedDifficulty) {
      case "easy":
        setConfigId("db090a99-a760-41ce-a044-974216c42bc8");
        break;
      case "medium":
        setConfigId("cb509718-e9ed-43cb-be32-000ec95d1491");
        break;
      case "hard":
        setConfigId("d3d371bd-6c69-408b-8a6d-1768033e945e");
        break;
      default:
        setConfigId("db090a99-a760-41ce-a044-974216c42bc8");
    }
  }, []);

  const handleStopConversation = async () => {
    setIsLoading(true); // Start loading spinner
    const newFeedback = "Detailed feedback based on the entire conversation.";
    setFeedback(newFeedback);
    setCompletedFeedback(true);
    setIsLoading(false); // Stop loading spinner
  };

  return (
    <VoiceProvider auth={{ type: "accessToken", value: accessToken }} configId={configId}>
      {isLoading && <LoadingSpinner />} {/* Show loading spinner */}
      {!completedFeedback ? (
        <div>
          <Messages
            messages={messageConversation}
            setMessageConversation={setMessageConversation}
            messageScores={messageScores}
            setMessageScores={setMessageScores}
            feedback={feedback}
            setFeedback={setFeedback}
            setIsLoading={setIsLoading} // Pass setIsLoading to Messages
          />
          <Controls
            feedback={feedback}
            messages={messageConversation}
            messageScores={messageScores}
            setFeedback={setFeedback}
            setCompletedFeedback={setCompletedFeedback}
            onStop={handleStopConversation}
            setIsLoading={setIsLoading} // Pass setIsLoading to Controls
            setMessageConversation={setMessageConversation} // Pass setMessageConversation
          />
        </div>
      ) : (
        <Feedback
          setCompletedFeedback={setCompletedFeedback}
          completedFeedback={completedFeedback}
          feedback={feedback}
        />
      )}
    </VoiceProvider>
  );
}
