"use client"
import React, { useEffect, useState } from 'react';

const Main = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150); // Typing speed in milliseconds

  const phrases = [
    "Your Trusted Taxi Solution in Gujarat",
    "Local taxi cab service in ahmedabad",
    "Rajkot to hirasar airport taxi service",
    "Taxi service in ahmedabad airport",
  ];

  useEffect(() => {
    const handleType = () => {
      const currentPhrase = phrases[loopNum % phrases.length];
      const updatedText = isDeleting
        ? currentPhrase.substring(0, text.length - 1)
        : currentPhrase.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentPhrase) {
        // Pause at the end of typing
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updatedText === '') {
        // Move to the next phrase after deleting
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }

      // Adjust typing speed
      setTypingSpeed(isDeleting ? 20 : 40);
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases]);

  return (
    <div className="w-full text-left space-y-4">
      {/* First Line: Asth Cab Service with Gradient Text */}
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Asth Cab Service
      </h1>

      {/* Second Line: Typewriter Effect */}
      <div className="text-3xl font-mono text-gray-700">
        {text}
        <span className="ml-1 animate-blink">|</span> {/* Blinking cursor */}
      </div>
    </div>
  );
};

export default Main;