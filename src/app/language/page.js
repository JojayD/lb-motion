// /pages/language/choose.js
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function LanguageSelection() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLanguageSelect = (language) => {
    // Here you can implement logic to set the selected language
    console.log(`Selected language: ${language}`);

    // Example: navigate to another page based on selected language
    router.push("/dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center p-4 bg-green-500">
      <div className="relative">
        {/* Language Selector Button */}
        <button
          className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          Select Language
        </button>

        {/* Dropdown List */}
        {isOpen && (
          <div className="absolute top-12 right-0 w-48 bg-white shadow-md rounded-lg py-2">
            <ul>
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-black"
                onClick={() => handleLanguageSelect("English")}
              >
                English
              </li>
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-black"
                onClick={() => handleLanguageSelect("Chinese")}
              >
                Chinese
              </li>
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-black"
                onClick={() => handleLanguageSelect("Japanese")}
              >
                Japanese
              </li>
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-black"
                onClick={() => handleLanguageSelect("Spanish")}
              >
                Spanish
              </li>
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-black"
                onClick={() => handleLanguageSelect("French")}
              >
                French
              </li>
              {/* Add more languages as needed */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default LanguageSelection;
