"use client"
import React, { useState, useEffect } from "react";

import Main from "../../components/Main";
import Loader from "../../components/Loader"; // Import the Loader component
import RestHome from "../../components/RestHome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true); // State to control loader visibility
  const router = useRouter();
  const session = useSession();
  useEffect(()=>{
     if(session.data?.user){
       if(session.data.user.email == 'aadeshconsultancy2@gmail.com'){
             router.push('/Admin');
       }
     }
  },[])

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Loader Screen */}
      {isLoading && <Loader isLoading={isLoading} />}

      {/* Main Content (Navbar + Main) */}
      {!isLoading && (
        <>
          {/* Navbar at the top */}
          {/* <div className="flex justify-center">
            <Navbar navItems={navItems} />
          </div> */}

          {/* Main component aligned to the left */}
          <div className="flex flex-col justify-center items-center w-full">
            <Main />
            <RestHome/>
          </div>
        </>
      )}
    </div>
  );
}


// 'use client';
// import { motion } from 'framer-motion';

// export default function PaymentLockPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 animate-gradient-x">
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden"
//       >
//         {/* Animated floating elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           {[...Array(15)].map((_, i) => (
//             <motion.span
//               key={i}
//               initial={{ y: -100, x: Math.random() * 1000 - 500, opacity: 0 }}
//               animate={{ y: 1000, opacity: [0, 1, 0] }}
//               transition={{
//                 duration: 5 + Math.random() * 5,
//                 repeat: Infinity,
//                 delay: Math.random() * 5,
//               }}
//               className="text-2xl absolute"
//               style={{ color: `hsl(${Math.random() * 360}deg 75% 75%)` }}
//             >
//               ★
//             </motion.span>
//           ))}
//         </div>

//         <div className="relative z-10 space-y-8 text-center">
//           {/* Main 3k Text */}
//           <motion.div
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             <h1 className="text-9xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent inline-block">
//               3K
//             </h1>
//           </motion.div>

//           {/* Animated Message */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="space-y-6"
//           >
//             <motion.p
//               animate={{ textShadow: ["0 0 10px #fff", "0 0 20px #4f46e5", "0 0 10px #fff"] }}
//               transition={{ duration: 2, repeat: Infinity }}
//               className="text-4xl font-bold text-white"
//             >
//               Payment Pending
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8 }}
//               className="text-xl text-white/80 leading-relaxed space-y-4"
//             >
//               <p className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
//                 Pay your developer
//               </p>
//               <motion.p
//                 whileHover={{ scale: 1.05 }}
//                 className="text-2xl text-yellow-300 drop-shadow-lg"
//               >
//                 to unlock your website
//               </motion.p>
//             </motion.div>
//           </motion.div>

//           {/* Subtle Animated Border */}
//           <motion.div
//             animate={{
//               background: [
//                 'linear-gradient(90deg, #ff0000 0%, #00ff00 50%, #0000ff 100%)',
//                 'linear-gradient(90deg, #0000ff 0%, #ff0000 50%, #00ff00 100%)',
//                 'linear-gradient(90deg, #00ff00 0%, #0000ff 50%, #ff0000 100%)',
//               ],
//             }}
//             transition={{ duration: 5, repeat: Infinity }}
//             className="h-1 w-full rounded-full opacity-50"
//           />
//         </div>
//       </motion.div>
//     </div>
//   );
// }