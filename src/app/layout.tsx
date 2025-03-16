import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../../components/Navbar";
import { AnimatePresence } from "framer-motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asht Cab - Premium Taxi Service",
  description: "Book reliable taxi services in Gujarat with 24/7 availability",
};

const navItems = [
  { name: "Home", link: "/" },
  { name: "Cabs", link: "/Cabs" },
  { name: "About", link: "/About" },
  { name: "Contact", link: "/contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar navItems={navItems} />
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </body>
    </html>
  );
}