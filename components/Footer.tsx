'use client';

import { motion } from 'framer-motion';
import {
  ArrowUpIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  
} from '@heroicons/react/24/outline';

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn
} from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-blue-900 to-purple-900 text-gray-200 relative mt-20">
      {/* Back to Top Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 p-4 rounded-full shadow-xl"
      >
        <ArrowUpIcon className="w-6 h-6 text-white" />
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white mb-4">ASHT Cab</h3>
            <p className="text-sm">
              Revolutionizing urban mobility with safe, smart and sustainable transportation solutions.
            </p>
            <div className="flex space-x-4 mt-4">
              
            <a
    href="https://www.facebook.com/share/1AGEETjpmj/?mibextid=wwXIfr"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaFacebookF className="w-5 h-5 text-blue-400 hover:text-blue-300 cursor-pointer" />
  </a>

  <a
    href="https://www.instagram.com/ashtcab?igsh=MXdsbHl6NjVpd25rYg%3D%3D&utm_source=qr"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaInstagram className="w-5 h-5 text-blue-400 hover:text-blue-300 cursor-pointer" />
  </a>

  <a
    href="https://www.linkedin.com/in/asht-cab-services-private-limited-7948a02a7"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaLinkedinIn className="w-5 h-5 text-blue-400 hover:text-blue-300 cursor-pointer" />
  </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Explore</h4>
            <Link href="#" className="block hover:text-blue-300 transition">About Us</Link>
            <Link href="#" className="block hover:text-blue-300 transition">Services</Link>
            <Link href="/fleet" className="block hover:text-blue-300 transition">Fleet</Link>
            <Link href="/Careers" className="block hover:text-blue-300 transition">Careers</Link>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-blue-600 text-white py-2 rounded-lg font-medium"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="flex items-start space-x-3">
              <MapPinIcon className="w-5 h-5 text-blue-400 mt-1" />
              <p>
              13, Ratnaraj Green, B/H HP Petrol Pump, Nana Chiloda,<br /> Ahmedabad-382330
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <PhoneIcon className="w-5 h-5 text-blue-400" />
              <p>+919925566614</p>
            </div>
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="w-5 h-5 text-blue-400" />
              <p>info@ashtcabservices.in</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="border-t border-white/20 pt-8 mt-8 text-center flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2024 ASHT Cab Services. All rights reserved
          </p>
          <div className="flex space-x-6">
            <a href="/Privacy" className="text-gray-400 hover:text-blue-300 text-sm">Privacy Policy</a>
            <a href="/Terms" className="text-gray-400 hover:text-blue-300 text-sm">Terms and Conditions</a>
            <a href="/Refund" className="text-gray-400 hover:text-blue-300 text-sm">Refund and Cancellation policy</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
