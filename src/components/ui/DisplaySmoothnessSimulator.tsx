import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sound } from '../../utils/sound';
import { Zap, MousePointerClick, RefreshCw, Eye } from 'lucide-react';

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

export const DisplaySmoothnessSimulator: React.FC = () => {
  const [hzValue, setHzValue] = useState<number>(600);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHoveredRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(false);
  const statusBadgeRef = useRef<HTMLSpanElement>(null);

  const hzRef = useRef<number>(600);
  hzRef.current = hzValue;

  const physicsRef = useRef({
    x: 200,
    y: 90,
    vx: 3.2,
    vy: 1.6,
  });

  const shockwavesRef = useRef<Shockwave[]>([]);
  const trailRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set stable canvas internal buffer dimensions matching container
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Observer to completely pause rendering when offscreen
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, { threshold: 0.05 });

    observer.observe(canvas);

    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);

      // Zero rendering when offscreen
      if (!isVisibleRef.current) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      if (width <= 0 || height <= 0) return;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const phys = physicsRef.current;
      const hz = hzRef.current;
      const radius = 17;

      // Only calculate physics & movement when user hovers the canvas
      if (isHoveredRef.current) {
        phys.x += phys.vx;
        phys.y += phys.vy;

        // Friction & glide
        phys.vx *= 0.994;
        phys.vy *= 0.994;

        // Maintain comfortable balanced speed
        const currentSpeed = Math.sqrt(phys.vx * phys.vx + phys.vy * phys.vy);
        if (currentSpeed < 2.0) {
          const angle = Math.atan2(phys.vy, phys.vx) || 0.6;
          phys.vx = Math.cos(angle) * 2.8;
          phys.vy = Math.sin(angle) * 2.8;
        }

        // Boundary collisions with smooth bounce
        if (phys.x - radius <= 0) {
          phys.x = radius;
          phys.vx = Math.abs(phys.vx) * 0.95 + 0.3;
        } else if (phys.x + radius >= width) {
          phys.x = width - radius;
          phys.vx = -Math.abs(phys.vx) * 0.95 - 0.3;
        }

        if (phys.y - radius <= 0) {
          phys.y = radius;
          phys.vy = Math.abs(phys.vy) * 0.95 + 0.3;
        } else if (phys.y + radius >= height) {
          phys.y = height - radius;
          phys.vy = -Math.abs(phys.vy) * 0.95 - 0.3;
        }

        // Trail calculation based on Hz setting
        const maxTrail = hz === 600 ? 24 : hz === 480 ? 20 : hz === 360 ? 16 : hz === 240 ? 12 : hz === 144 ? 8 : 4;
        trailRef.current.push({ x: phys.x, y: phys.y });
        if (trailRef.current.length > maxTrail) {
          trailRef.current.shift();
        }
      } else {
        // When not hovered, slowly fade out old trail to save resources
        if (trailRef.current.length > 0) {
          trailRef.current.shift();
        }
      }

      // 1. Draw Shockwaves
      shockwavesRef.current = shockwavesRef.current
        .map((sw) => ({
          ...sw,
          radius: sw.radius + 5.5,
          opacity: sw.opacity - 0.045,
        }))
        .filter((sw) => sw.opacity > 0);

      shockwavesRef.current.forEach((sw) => {
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(227, 33, 36, ${sw.opacity * 0.85})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      });

      // 2. Draw Motion Trail Ghosts
      const trail = trailRef.current;
      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i];
        const ratio = (i + 1) / trail.length;
        const alpha = ratio * (hz >= 480 ? 0.3 : hz >= 240 ? 0.4 : 0.5);
        const ghostRadius = radius * (0.55 + ratio * 0.45);

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, ghostRadius, 0, Math.PI * 2);

        if (hz >= 360) {
          ctx.fillStyle = `rgba(227, 33, 36, ${alpha})`;
        } else if (hz >= 144) {
          ctx.fillStyle = `rgba(200, 70, 75, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(140, 140, 150, ${alpha})`;
        }
        ctx.fill();
      }

      // 3. Draw Main Physical Red Neon Sphere
      ctx.save();
      ctx.shadowColor = '#E32124';
      ctx.shadowBlur = isHoveredRef.current ? 16 : 8;

      ctx.beginPath();
      ctx.arc(phys.x, phys.y, radius, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(phys.x - 4, phys.y - 4, 2, phys.x, phys.y, radius);
      grad.addColorStop(0, '#FF5E62');
      grad.addColorStop(0.65, '#E32124');
      grad.addColorStop(1, '#8A0E10');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      // Center bright white specular glint
      ctx.beginPath();
      ctx.arc(phys.x - 4.5, phys.y - 4.5, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateCanvasSize);
      observer.disconnect();
    };
  }, []);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    if (statusBadgeRef.current) {
      statusBadgeRef.current.textContent = 'АКТИВЕН';
      statusBadgeRef.current.className = 'text-[10px] px-2.5 py-0.5 rounded-full border flex items-center gap-1 font-bold bg-emerald-500/15 border-emerald-500/40 text-emerald-400';
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (statusBadgeRef.current) {
      statusBadgeRef.current.textContent = 'ОЖИДАНИЕ НАВЕДЕНИЯ';
      statusBadgeRef.current.className = 'text-[10px] px-2.5 py-0.5 rounded-full border flex items-center gap-1 font-bold bg-zinc-800/80 border-white/10 text-zinc-400';
    }
  };

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    sound.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    isHoveredRef.current = true;

    // Add Shockwave
    shockwavesRef.current.push({
      x: clickX,
      y: clickY,
      radius: 6,
      opacity: 1,
    });

    // Apply immediate physical momentum impulse
    const phys = physicsRef.current;
    const dx = phys.x - clickX;
    const dy = phys.y - clickY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const force = Math.max(16, Math.min(36, 420 / dist));

    phys.vx += (dx / dist) * force;
    phys.vy += (dy / dist) * force;
  }, []);

  const handleCanvasTouch = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    sound.playClick();
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const clickX = touch.clientX - rect.left;
    const clickY = touch.clientY - rect.top;

    isHoveredRef.current = true;

    // Add Shockwave
    shockwavesRef.current.push({
      x: clickX,
      y: clickY,
      radius: 6,
      opacity: 1,
    });

    // Apply immediate physical momentum impulse
    const phys = physicsRef.current;
    const dx = phys.x - clickX;
    const dy = phys.y - clickY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const force = Math.max(16, Math.min(36, 420 / dist));

    phys.vx += (dx / dist) * force;
    phys.vy += (dy / dist) * force;
  }, []);

  const resetBall = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    const canvas = canvasRef.current;
    const w = canvas ? canvas.clientWidth : 500;
    const h = canvas ? canvas.clientHeight : 160;

    physicsRef.current = {
      x: w / 2,
      y: h / 2,
      vx: 3.2,
      vy: -1.6,
    };
  };

  const frameTimeMs = (1000 / hzValue).toFixed(2);
  const isHighHz = hzValue >= 360;

  return (
    <div className="space-y-4 font-mono select-none">
      
      {/* Top Controls & Matrix Smoothness Readout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#E32124]" />
          <span className="text-xs uppercase tracking-wider text-zinc-300 font-bold">
            Симулятор плавности матрицы:
          </span>
          <span 
            ref={statusBadgeRef}
            className="text-[10px] px-2.5 py-0.5 rounded-full border flex items-center gap-1 font-bold bg-zinc-800/80 border-white/10 text-zinc-400"
          >
            ОЖИДАНИЕ НАВЕДЕНИЯ
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-xl border shadow-sm transition-all ${
            isHighHz
              ? 'text-white bg-[#E32124] border-[#E32124] shadow-red-600/30'
              : 'text-zinc-300 bg-white/5 border-white/10'
          }`}>
            {hzValue} FPS // {frameTimeMs} мс
          </span>
        </div>
      </div>

      {/* High-Performance Canvas Sandbox (Rock-Solid Fixed Height, 0 Layout Shifts, 0 Lag) */}
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative h-48 sm:h-52 rounded-3xl border border-white/10 hover:border-[#E32124]/60 bg-[#07070d] hover:bg-[#090912] transition-colors duration-200 overflow-hidden shadow-2xl flex items-center justify-center transform-gpu"
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onTouchStart={handleCanvasTouch}
          onTouchMove={handleCanvasTouch}
          className="w-full h-full cursor-crosshair block"
        />

        {/* Top-Left Live Difference Annotation */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border flex items-center gap-1.5 shadow-md ${
            hzValue === 60
              ? 'bg-red-950/80 border-red-500/40 text-red-300'
              : hzValue >= 480
              ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
              : 'bg-black/70 border-white/15 text-zinc-300'
          }`}>
            <Eye className="w-3 h-3 text-[#E32124]" />
            {hzValue === 60 && '60 Hz: Заметные разрывы шлейфа и ступени'}
            {hzValue === 144 && '144 Hz: Базовая киберспортивная плавность'}
            {hzValue === 240 && '240 Hz: Плотный непрерывный след'}
            {hzValue === 360 && '360 Hz: Высокая четкость траектории'}
            {hzValue === 480 && '480 Hz: Экстремальная микро-плавность'}
            {hzValue === 600 && '600 Hz: Абсолютный монолитный лазерный шлейф BenQ'}
          </span>
        </div>

        {/* Bottom Interactive Hint */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-zinc-400 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 pointer-events-none">
          <span className="flex items-center gap-1.5 text-zinc-200 truncate">
            <MousePointerClick className="w-3.5 h-3.5 text-[#E32124] shrink-0" />
            <span className="truncate">
              Наведите курсор и кликайте для создания ударной волны
            </span>
          </span>
          
          <button
            onClick={resetBall}
            className="pointer-events-auto p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer shrink-0 ml-2"
            title="Сбросить шар в центр"
          >
            <RefreshCw className="w-3 h-3 text-[#E32124]" />
            <span>В центр</span>
          </button>
        </div>
      </div>

      {/* Hz Frequency Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {[60, 144, 240, 360, 480, 600].map((val) => (
          <button
            key={val}
            onClick={() => {
              sound.playClick();
              setHzValue(val);
            }}
            onMouseEnter={() => sound.playHover()}
            className={`flex-1 min-w-[70px] py-2 text-xs font-mono font-bold rounded-xl transition-all border cursor-pointer ${
              hzValue === val
                ? 'bg-[#E32124] text-white border-[#E32124] shadow-lg shadow-red-600/40 scale-105'
                : 'bg-white/[0.04] text-zinc-400 border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
            }`}
          >
            {val}Hz
          </button>
        ))}
      </div>

    </div>
  );
};
