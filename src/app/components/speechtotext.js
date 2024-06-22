"use client"
// components/SpeechToText.js
import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

const SpeechToText = () => {
  const [text, setText] = useState('');
  const [conversation, setConversation] = useState([]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript !== '') {
      setText(transcript);
    }
  }, [transcript]);

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = async () => {
    SpeechRecognition.stopListening();
    setConversation([...conversation, { user: text }]);
    // Send the text to your backend API
    try {
      const response = await axios.post('http://localhost:8000/api/conversation', { text });
      setConversation([...conversation, { user: text }, { ai: response.data.reply }]);
      resetTranscript();
      setText('');
    } catch (error) {
      console.error('Error sending text to backend:', error);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="flex flex-col items-center">
      <button onClick={handleStartListening} disabled={listening} className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
        Start Listening
      </button>
      <button onClick={handleStopListening} disabled={!listening} className="mt-2 px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50">
        Stop Listening
      </button>
      <p className="mt-4">{text}</p>
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
