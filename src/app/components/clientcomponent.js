// ./components/ClientComponent.js
"use client";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./messages";
import Controls from "./controls";

export default function ClientComponent({ accessToken }) {
  return (
    <VoiceProvider auth={{ type: "accessToken", value: accessToken }}>
      <Messages />
      <Controls />
    </VoiceProvider>
  );
}
