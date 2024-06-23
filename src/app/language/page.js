"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function LanguageSelection() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("Spanish");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const languages = [
    "Afrikaans",
    "Albanian",
    "Amharic",
    "Arabic",
    "Armenian",
    "Azerbaijani",
    "Basque",
    "Belarusian",
    "Bengali",
    "Bosnian",
    "Bulgarian",
    "Catalan",
    "Cebuano",
    "Chinese (Simplified)",
    "Chinese (Traditional)",
    "Corsican",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English",
    "Esperanto",
    "Estonian",
    "Finnish",
    "French",
    "Frisian",
    "Galician",
    "Georgian",
    "German",
    "Greek",
    "Gujarati",
    "Haitian Creole",
    "Hausa",
    "Hawaiian",
    "Hebrew",
    "Hindi",
    "Hmong",
    "Hungarian",
    "Icelandic",
    "Igbo",
    "Indonesian",
    "Irish",
    "Italian",
    "Japanese",
    "Javanese",
    "Kannada",
    "Kazakh",
    "Khmer",
    "Kinyarwanda",
    "Korean",
    "Kurdish",
    "Kyrgyz",
    "Lao",
    "Latin",
    "Latvian",
    "Lithuanian",
    "Luxembourgish",
    "Macedonian",
    "Malagasy",
    "Malay",
    "Malayalam",
    "Maltese",
    "Maori",
    "Marathi",
    "Mongolian",
    "Myanmar (Burmese)",
    "Nepali",
    "Norwegian",
    "Nyanja (Chichewa)",
    "Odia (Oriya)",
    "Pashto",
    "Persian",
    "Polish",
    "Portuguese",
    "Punjabi",
    "Romanian",
    "Russian",
    "Samoan",
    "Scots Gaelic",
    "Serbian",
    "Sesotho",
    "Shona",
    "Sindhi",
    "Sinhala (Sinhalese)",
    "Slovak",
    "Slovenian",
    "Somali",
    "Spanish",
    "Sundanese",
    "Swahili",
    "Swedish",
    "Tagalog (Filipino)",
    "Tajik",
    "Tamil",
    "Tatar",
    "Telugu",
    "Thai",
    "Turkish",
    "Turkmen",
    "Ukrainian",
    "Urdu",
    "Uyghur",
    "Uzbek",
    "Vietnamese",
    "Welsh",
    "Xhosa",
    "Yiddish",
    "Yoruba",
    "Zulu"
  ];

  const handleLanguageSelect = (language) => {
    setLanguage(language);
    localStorage.setItem("selectedLanguage", language);
    console.log(`Selected language: ${language}`);
    router.push("/dashboard");
  };

  const filteredLanguages = languages.filter((lang) =>
    lang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="flex h-screen items-start justify-center p-4"
      style={{
        backgroundImage: `url('/hack.jpeg')`, // Replace path for pic
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative mt-64">
        {/* Language Selector Button */}
        <button
          className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          Select Language
        </button>

        {/* Dropdown List */}
        {isOpen && (
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-lg focus:outline-none mt-0.5 min-w-64">
            <div className="px-4 border-b">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              <ul>
                {filteredLanguages.map((lang) => (
                  <li
                    key={lang}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-black"
                    onClick={() => handleLanguageSelect(lang)}
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LanguageSelection;
