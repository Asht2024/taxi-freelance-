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
      { name: "Local Taxi Cab Service in Ahmedabad", link: "/#" },
      { name: "Ahmedabad to Mumbai Taxi Cab Service", link: "/ahmedabad-to-mumbai-taxi-cab-service" },
      { name: "Rajkot to Hirasar Airport Taxi Service", link: "/services/outstation" },
      { name: "Taxi Service in Gujarat", link: "/services/corporate" },
      { name: "Taxi Service in Ahmedabad Airport", link: "/services/wedding" },
      { name: "Rajkot Airport Taxi", link: "/services/hourly" },
      { name: "Cab Service in Ahmedabad for Outstation", link: "/services/self-drive" },
  
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