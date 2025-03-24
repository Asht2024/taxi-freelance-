"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

interface NavItem {
  name: string;
  link: string;
  dropdown?: { name: string; link: string }[];
}

export const Navbar = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const servicesRef = useRef<HTMLDivElement>(null);
  const mobileServicesRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      if (mobileServicesRef.current && !mobileServicesRef.current.contains(event.target as Node)) {
        setIsMobileServicesOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userName = session?.user?.name || "Satyam Maurya";
  const truncatedName = userName.split(' ')[0] + ' ' + (userName.split(' ')[1]?.[0] || '');

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full h-14 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800 transition-transform duration-500 ease-out",
        isMounted ? "translate-y-0" : "-translate-y-full",
        className
      )}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => router.push("/")}>
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
          {navItems.map((item,i) => (
            item.dropdown ? (
              <div key={i} className="relative" ref={servicesRef}>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors flex items-center gap-1"
                >
                  {item.name}
                  <svg
                    className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 dark:bg-black/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-2">
                      {item.dropdown.map((subItem,i) => (
                        <Link
                          key={i}
                          href={subItem.link}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={i}
                href={item.link}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
              >
                {item.name}
              </Link>
            )
          ))}
          
          {/* Profile Section */}
          {session ? (
            <div className="relative ml-4" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1 transition-colors"
              >
                <Image
                  src={session.user?.image || "https://lh3.googleusercontent.com/a/ACg8ocLPBevtHNJCwgM8L1wx3Ogq1Lk_i8ezGFzVkuzxp-bukpjgBDyB=s96-c"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  {truncatedName}
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/95 dark:bg-black/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Image
                        src={session.user?.image || "https://lh3.googleusercontent.com/a/ACg8ocLPBevtHNJCwgM8L1wx3Ogq1Lk_i8ezGFzVkuzxp-bukpjgBDyB=s96-c"}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{userName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{session.user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push('/profile')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => router.push('/signin')}
              className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          )}
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
            {navItems.map((item,i) => (
              item.dropdown ? (
                <div key={i} className="relative" ref={mobileServicesRef}>
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="w-full text-left py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors flex justify-between items-center"
                  >
                    {item.name}
                    <svg
                      className={`w-4 h-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isMobileServicesOpen && (
                    <div className="ml-4">
                      {item.dropdown.map((subItem,i) => (
                        <Link
                          key={i}
                          href={subItem.link}
                          className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileServicesOpen(false);
                          }}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={i}
                  href={item.link}
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            
            {session ? (
              <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={session.user.image || "https://lh3.googleusercontent.com/a/ACg8ocLPBevtHNJCwgM8L1wx3Ogq1Lk_i8ezGFzVkuzxp-bukpjgBDyB=s96-c"}
                    alt="Profile"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{userName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{session.user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    router.push('/profile');
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    setIsMenuOpen(false);
                  }}
                  className="w-full mt-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => {
                  router.push('/signin');
                  setIsMenuOpen(false);
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};