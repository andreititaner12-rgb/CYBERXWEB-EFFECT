import React, { useState } from 'react';

export const BrandBottomBanner: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full bg-transparent pt-12 sm:pt-20 pb-8 sm:pb-12 select-none">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group cursor-default transition-all duration-500 max-w-5xl"
        >
          {/* Typographic Hero Stack */}
          <div className="space-y-0.5 sm:space-y-1">
            
            {/* CYBERX. with Red Square Dot */}
            <div className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[130px] xl:text-[150px] tracking-tight uppercase leading-[0.86] text-white flex items-baseline drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
              <span>CYBERX</span>
              <span className="inline-block w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 bg-[#E32124] ml-2.5 sm:ml-4 shadow-[0_0_20px_#E32124] transition-transform duration-300 group-hover:scale-125 group-hover:shadow-[0_0_30px_#E32124]" />
            </div>

            {/* OMSK Outlined Text with Interactive Neon Glow on Hover */}
            <div 
              className={`font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[130px] xl:text-[150px] tracking-tight uppercase leading-[0.86] transition-all duration-500 ${
                isHovered 
                  ? 'text-outline-banner-glow scale-[1.008] translate-x-1' 
                  : 'text-outline-banner'
              }`}
            >
              OMSK
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
