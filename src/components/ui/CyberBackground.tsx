import React from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

/**
 * CyberBackground — фирменный фон CyberX: точечная матрица + ambient-свечения
 * + ПАРАЛЛАКС-глоу (движение при скролле с разными скоростями -> глубина).
 *
 * Архитектура производительности (главный урок аудита: ни одного большого
 * и ни одного фиксированного анимируемого слоя):
 *  1. Статичная база — многослойный градиент как обычная КРАСКА (background-image):
 *     ноль композитных слоёв, ноль стоимости при скролле;
 *  2. Параллакс — набор МАЛЕНЬКИХ (≈40–55vw) радиальных глоу, разбросанных
 *     по высоте страницы; каждый смещается медленнее контента (transform-only
 *     через useScroll) -> глубина сцены; вне вьюпорта глоу ничего не стоит;
 *  3. Никаких blur-фильтров — только radial-gradient (0% GPU blur cost);
 *  4. Движение только от скролла — в покое нулевая работа (постоянные анимации
 *     под backdrop-filter карточек заставляли бы бесконечно пересемплировать фон).
 */

interface GlowSpec {
  /** позиция по вертикали, % высоты страницы */
  top: number;
  /** горизонтальная позиция (tailwind left/right arbitrary) */
  x: string;
  /** размеры */
  size: string;
  /** цвет rgb */
  rgb: string;
  alpha: number;
  /** коэффициент параллакса: смещение = -scrollY * k (больше = ближе) */
  k: number;
}

const GLOWS: GlowSpec[] = [
  { top: 1,  x: 'left: -12%',  size: 'w-[52vw] h-[46vh]', rgb: '20,16,38',  alpha: 0.40, k: 0.06 },
  { top: 8,  x: 'right: -10%', size: 'w-[46vw] h-[40vh]', rgb: '227,33,36', alpha: 0.05, k: 0.16 },
  { top: 16, x: 'left: 16%',  size: 'w-[56vw] h-[48vh]', rgb: '59,130,246', alpha: 0.045, k: 0.10 },
  { top: 24, x: 'right: 8%',  size: 'w-[50vw] h-[42vh]', rgb: '147,14,16', alpha: 0.12, k: 0.20 },
  { top: 33, x: 'left: -8%',  size: 'w-[54vw] h-[46vh]', rgb: '20,16,38',  alpha: 0.32, k: 0.08 },
  { top: 43, x: 'right: -12%', size: 'w-[48vw] h-[40vh]', rgb: '227,33,36', alpha: 0.045, k: 0.18 },
  { top: 52, x: 'left: 20%',  size: 'w-[58vw] h-[46vh]', rgb: '99,102,241', alpha: 0.05, k: 0.11 },
  { top: 61, x: 'right: 6%',  size: 'w-[52vw] h-[44vh]', rgb: '20,16,38',  alpha: 0.28, k: 0.07 },
  { top: 71, x: 'left: -10%', size: 'w-[50vw] h-[42vh]', rgb: '227,33,36', alpha: 0.05, k: 0.17 },
  { top: 78, x: 'right: 14%', size: 'w-[56vw] h-[46vh]', rgb: '147,14,16', alpha: 0.09, k: 0.13 },
];

const ParallaxGlow: React.FC<{ spec: GlowSpec; scrollY: MotionValue<number> }> = ({ spec, scrollY }) => {
  // Смещение от скролла: глоу «отстаёт» от контента -> параллакс-глубина.
  // transform-only: compositor, без repaint; в покое — нулевая стоимость.
  const y = useTransform(scrollY, (v) => -v * spec.k);

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${spec.size} ${spec.x}`}
      style={{
        top: `${spec.top}%`,
        y,
        borderRadius: '9999px',
        background: `radial-gradient(closest-side, rgba(${spec.rgb},${spec.alpha}) 0%, rgba(${spec.rgb},${Math.round(spec.alpha * 60) / 100}) 50%, rgba(${spec.rgb},${Math.round(spec.alpha * 22) / 100}) 75%, transparent 100%)`,
      }}
    />
  );
};

export const CyberBackground: React.FC = () => {
  const { scrollY } = useScroll();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">

      {/* 1. Deep Obsidian / Dark Titanium Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020204] via-[#05050a] via-[#030307] to-[#020204]" />

      {/* 2. Delicate Micro-Dot Matrix Grid Layer (Static GPU Texture, zero jitter) */}
      <div
        className="absolute inset-0 cyber-dots-bg opacity-35"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 12%, rgba(0,0,0,0.8) 88%, rgba(0,0,0,0.2) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 12%, rgba(0,0,0,0.8) 88%, rgba(0,0,0,0.2) 100%)',
        }}
      />

      {/* 3. Pre-computed High-Performance Ambient Glow Radial Gradients (0% GPU blur cost) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 700px 500px at 10% 8%, rgba(227, 33, 36, 0.055) 0%, transparent 70%),
            radial-gradient(ellipse 650px 500px at 90% 22%, rgba(59, 130, 246, 0.035) 0%, transparent 70%),
            radial-gradient(ellipse 750px 550px at 15% 45%, rgba(227, 33, 36, 0.05) 0%, transparent 70%),
            radial-gradient(ellipse 600px 500px at 85% 62%, rgba(99, 102, 241, 0.04) 0%, transparent 70%),
            radial-gradient(ellipse 700px 400px at 50% 75%, rgba(227, 33, 36, 0.04) 0%, transparent 70%)
          `
        }}
      />

      {/* 3.5 Параллакс-глоу: маленькие слои, разные скорости -> живая глубина при скролле */}
      {GLOWS.map((g, i) => (
        <ParallaxGlow key={i} spec={g} scrollY={scrollY} />
      ))}

      {/* 4. Top & Bottom Smooth Edge Fades */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#020204] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#020204] via-[#020204] to-transparent pointer-events-none" />

    </div>
  );
};
