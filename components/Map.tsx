import React from 'react'
import Image from 'next/image'

const Map = () => {
  return (
    <div className="relative group bg-transparent overflow-visible">
      <div className="animate-fadeInUp animate-once">
        <div className="animate-float hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 shadow-xl">
          <Image
            src="/suv.png"
            alt="Luxury SUV"
            width={600}
            height={350}
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  )
}

export default Map