import React from 'react'
import Image from 'next/image'

const Map = () => {
  return (
    <div className="relative group bg-transparent h-full w-full">
      <div className="animate-fadeInUp animate-once h-full">
        <div className="animate-float hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-rotate-3 shadow-xl">
          <Image
            src="/suv.png"
            alt="Luxury SUV"
            width={600}
            height={350}
            className="object-contain drop-shadow-2xl w-full h-full"
            style={{ maxHeight: "400px" }}
          />
        </div>
      </div>
    </div>
  )
}
export default Map