import React, { useEffect } from "react";
import TagCloud from "TagCloud";

const TextSphere = () => {
  useEffect(() => {
    const container = ".tagcloud";
    const texts = [
      "Hello", "Hola", "Bonjour", "안녕하세요", "Kamusta", "你好", "こんにちは",
      "Xin chào", "Hallo", "Ciao", "Olá", "Здравствуйте", "नमस्ते", "Merhaba",
      "Sawubona", "Hallo", "Hej", "Ahoj", "Halo", "Salam", "Shalom", "Szia",
      "Hej", "Pozdravljeni", "مرحبا", "Γειά", "Sawubona", "Tēnā koe", "Dzień dobry",
      "Sveiki", "Salve", "Kumusta", "Hallo", "Aloha", "Jambo", "Salut", "Molo",
      "Mingalaba", "Ahoj", "Kaixo", "Terve", "Zdravo", "Zdravei", "Hallo", "Yassou",
      "Zdravo", "Buna", "Alo"
    ];

    const isMobile = window.innerWidth < 768;
    const options = {
      radius: isMobile ? 150 : 300,
      maxSpeed: "normal",
      initSpeed: "normal",
      keep: true,
    };

    TagCloud(container, texts, options);

    // Adjust text size
    const tagCloudElements = document.querySelectorAll('.tagcloud span');
    tagCloudElements.forEach((element) => {
      element.style.fontSize = isMobile ? '12px' : '20px';
    });

  }, []);

  return (
    <div className="text-shpere-container flex justify-center items-center h-full w-full">
      <span className="tagcloud"></span>
    </div>
  );
};

export default TextSphere;
