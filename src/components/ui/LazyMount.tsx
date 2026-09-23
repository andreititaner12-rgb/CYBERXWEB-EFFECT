import React, { useState, useEffect, useRef } from 'react';

/**
 * LazyMount — монтирует children только когда блок приближается к вьюпорту
 * (rootMargin ~ 700px). До этого рендерит лёгкий placeholder-заглушку
 * приблизительной высоты (чтобы скроллбар не прыгал).
 *
 * Зачем: тяжёлые секции (WebGL three.js, Leaflet-карта) до этого грузили
 * свои библиотеки и создавали GPU-контексты СРАЗУ при старте страницы,
 * хотя 90% пользователей доскролливают туда намного позже (или никогда).
 */
export const LazyMount: React.FC<{
  children: React.ReactNode;
  /** приблизительная высота контента в px (для стабильности скролла) */
  estimateHeight?: number;
  className?: string;
  /** якорный id: навигация скроллит к секции ещё ДО монтирования контента */
  id?: string;
  /** насколько заранее монтировать (например '1000px 0px' для карты — тайлы успевают осесть) */
  rootMargin?: string;
}> = ({ children, estimateHeight = 600, className = '', id, rootMargin = '700px 0px' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) return;
    const el = ref.current;
    if (!el) return;

    // Если IntersectionObserver недоступен — монтируем сразу
    if (typeof IntersectionObserver === 'undefined') {
      setShouldMount(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      // начинаем загрузку заранее, за 700px до появления
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMount, rootMargin]);

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={shouldMount ? undefined : { minHeight: estimateHeight }}
    >
      {shouldMount ? children : null}
    </div>
  );
};
