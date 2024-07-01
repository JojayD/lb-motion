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
    <div className="flex flex-col min-h-screen overflow-x-hidden" style={{ backgroundColor: '#BCF8D0' }}>
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <TextSphere />
        <div className="relative z-10 flex flex-col items-center bg-white px-4 py-2 rounded-md bg-opacity-100 mx-6 lg:px-6 lg:py-3 md:px-5 md:py-2 sm:px-4 sm:py-1">
          <h1 className="font-bold mb-6 lg:text-4xl md:text-3xl sm:text-2xl">Welcome to Lingo AI</h1>
          <p className="mb-6 lg:text-xl md:text-lg sm:text-base">Improve your fluency today!</p>
          <button
            onClick={handleGetStarted}
            className="bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300 bg-opacity-100 lg:text-lg lg:px-6 lg:py-3 md:text-md md:px-4 md:py-2 sm:text-sm sm:px-3 sm:py-1"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
