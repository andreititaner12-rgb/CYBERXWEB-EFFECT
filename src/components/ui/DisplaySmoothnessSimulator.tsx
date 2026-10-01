import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sound } from '../../utils/sound';
import { Zap, MousePointerClick, RefreshCw, Eye } from 'lucide-react';

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

interface CursorHistoryPoint {
  x: number;
  y: number;
  time: number;
  vx: number;
  vy: number;
}

export const DisplaySmoothnessSimulator: React.FC = () => {
  const [hzValue, setHzValue] = useState<number>(600);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHoveredRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(false);
  const statusBadgeRef = useRef<HTMLSpanElement>(null);

  const hzRef = useRef<number>(600);
  hzRef.current = hzValue;

  // Real mouse target position
  const mouseTargetRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  // Current smoothed physical cursor state
  const physicsRef = useRef({
    x: 200,
    y: 90,
    vx: 5.5,
    vy: 2.5,
  });

  const shockwavesRef = useRef<Shockwave[]>([]);
  // Dense high-frequency time-stamped history buffer (up to 400ms of motion history)
  const historyRef = useRef<CursorHistoryPoint[]>([]);

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

    // Helper to draw a sleek gamer cursor
    const drawCursorShape = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      scale: number,
      alpha: number,
      color: string,
      glow: boolean = false
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      if (glow) {
        ctx.shadowColor = '#E32124';
        ctx.shadowBlur = 12;
      }

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(13, 10);
      ctx.lineTo(7.5, 11);
      ctx.lineTo(11, 18);
      ctx.lineTo(8, 19.5);
      ctx.lineTo(4.5, 12.5);
      ctx.lineTo(0, 16);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.1;
      ctx.globalAlpha = Math.min(1, alpha * 1.3);
      ctx.stroke();

      ctx.restore();
    };

    const render = (time: number) => {
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
      const mouse = mouseTargetRef.current;

      // 1. Motion generation: Follow mouse smoothly when active, or run dynamic sweeping figure-8
      if (mouse.active) {
        const dx = mouse.x - phys.x;
        const dy = mouse.y - phys.y;
        const spring = 0.22;
        phys.vx = phys.vx * 0.75 + dx * spring;
        phys.vy = phys.vy * 0.75 + dy * spring;
        phys.x += phys.vx;
        phys.y += phys.vy;
      } else {
        // High-speed energetic sweep across the display to clearly show motion refresh difference
        const sweepSpeed = 0.0028;
        const centerX = width * 0.5;
        const centerY = height * 0.5;
        const radiusX = Math.max(80, width * 0.42);
        const radiusY = Math.max(30, height * 0.34);

        const targetX = centerX + Math.sin(time * sweepSpeed) * radiusX;
        const targetY = centerY + Math.sin(time * sweepSpeed * 2) * radiusY;

        phys.vx = (targetX - phys.x) * 0.35;
        phys.vy = (targetY - phys.y) * 0.35;
        phys.x = targetX;
        phys.y = targetY;
      }

      // Record high-precision continuous motion point
      historyRef.current.push({
        x: phys.x,
        y: phys.y,
        time,
        vx: phys.vx,
        vy: phys.vy,
      });

      // Keep only recent 220ms of history for trail
      const maxAge = 200;
      historyRef.current = historyRef.current.filter((pt) => time - pt.time <= maxAge);

      // 2. Draw Interactive Shockwaves
      shockwavesRef.current = shockwavesRef.current
        .map((sw) => ({
          ...sw,
          radius: sw.radius + 6,
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

      // 3. Draw Refresh Rate Cursor Trail based on exact Hz sample interval
      // Interval between discrete rendered frames in milliseconds
      const sampleIntervalMs = 1000 / hz;
      const history = historyRef.current;

      if (history.length > 1) {
        // Sample points backwards in time at exact sampleIntervalMs intervals
        const sampledPoints: { x: number; y: number; ageRatio: number }[] = [];
        let targetSampleTime = time;

        while (targetSampleTime >= time - maxAge) {
          // Find closest interpolated point in history
          for (let i = history.length - 1; i >= 0; i--) {
            const cur = history[i];
            const prev = history[i - 1];

            if (cur.time <= targetSampleTime && prev) {
              const segDt = cur.time - prev.time || 1;
              const tRatio = (targetSampleTime - prev.time) / segDt;
              const clampedRatio = Math.max(0, Math.min(1, tRatio));
              const interpX = prev.x + (cur.x - prev.x) * clampedRatio;
              const interpY = prev.y + (cur.y - prev.y) * clampedRatio;
              const ageRatio = 1 - (time - targetSampleTime) / maxAge;

              sampledPoints.push({ x: interpX, y: interpY, ageRatio });
              break;
            }
          }
          targetSampleTime -= sampleIntervalMs;
        }

        // Draw connecting laser ribbon for higher refresh rates
        if (sampledPoints.length > 2) {
          ctx.beginPath();
          ctx.moveTo(sampledPoints[0].x, sampledPoints[0].y);
          for (let i = 1; i < sampledPoints.length; i++) {
            ctx.lineTo(sampledPoints[i].x, sampledPoints[i].y);
          }
          const ribbonAlpha = hz >= 480 ? 0.35 : hz >= 240 ? 0.2 : 0.08;
          ctx.strokeStyle = hz >= 360 ? `rgba(227, 33, 36, ${ribbonAlpha})` : `rgba(160, 160, 180, ${ribbonAlpha})`;
          ctx.lineWidth = hz >= 480 ? 3.5 : 2;
          ctx.stroke();
        }

        // Draw individual ghosted cursor instances along the sampled trail
        // At 60Hz: fewer instances spaced far apart with visible gaps/judder
        // At 600Hz: high density forming an unbroken fluid motion
        for (let i = sampledPoints.length - 1; i >= 1; i--) {
          const pt = sampledPoints[i];
          const fadeAlpha = pt.ageRatio * (hz >= 480 ? 0.6 : hz >= 240 ? 0.45 : 0.35);
          const cursorScale = 0.65 + pt.ageRatio * 0.35;
          const ghostColor = hz >= 360 
            ? (i % 2 === 0 ? '#E32124' : '#FF4D50') 
            : '#8E8E9A';

          drawCursorShape(ctx, pt.x, pt.y, cursorScale, fadeAlpha, ghostColor, false);
        }
      }

      // 4. Draw Leading Active Cursor (Full brightness + neon glow)
      drawCursorShape(ctx, phys.x, phys.y, 1.05, 1.0, '#E32124', true);

      // Trailing small energy core
      ctx.beginPath();
      ctx.arc(phys.x, phys.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#E32124';
      ctx.shadowBlur = 10;
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
      statusBadgeRef.current.textContent = 'ТРЕКИНГ МЫШИ';
      statusBadgeRef.current.className = 'text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 font-bold bg-emerald-500/15 border-emerald-500/40 text-emerald-400';
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    mouseTargetRef.current.active = false;
    if (statusBadgeRef.current) {
      statusBadgeRef.current.textContent = 'АВТО-СВИП // 600HZ DEMO';
      statusBadgeRef.current.className = 'text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 font-bold bg-zinc-800/80 border-white/10 text-zinc-400';
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseTargetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  }, []);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    sound.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Add Shockwave
    shockwavesRef.current.push({
      x: clickX,
      y: clickY,
      radius: 6,
      opacity: 1,
    });

    mouseTargetRef.current = {
      x: clickX,
      y: clickY,
      active: true,
    };
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

    mouseTargetRef.current = {
      x: clickX,
      y: clickY,
      active: true,
    };
  }, []);

  const resetBall = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    mouseTargetRef.current.active = false;
    const canvas = canvasRef.current;
    const w = canvas ? canvas.clientWidth : 500;
    const h = canvas ? canvas.clientHeight : 160;

    physicsRef.current = {
      x: w / 2,
      y: h / 2,
      vx: 6.0,
      vy: -2.5,
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
            Тест плавности шлейфа курсора:
          </span>
          <span 
            ref={statusBadgeRef}
            className="text-[10px] px-2.5 py-0.5 rounded-full border flex items-center gap-1 font-bold bg-zinc-800/80 border-white/10 text-zinc-400"
          >
            АВТО-СВИП // 600HZ DEMO
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-xl border shadow-sm transition-all ${
            isHighHz
              ? 'text-white bg-[#E32124] border-[#E32124] shadow-red-600/30'
              : 'text-zinc-300 bg-white/5 border-white/10'
          }`}>
            {hzValue} Гц // {frameTimeMs} мс задержка
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
          onMouseMove={handleMouseMove}
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
              Двигайте курсором мыши над полем или переключайте герцовку ниже
            </span>
          </span>
          
          <button
            onClick={resetBall}
            className="pointer-events-auto p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer shrink-0 ml-2"
            title="Перезапустить авто-движение"
          >
            <RefreshCw className="w-3 h-3 text-[#E32124]" />
            <span>Авто-свип</span>
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
