import React, { useState, useEffect } from 'react';
import {
  X,
  Smartphone,
  ExternalLink,
  Zap,
  Download,
  ShieldCheck,
  MapPin,
  Flame,
  FileText,
  QrCode,
  Play,
} from 'lucide-react';
import { sound } from '../utils/sound';
import { pauseLenis, resumeLenis } from '../utils/smoothScroll';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRules?: () => void;
  /** Клуб, из которого пришли (показываем подсказку, но QR больше не привязан к клубу) */
  defaultArenaId?: string;
  defaultZoneId?: string;
}

type StoreId = 'google-play' | 'app-store';

interface AppStoreInfo {
  id: StoreId;
  label: string;
  shortLabel: string;
  platform: string;
  url: string;
  qrImage: string;
  icon: React.ElementType;
}

/** Один QR на установку приложения, две площадки на выбор. */
const APP_STORES: AppStoreInfo[] = [
  {
    id: 'google-play',
    label: 'Google Play',
    shortLabel: 'ANDROID',
    platform: 'Для смартфонов Android',
    url: 'https://play.google.com/store/apps/details?id=ru.langame.cyberx&hl=ru',
    qrImage: '/qr/qr-google-play.png',
    icon: Play,
  },
  {
    id: 'app-store',
    label: 'App Store',
    shortLabel: 'iOS',
    platform: 'Для iPhone и iPad',
    url: 'https://apps.apple.com/ru/app/cyberx/id6504088566',
    qrImage: '/qr/qr-appstore.png',
    icon: Smartphone,
  },
];

const CLUB_LABELS: Record<string, string> = {
  'cyberx-arena': 'Ленина, 19',
  'cyberx-evropa': 'Мира, 42к1',
  'cyberx-oktyabr': 'Серова, 19А',
};

const ZONE_LABELS: Record<string, string> = {
  'premium-squad': 'Premium Squad',
  'sim-racing': 'Sim-Racing',
  'projector-lounge': 'Кино-лаунж',
  'solo-stream-room': 'Solo 600Hz',
  'ps5-lounge': 'PS5 зал',
  'super-vip': 'Super VIP',
  'open-arena': 'Открытая арена',
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onOpenRules,
  defaultArenaId,
  defaultZoneId,
}) => {
  const [selectedStoreId, setSelectedStoreId] = useState<StoreId>(() => {
    if (typeof navigator === 'undefined') return 'google-play';
    return /iphone|ipad|ipod/i.test(navigator.userAgent) ? 'app-store' : 'google-play';
  });
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobile =
        /android|iphone|ipad|ipod|windows phone/i.test(navigator.userAgent || '') ||
        window.innerWidth < 768;
      setIsMobileDevice(isMobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock background scroll & close on Escape
  useEffect(() => {
    if (!isOpen) return;
    pauseLenis();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const originalOverflow = document.body.style.overflow;
    const originalTouch = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    window.addEventListener('keydown', onKey);
    return () => {
      resumeLenis();
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouch;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentStore = APP_STORES.find((s) => s.id === selectedStoreId) || APP_STORES[0];
  const otherStore = APP_STORES.find((s) => s.id !== currentStore.id) || APP_STORES[1];
  const clubLabel = defaultArenaId ? CLUB_LABELS[defaultArenaId] : undefined;
  const zoneLabel = defaultZoneId
    ? ZONE_LABELS[defaultZoneId] || defaultZoneId.replace(/-/g, ' ')
    : undefined;

  const handleOpenExternal = (url: string) => {
    sound.playClick();
    if (isMobileDevice) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenRules = () => {
    sound.playClick();
    onClose();
    onOpenRules?.();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-xl animate-fadeIn select-none overscroll-contain"
      data-lenis-prevent="true"
      onClick={onClose}
    >
      <div
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        className="relative w-full h-full sm:h-auto overflow-y-auto overscroll-contain bg-gradient-to-b from-[#141018] via-[#0E0B14] to-[#07060A] border-0 sm:border border-white/10 rounded-none sm:rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.95)] flex flex-col my-auto max-w-xl sm:max-h-[92vh] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Top Accent Crimson Line */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#E32124] to-transparent shadow-[0_0_10px_#E32124] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-all cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="animate-fadeIn">
          {/* Header */}
          <div className="mb-6 font-mono text-center sm:text-left pr-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E32124]/15 border border-[#E32124]/30 text-[#E32124] text-[10px] font-bold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>ОНЛАЙН БРОНИРОВАНИЕ В 1 КЛИК // 24/7</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
              МОБИЛЬНОЕ <span className="text-[#E32124]">ПРИЛОЖЕНИЕ</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Установите официальное приложение CYBERX Community — и бронируйте ПК, приватные залы и PS5 в любом из трёх клубов сети в Омске.
            </p>
          </div>

          {/* Context hints from the zone/card the visitor came from */}
          {(zoneLabel || clubLabel) && (
            <div className="mb-4 p-3 rounded-2xl bg-[#E32124]/10 border border-[#E32124]/30 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-white">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#E32124] animate-pulse" />
                <span>
                  {clubLabel ? `Клуб: ${clubLabel}` : 'Все клубы сети'}
                  {zoneLabel ? ` • Зона: ${zoneLabel}` : ''}
                </span>
              </div>
              <span className="text-[10px] text-zinc-400">Доступно в приложении →</span>
            </div>
          )}

          {/* 1. Store selector: Google Play / App Store */}
          <div className="mb-5">
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-[#E32124]" />
              <span>1. Выберите, откуда скачать приложение:</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {APP_STORES.map((store) => {
                const Icon = store.icon;
                const isSelected = selectedStoreId === store.id;
                return (
                  <button
                    key={store.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedStoreId(store.id);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-[#181116] border-[#E32124] shadow-[0_0_20px_rgba(227,33,36,0.3)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/30 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-[#E32124]/20 border-[#E32124]/50 text-[#E32124]'
                          : 'bg-white/[0.04] border-white/10 text-zinc-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono font-bold text-xs uppercase text-white truncate">
                        {store.label}
                      </span>
                      <span className="block text-[10px] font-mono text-zinc-400 truncate mt-0.5">
                        {store.shortLabel} • {store.platform}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Single app-install QR + instructions */}
          <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#151018] to-[#0A0910] border border-[#E32124]/30 shadow-2xl flex flex-col sm:flex-row items-center gap-5 sm:gap-6 font-mono overflow-hidden">
            <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#E32124]/40 to-transparent pointer-events-none" />

            {/* QR code */}
            <div className="flex flex-col items-center gap-3 shrink-0 w-full sm:w-auto">
              <div className="relative p-3 bg-white rounded-2xl shadow-[0_0_30px_rgba(227,33,36,0.25)] border-2 border-[#E32124]">
                <img
                  key={currentStore.id}
                  src={currentStore.qrImage}
                  alt={`QR-код для установки CYBERX из ${currentStore.label}`}
                  className="w-36 h-36 sm:w-40 sm:h-40 object-contain rounded-lg"
                />
                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#E32124]" />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#E32124]" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#E32124]" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#E32124]" />
              </div>

              <button
                onClick={handleOpenRules}
                className="w-full py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm hover:border-[#E32124]/50"
              >
                <FileText className="w-3.5 h-3.5 text-[#E32124]" />
                <span>ПРАВИЛА КЛУБА</span>
              </button>
            </div>

            {/* Info & steps */}
            <div className="space-y-3 text-left flex-1 w-full">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#E32124] tracking-widest block">
                  ОФИЦИАЛЬНОЕ ПРИЛОЖЕНИЕ • {currentStore.shortLabel}
                </span>
                <h4 className="font-sans font-black text-lg text-white uppercase">
                  CYBERX COMMUNITY APP
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {currentStore.platform} • {currentStore.label}
                </p>
              </div>

              <div className="space-y-1.5 text-[11px] text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E32124]/20 text-[#E32124] font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                  <span>Наведите камеру смартфона на QR-код</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E32124]/20 text-[#E32124] font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                  <span>Установите приложение CYBERX Community</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E32124]/20 text-[#E32124] font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                  <span>Выберите клуб, свободный ПК или зал</span>
                </div>
              </div>

              <div className="pt-1 space-y-2">
                <button
                  onClick={() => handleOpenExternal(currentStore.url)}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#E32124] to-[#FF2A2E] text-white font-bold text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(227,33,36,0.5)] flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer border border-white/20"
                >
                  <Download className="w-4 h-4" />
                  <span>ОТКРЫТЬ {currentStore.label.toUpperCase()}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedStoreId(otherStore.id);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#E32124]" />
                  <span>НУЖЕН {otherStore.label.toUpperCase()}? СМЕНИТЬ QR</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3. Footer */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 font-mono text-[10px] sm:text-xs">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-[#E32124] shrink-0" />
              <span>В приложении: Ленина 19 • Мира 42к1 • Серова 19А</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Официальный сервис бронирования Langame</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
