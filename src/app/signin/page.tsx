'use client';

import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';

const SignInPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-xs text-center"
      >
        {/* Logo Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
          <p className="text-gray-500">Sign in to continue</p>
        </div>

        {/* Google Login Button */}
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 p-4 rounded-xl 
          shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
        >
          <FcGoogle className="text-2xl" />
          <span className="font-medium">Continue with Google</span>
        </motion.button>

        {/* Footer Text */}
        <p className="mt-6 text-sm text-gray-400">
          By continuing, you agree to our terms of service
        </p>
      </motion.div>
    </div>
  );
};

export default SignInPage;