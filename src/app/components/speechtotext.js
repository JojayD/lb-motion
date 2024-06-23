"use client";
// components/SpeechToText.js
import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToText = () => {
  const [conversation, setConversation] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const { messages, connect, disconnect, readyState } = useVoice();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript !== '') {
      setCurrentTranscript(transcript);
    }
  }, [transcript]);

  const handleStartListening = () => {
    resetTranscript(); // Ensure transcript is reset when starting
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = async () => {
    SpeechRecognition.stopListening();
    const userText = transcript;
    const newEntry = { user: userText };
    const newConversation = [...conversation, newEntry];
    setConversation(newConversation);
    setCurrentTranscript(''); // Clear current transcript

    // Send the user's text to Hume AI and get a response
    try {
      connect();
    } catch (error) {
      console.error('Error connecting to Hume AI:', error);
    }
  };

  useEffect(() => {
    if (readyState === VoiceReadyState.OPEN) {
      messages.forEach((msg) => {
        if (msg.type === "assistant_message") {
          const aiReply = msg.message.content;
          const utterance = new SpeechSynthesisUtterance(aiReply);
          speechSynthesis.speak(utterance);
          setConversation((prev) => [...prev, { ai: aiReply }]);
        }
      });
    }
  }, [messages, readyState]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <button onClick={handleStartListening} disabled={listening} className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
        Start Listening
      </button>
      <button onClick={handleStopListening} disabled={!listening} className="mt-2 px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50">
        Stop Listening
      </button>
      <p className="mt-4">{currentTranscript}</p>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Conversation:</h3>
        {conversation.map((entry, index) => (
          <p key={index} className="mb-2"><strong>{entry.user ? 'You:' : 'AI:'}</strong> {entry.user || entry.ai}</p>
        ))}
      </div>
    </div>
  );
};

export default SpeechToText;
