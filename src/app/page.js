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
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#BCF8D0' }}>
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <TextSphere />
        <div className="relative z-10 flex flex-col items-center bg-white px-6 py-3 rounded-md bg-opacity-100 mx-6">
          <h1 className="lg:text-4xl font-bold mb-6 md:text-3xl sm:text-2xl">Welcome to Lingo AI</h1>
          <p className="lg:text-xl mb-6 md:text-lg sm:text-xs">Improve your fluency today!</p>
          <button
            onClick={handleGetStarted}
            className="bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300 bg-opacity-100 lg:text-lg lg:px-6 lg:py-3 md:text-sm md:px-4 md:py-4 sm:text-xs sm:px-2 sm:py-1"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
