"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import axios from "axios";

const sendMessagesToBackend = (messages) => {
  axios.post('http://127.0.0.1:5000/recieve_text', {
    messages: messages.map(msg => ({
      role: msg.message.role,
      content: msg.message.content,
    })),
  })
  .then(response => {
    console.log('Messages sent successfully:', response.data);
  })
  .catch(error => {
    console.error('Error sending messages:', error);
  });
};

export default function Controls({ messages, onStop }) {
  const { connect, disconnect, readyState } = useVoice();

  const handleStopConversation = () => {
    console.log("Stopping conversation. Sending messages:", messages);
    disconnect();
    onStop();
    sendMessagesToBackend(messages);
  };

  if (readyState === VoiceReadyState.OPEN) {
    return (
      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleStopConversation}
          className="px-4 py-2 bg-red-500 text-white rounded"
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
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Start Session
      </button>
    </div>
  );
}
