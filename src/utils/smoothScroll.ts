/**
 * Централизованный плавный скролл.
 *
 * Проблема: Lenis управляет позицией скролла в своём rAF-цикле, а нативный
 * scrollIntoView({ behavior: 'smooth' }) + CSS scroll-smooth на <html> борются
 * с ним за scrollTop -> рывки и зависания при кликах по навигации.
 *
 * Решение: все переходы по секциям идут через единый хелпер, который
 * использует инстанс Lenis, когда он доступен, и учитывает scroll-margin-top
 * секций (иначе фиксированный хедер перекрывает заголовки).
 */

type LenisLike = {
  scrollTo: (target: HTMLElement | number | string, options?: Record<string, unknown>) => void;
};

let lenisInstance: LenisLike | null = null;

export const setLenisInstance = (lenis: LenisLike | null) => {
  lenisInstance = lenis;
};

export const smoothScrollTo = (element: HTMLElement | string) => {
  const target = typeof element === 'string' ? document.getElementById(element) : element;
  if (!target) return;

  if (lenisInstance) {
    const marginTop = parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
    lenisInstance.scrollTo(target, {
      offset: -marginTop,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    return;
  }
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
