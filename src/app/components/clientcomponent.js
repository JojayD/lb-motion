// clientcomponent.js
"use client";

import { useState, useEffect } from "react";
import { VoiceProvider, useVoice } from "@humeai/voice-react";
import Messages from "./messages";
import Controls from "./controls";
import Feedback from "./Feedback";

export default function ClientComponent({ accessToken }) {
  const [messageConversation, setMessageConversation] = useState([]);
  const [completedFeedback, setCompletedFeedback] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [messageScores, setMessageScores] = useState({});
  const [configId, setConfigId] = useState("db090a99-a760-41ce-a044-974216c42bc8");

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
    const newFeedback = "Detailed feedback based on the entire conversation.";
    setFeedback(newFeedback);
    setCompletedFeedback(true);
  };

  return (
    <VoiceProvider auth={{ type: "accessToken", value: accessToken }} configId={configId}>
      {!completedFeedback ? (
        <div>
          <Messages
            messages={messageConversation}
            setMessageConversation={setMessageConversation}
            messageScores={messageScores}
            setMessageScores={setMessageScores}
            feedback={feedback}
            setFeedback={setFeedback}
          />
          <Controls
            feedback={feedback}
            messages={messageConversation}
            messageScores={messageScores}
            setFeedback={setFeedback}
            setCompletedFeedback={setCompletedFeedback}
            onStop={handleStopConversation}
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
