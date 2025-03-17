"use client";
import React, { useState, useEffect,JSX } from "react";
import { cn } from "../lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Navbar = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Component mount होने पर ट्रांजीशन शुरू
  useEffect(() => {
    setIsMounted(true);
  }, []);
 const router = useRouter()
  return (
    <nav 
      className={cn(
        "fixed top-0 w-full h-14 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800 transition-transform duration-500 ease-out",
        isMounted ? "translate-y-0" : "-translate-y-full",
        className
      )}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between ">
        {/* Logo */}
        <div className="text-xl font-bold cursor-pointer" onClick={()=>{router.push("/")}}>
          <Image 
            src="/ashtlogo.png" 
            alt="Logo" 
            width={40} 
            height={40} 
            priority 
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <button className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
            Login
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 space-y-1 group"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Mobile menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-6 h-[2px] bg-current transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-[2px] bg-current ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-[2px] bg-current transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white/95 dark:bg-black/95 backdrop-blur-sm transition-all duration-300 ease-in-out">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};