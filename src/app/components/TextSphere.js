import React, { useEffect } from "react";

//import "../styles/TextShpere.css";

// Importing TagCloud package
import TagCloud from "TagCloud";

const TextShpere = () => {
  // Animation settings for Text Cloud
  useEffect(() => {
    return () => {
      const container = ".tagcloud";
      const texts = [
        "Hello",       // English
        "Hola",        // Spanish
        "Bonjour",     // French
        "안녕하세요",    // Korean
        "Kamusta",     // Filipino
        "你好",          // Chinese (Simplified)
        "こんにちは",    // Japanese
        "Xin chào",    // Vietnamese
        "Hallo",       // German
        "Ciao",        // Italian
        "Olá",         // Portuguese
        "Здравствуйте", // Russian
        "नमस्ते",        // Hindi
        "Merhaba",     // Turkish
        "Sawubona",    // Zulu
        "Hallo",       // Dutch
        "Hej",         // Swedish
        "Ahoj",        // Czech
        "Halo",        // Indonesian
        "Salam",       // Persian
        "Shalom",      // Hebrew
        "Szia",        // Hungarian
        "Hej",         // Danish
        "Pozdravljeni",// Slovenian
        "مرحبا",        // Arabic
        "Γειά",         // Greek
        "Sawubona",    // Zulu
        "Tēnā koe",    // Maori
        "Dzień dobry", // Polish
        "Sveiki",      // Latvian
        "Salve",       // Latin
        "Kumusta",     // Cebuano
        "Hallo",       // Norwegian
        "Aloha",       // Hawaiian
        "Jambo",       // Swahili
        "Salut",       // Romanian
        "Molo",        // Xhosa
        "Mingalaba",   // Burmese
        "Ahoj",        // Slovak
        "Kaixo",       // Basque
        "Terve",       // Finnish
        "Zdravo",      // Serbian
        "Zdravei",     // Bulgarian
        "Hallo",       // Luxembourgish
        "Yassou",      // Greek (informal)
        "Zdravo",      // Croatian
        "Buna",        // Moldovan
        "Alo",         // Haitian Creole
      ];

      const options = {
        radius: 400,
        maxSpeed: "normal",
        initSpeed: "normal",
        keep: true,
      };

      TagCloud(container, texts, options);
    };
  }, []);

  return (
    <>
      <div className="text-shpere">
        {/* span tag className must be "tagcloud"  */}
        <span className="tagcloud"></span>
      </div>
    </>
  );
};

export default TextShpere;