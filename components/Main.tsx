"use client";
import React, { useEffect, useState } from 'react';

const Main = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isMounted, setIsMounted] = useState(false);

  const phrases = [
    "Your Trusted Taxi Solution in Gujarat",
    "Local taxi cab service in ahmedabad",
    "Rajkot to hirasar airport taxi service",
    "Taxi service in ahmedabad airport",
  ];

  // Mount होने पर एनिमेशन शुरू
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleType = () => {
      const currentPhrase = phrases[loopNum % phrases.length];
      const updatedText = isDeleting
        ? currentPhrase.substring(0, text.length - 1)
        : currentPhrase.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }

      setTypingSpeed(isDeleting ? 20 : 40);
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases]);

  return (
    <div className="w-full text-left space-y-4">
      {/* Asth Cab Service with Motion Animation */}
      <h1 className={`
        text-5xl font-bold 
        bg-gradient-to-r from-blue-600 to-purple-600 
        bg-clip-text text-transparent
        transform transition-all duration-1000
        ${isMounted ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
        hover:scale-105
      `}>
        Asth Cab Service
      </h1>

      {/* Typewriter Effect with Delayed Animation */}
      <div className={`
        text-2xl font-mono text-gray-500 font-semibold
        transition-opacity duration-700 delay-300
        ${isMounted ? 'opacity-100' : 'opacity-0'}
      `}>
        {text}
        <span className="ml-1 animate-blink">|</span>
      </div>
    </div>
  );
};

export default Main;