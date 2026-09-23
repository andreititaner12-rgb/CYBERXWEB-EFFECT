import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const BrandBottomBanner: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#000000] py-16 sm:py-24 md:py-28 border-t border-white/[0.08] select-none">
      
      {/* Ambient background glow when hovered */}
      <div 
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          opacity: isHovered ? 0.35 : 0.05,
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(227, 33, 36, 0.4) 0%, rgba(227, 33, 36, 0.08) 35%, transparent 70%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          className="relative group cursor-default transition-all duration-500 max-w-4xl"
        >
          {/* Typographic Hero Stack */}
          <div className="space-y-0 sm:space-y-1">
            
            {/* CYBERX. with Red Square Dot */}
            <div className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[140px] tracking-tight uppercase leading-[0.88] text-white flex items-baseline drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
              <span>CYBERX</span>
              <span className="inline-block w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 bg-[#E32124] ml-2 sm:ml-3 shadow-[0_0_20px_#E32124] transition-transform duration-300 group-hover:scale-125" />
            </div>

            {/* OMSK Outlined Text with Interactive Neon Glow on Hover */}
            <div 
              className={`font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[140px] tracking-tight uppercase leading-[0.88] transition-all duration-500 ${
                isHovered 
                  ? 'text-outline-banner-glow scale-[1.01] translate-x-1' 
                  : 'text-outline-banner'
              }`}
            >
              OMSK
            </div>

          </div>

          {/* Description Below Typography */}
          <motion.p 
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isHovered ? 1 : 0.75 }}
            transition={{ duration: 0.3 }}
            className="mt-6 sm:mt-8 text-xs sm:text-sm md:text-base text-zinc-300 max-w-2xl font-normal leading-relaxed"
          >
            Официальная сеть киберспортивных клубов CyberX Community в Омске. Мониторы до 600Hz, Premium-комнаты, два автосимулятора и LAN-сцена — в трёх клубах, круглый год и круглые сутки.
          </motion.p>

          {/* Interactive Dynamic Outline Trail indicator */}
          <div 
            className="mt-6 h-[2px] w-full bg-white/[0.08] relative overflow-hidden rounded-full transition-all duration-500 group-hover:bg-[#E32124]/20"
          >
            <div 
              className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-[#E32124] to-transparent transition-all duration-75"
              style={{
                left: `${mousePos.x}%`,
                transform: 'translateX(-50%)',
                opacity: isHovered ? 1 : 0,
                boxShadow: '0 0 15px #E32124'
              }}
            />
          </div>

        </div>
      </div>

    </section>
  );
};
