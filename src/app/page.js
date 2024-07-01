"use client";

import React from "react";
import Navbar from './components/Navbar';  // Adjust the import path if needed
import { useRouter } from 'next/navigation';
import TextSphere from "./components/TextSphere";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/signup');
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden overflow-y-hidden" style={{ backgroundColor: '#BCF8D0' }}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow relative">
        <TextSphere />
        <div className="relative z-10 flex flex-col items-center bg-white px-4 py-2 rounded-md bg-opacity-100 mx-6 sm:px-4 sm:py-2 md:px-5 md:py-3 lg:px-6 lg:py-4">
          <h1 className="font-bold mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Welcome to Lingo AI</h1>
          <p className="mb-6 text-base sm:text-lg md:text-xl lg:text-2xl">Improve your fluency today!</p>
          <button
            onClick={handleGetStarted}
            className="bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300 text-sm sm:text-base md:text-lg lg:text-xl px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-3 lg:px-6 lg:py-4"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
