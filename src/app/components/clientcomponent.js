"use client";
import { useState, useEffect } from "react";
import { VoiceProvider, useVoice } from "@humeai/voice-react";
import Messages from "./messages";
import Controls from "./controls";

export default function ClientComponent({ accessToken }) {
  const [messageConversation, setMessageConversation] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    console.log("Voice messages updated:", messageConversation);
    setMessageConversation(messageConversation);
  }, [messageConversation]);

  const handleStopConversation = () => {
    setCompleted(true);
    console.log("Conversation stopped. Messages:", messageConversation);
  };

  return (
    <VoiceProvider auth={{ type: "accessToken", value: accessToken }}>
      <Messages messages={messageConversation} />
      <Controls messages={messageConversation} onStop={handleStopConversation} />
    </VoiceProvider>
  );
}
