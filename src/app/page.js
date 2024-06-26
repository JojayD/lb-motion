"use client";

import Navbar from './components/Navbar';  // Adjust the import path if needed
import { useRouter } from 'next/navigation';
import TextSphere from "./components/TextSphere";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/signup');
  };

  return (
    <div>
      <Navbar />
      <div className="relative flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: '#BCF8D0' }}>
        <TextSphere />
        <div className="relative z-10 flex flex-col items-center bg-white px-6 py-3 rounded-md bg-opacity-100">
          <h1 className="text-4xl font-bold mb-6">Welcome to Lingo AI</h1>
          <p className="text-xl mb-6">Improve your fluency today!</p>
          <button
            onClick={handleGetStarted}
            className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300 bg-opacity-100"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
