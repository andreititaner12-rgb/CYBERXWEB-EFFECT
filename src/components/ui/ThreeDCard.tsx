import React, { createContext, useState, useContext, useRef, useEffect, useCallback } from 'react';

const MouseEnterContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([
  false,
  () => {},
]);

const isCoarsePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

const MAX_TILT_DEG = 12;

export const CardContainer = ({
  children,
  className = '',
  containerClassName = '',
  onHoverChange,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  onHoverChange?: (isHovered: boolean) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  // Apply the tilt exactly once per animation frame (mousemove can fire 100+ times/sec)
  const applyTilt = useCallback(() => {
    rafRef.current = null;
    const el = containerRef.current;
    const p = pointerRef.current;
    if (!el || !p) return;

    // Clamp the angle for a stable, artifact-free perspective
    const rotY = Math.max(-MAX_TILT_DEG, Math.min(MAX_TILT_DEG, p.x));
    const rotX = Math.max(-MAX_TILT_DEG, Math.min(MAX_TILT_DEG, -p.y));

    el.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(0)`;
  }, []);

  const scheduleTilt = useCallback(
    (x: number, y: number) => {
      pointerRef.current = { x, y };
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(applyTilt);
      }
    },
    [applyTilt]
  );

  const cancelScheduledTilt = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    pointerRef.current = null;
  }, []);

  // Cleanup on unmount
  useEffect(() => cancelScheduledTilt, [cancelScheduledTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable 3D tilt on touch devices for fluid native scroll
    if (isCoarsePointer()) return;
    const el = containerRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    scheduleTilt((e.clientX - left - width / 2) / 20, (e.clientY - top - height / 2) / 20);
  };

  const handleMouseEnter = () => {
    if (isCoarsePointer()) return;
    const el = containerRef.current;
    // Follow the cursor 1:1 — no CSS transition while tilting (transition per mousemove
    // restarts the animation constantly and causes flicker/lag on large screens)
    if (el) el.style.transition = 'transform 0ms';
    setIsMouseEntered(true);
    if (onHoverChange) onHoverChange(true);
  };

  const handleMouseLeave = () => {
    const el = containerRef.current;
    cancelScheduledTilt();
    setIsMouseEntered(false);
    if (onHoverChange) onHoverChange(false);
    // Smooth glide back to the neutral position
    if (el) {
      el.style.transition = 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)';
      el.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
    }
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={containerClassName}
        style={{ perspective: '1000px' }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`transform-gpu will-change-transform ${className}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardItem = ({
  as: Tag = 'div',
  children,
  className = '',
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useContext(MouseEnterContext);

  useEffect(() => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Tag
      ref={ref}
      className={`transition-transform duration-300 ease-out transform-gpu ${className}`}
      style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
      {...rest}
    >
      {children}
    </Tag>
  );
};
