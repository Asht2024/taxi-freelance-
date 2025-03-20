import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../../components/Navbar";
import { AnimatePresence } from "framer-motion";
import Footer from "../../components/Footer";
import AuthProvider from '../../components/AuthProvider';

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
  { 
    name: "Services", 
    link: "#",
    dropdown: [
      { name: "local-taxi-cab-service-in-ahmedabad", link: "/local-taxi-cab-service" },
      { name: "ahmedabad-to-mumbai-taxi-cab-service", link: "/services/city" },
      { name: "rajkot-to-hirasar-airport-taxi-service", link: "/services/outstation" },
      { name: "taxi-service-in-gujarat", link: "/services/corporate" },
      { name: "taxi-service-in-ahmedabad-airport", link: "/services/wedding" },
      { name: "rajkot-airport-taxi", link: "/services/hourly" },
      { name: "cab-service-in-ahmedabad-for-outstation", link: "/services/self-drive" },
  
    ]
  },
  { name: "About", link: "/about" },
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
        <AuthProvider>
          <Navbar navItems={navItems} />
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}