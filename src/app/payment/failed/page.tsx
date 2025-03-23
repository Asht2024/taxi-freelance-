"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function PaymentFailed() {
const router=useRouter();
  useEffect(()=>{
      setTimeout(()=>{
         router.push('/')
      },5000)
  })
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-8">
          Please try again or contact support.
        </p>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
        >
          Redirecting to home 
        </button>
      </div>
    </div>
  );
}