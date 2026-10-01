import React, { useEffect, useRef } from 'react';
import type Lenis from 'lenis';

interface Props {
  lenis: Lenis | null;
  loading: boolean;
}

export const TopScrollProgressBar: React.FC<Props> = ({ lenis, loading }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading) return;

    const el = barRef.current;
    if (!el) return;

    const update = (customProgress?: number) => {
      let p: number;
      if (typeof customProgress === 'number' && !isNaN(customProgress)) {
        p = Math.min(1, Math.max(0, customProgress));
      } else {
        const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const current = window.scrollY || window.pageYOffset || 0;
        p = Math.min(1, Math.max(0, current / total));
      }

      el.style.transform = `scaleX(${p})`;
      el.style.opacity = p > 0.002 ? '1' : '0';
    };

    // Immediate initial sync
    update();

    const handleNativeScroll = () => update();
    const handleResize = () => update();

    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Lenis high-frequency sync
    const handleLenisScroll = (e: { progress: number }) => {
      update(e.progress);
    };

    if (lenis) {
      lenis.on('scroll', handleLenisScroll);
    }

    // Dynamic document height observer (handles lazy-mounted components, photos loading)
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && document.body) {
      resizeObserver = new ResizeObserver(() => {
        update();
      });
      resizeObserver.observe(document.body);
    }

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      window.removeEventListener('resize', handleResize);
      if (lenis) {
        lenis.off('scroll', handleLenisScroll);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [loading, lenis]);

  if (loading) return null;

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[3px] sm:h-[3.5px] bg-gradient-to-r from-[#8B0000] via-[#E32124] to-[#FF4D4D] shadow-[0_0_14px_#E32124,0_0_24px_rgba(227,33,36,0.85)] z-[100] origin-left pointer-events-none transition-opacity duration-200 will-change-transform"
      style={{
        transform: 'scaleX(0)',
        opacity: 0,
      }}
    />
  );
};
