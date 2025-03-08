"use client";
import React, { useState,JSX } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "../lib/utils";
import Link from "next/link";
import Image from "next/image";
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
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      setIsScrolled(current > 0.05);
    }
  });

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
  };

  const burgerVariants = {
    open: (custom: number) => ({
      rotate: custom === 1 ? 45 : -45,
      y: custom === 1 ? 7 : -7,
    }),
    closed: { rotate: 0, y: 0 },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isScrolled ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "  w-full bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800",
        className
      )}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand */}
        <motion.div whileHover={{ scale: 1.05 }} className="text-xl font-bold">
           <Image src="/logo.svg" alt="Logo" width={40} height={40} priority />
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={item.link}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <button className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
            Login
          </button>
        </div>

        {/* Mobile Hamburger */}
        <motion.button
          className="md:hidden p-2 space-y-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Mobile menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block w-6 h-[2px] bg-current"
              variants={burgerVariants}
              animate={isMenuOpen ? "open" : "closed"}
              custom={i === 0 ? 1 : i === 2 ? 2 : 0}
              style={{ originX: 0.5 }}
            />
          ))}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden absolute w-full bg-white/95 dark:bg-black/95 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link
                    href={item.link}
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};