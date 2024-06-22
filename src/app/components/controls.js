// ./components/Controls.js
"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";

export default function Controls() {
  const { connect, disconnect, readyState } = useVoice();

  if (readyState === VoiceReadyState.OPEN) {
    return (
      <button
        onClick={() => {
          disconnect();
        }}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        End Session
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        connect()
          .then(() => {
            console.log("connected!")
            /* handle success */
          })
          .catch((e) => {
            console.log("disconnected")
            console.log(e)
            /* handle error */
          });
      }}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Start Session
    </button>
  );
}
