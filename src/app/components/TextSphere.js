import React, { useEffect } from "react";
import TagCloud from "TagCloud";

const TextSphere = () => {
  useEffect(() => {
    const container = ".tagcloud";
    const texts = [
      "Hello", "Hola", "Bonjour", "안녕하세요", "Kamusta", "你好", "こんにちは", "Xin chào", "Hallo", "Ciao", 
      "Olá", "Здравствуйте", "नमस्ते", "Merhaba", "Sawubona", "Hallo", "Hej", "Ahoj", "Halo", "Salam", 
      "Shalom", "Szia", "Hej", "Pozdravljeni", "مرحبا", "Γειά", "Sawubona", "Tēnā koe", "Dzień dobry", 
      "Sveiki", "Salve", "Kumusta", "Hallo", "Aloha", "Jambo", "Salut", "Molo", "မင်္ဂလာပါ", "Ahoj", 
      "Kaixo", "Terve", "Zdravo", "Zdravei", "Hallo", "Yassou", "Zdravo", "Buna", "Alo",
    ];

    const createTagCloud = () => {
      let radius;
      if (window.innerWidth < 640) {
        radius = 200;
      } else if (window.innerWidth < 768) {
        radius = 250;
      } else if (window.innerWidth < 1024) {
        radius = 300;
      } else if (window.innerWidth < 1280) {
        radius = 350;
      } else {
        radius = 400;
      }

      const options = {
        radius,
        maxSpeed: "fast",
        initSpeed: "normal",
        keep: true,
        loop: true,
        lockX: true,
        lockY: true,
      };

      TagCloud(container, texts, options);
    };

    createTagCloud();
    
    // Handle screen resizing
    const handleResize = () => {
      document.querySelector(container).innerHTML = "";
      createTagCloud();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="text-sphere flex items-center justify-center w-full h-full absolute inset-0">
      <span className="tagcloud"></span>
    </div>
  );
};

export default TextSphere;
