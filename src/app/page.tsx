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