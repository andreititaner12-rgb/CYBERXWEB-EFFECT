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
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/sound';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultArenaId?: string;
  defaultZoneId?: string;
}

interface ClubBookingInfo {
  id: string;
  title: string;
  shortTitle: string;
  address: string;
  langameUrl: string;
  qrImage: string;
  description: string;
  badge?: string;
}

const CLUBS_BOOKING: ClubBookingInfo[] = [
  {
    id: 'cyberx-arena',
    title: 'CyberX Arena // Флагман',
    shortTitle: 'Ленина, 19',
    address: 'ул. Ленина, 19',
    langameUrl: 'https://langame.ru/club/799452760',
    qrImage: '/qr/qr-lenina.png',
    description: '86 ПК • 2 Sim-Racing кокпита • 2 Premium зала • 150" Экран',
    badge: 'Центр // Флагман',
  },
  {
    id: 'cyberx-evropa',
    title: 'CyberX Европа // Нефтяники',
    shortTitle: 'Мира, 42к1',
    address: 'просп. Мира, 42, корп. 1',
    langameUrl: 'https://langame.ru/club/799457743',
    qrImage: '/qr/qr-evropa.png',
    description: '46 ПК • Solo Room Ryzen 7800X3D + 600Hz • 3 PS5 зала',
    badge: 'Студгородок',
  },
  {
    id: 'cyberx-oktyabr',
    title: 'CyberX Октябрь // Ленинский',
    shortTitle: 'Серова, 19А',
    address: 'ул. Серова, 19А',
    langameUrl: 'https://langame.ru/club/799456444',
    qrImage: '/qr/qr-oktyabr.png',
    description: '50 ПК • Solo 600Hz • Trio & Duo Rooms • Удобная парковка',
    badge: 'Приватные залы',
  },
];

const APP_STORE_URL = 'https://apps.apple.com/ru/app/cyberx/id6504088566';

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultArenaId,
  defaultZoneId,
}) => {
  const [selectedClubId, setSelectedClubId] = useState<string>(
    defaultArenaId || 'cyberx-arena'
  );
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [showAppStoreQR, setShowAppStoreQR] = useState(false);
  
  // Step: 'rules' (first time in session) or 'booking'
  const [viewStep, setViewStep] = useState<'rules' | 'booking'>('booking');

  useEffect(() => {
    if (defaultArenaId) {
      const match = CLUBS_BOOKING.find((c) => c.id === defaultArenaId);
      if (match) setSelectedClubId(match.id);
    }
  }, [defaultArenaId]);

  // Check if rules have been confirmed during this browser session
  useEffect(() => {
    if (isOpen) {
      try {
        const rulesConfirmed = sessionStorage.getItem('cyberx_rules_confirmed');
        if (rulesConfirmed === 'true') {
          setViewStep('booking');
        } else {
          setViewStep('rules');
        }
      } catch {
        setViewStep('booking');
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = /android|iphone|ipad|ipod|windows phone/i.test(navigator.userAgent || '') || window.innerWidth < 768;
      setIsMobileDevice(isMobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock background scroll & close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentClub = CLUBS_BOOKING.find((c) => c.id === selectedClubId) || CLUBS_BOOKING[0];

  const handleOpenExternal = (url: string) => {
    sound.playClick();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleConfirmRules = () => {
    sound.playClick();
    try {
      sessionStorage.setItem('cyberx_rules_confirmed', 'true');
    } catch {}
    setViewStep('booking');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none overscroll-contain"
      data-lenis-prevent="true"
      onClick={onClose}
    >
      <div 
        data-lenis-prevent="true"
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto overscroll-contain bg-gradient-to-b from-[#141018] via-[#0E0B14] to-[#07060A] border border-white/10 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.95)] p-6 sm:p-8"
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

        {/* =========================================================================
            STEP 1: FIRST-TIME SESSION CLUB RULES SCREEN
        ========================================================================= */}
        {viewStep === 'rules' ? (
          <div className="space-y-5 animate-fadeIn">
            {/* Header */}
            <div className="font-mono text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E32124]/15 border border-[#E32124]/30 text-[#E32124] text-[10px] font-bold uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5" />
                <span>РЕГЛАМЕНТ & БЕЗОПАСНОСТЬ</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                ПРАВИЛА ПОСЕЩЕНИЯ <span className="text-[#E32124]">CYBERX</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Пожалуйста, ознакомьтесь с основными правилами пребывания в кибераренах перед бронированием места.
              </p>
            </div>

            {/* Rules Cards List */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-[#E32124]/20 border border-[#E32124]/40 flex items-center justify-center text-[#E32124] shrink-0 font-bold">
                  18+
                </div>
                <div>
                  <div className="text-white font-bold uppercase text-[11px]">Ночной пакет (22:00 — 08:00)</div>
                  <div className="text-zinc-400 mt-0.5 leading-relaxed text-[11px]">
                    Лицам младше 18 лет вход в ночное время строго запрещен законом РФ. Для оформления ночной сессии необходим оригинал паспорта.
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-white font-bold uppercase text-[11px]">Бережное отношение к девайсам</div>
                  <div className="text-zinc-400 mt-0.5 leading-relaxed text-[11px]">
                    Запрещено употреблять открытые напитки и пищу над игровыми клавиатурами общего зала. В VIP комнатах и лаунжах предусмотрены обеденные столы.
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-white font-bold uppercase text-[11px]">Своя периферия разрешена</div>
                  <div className="text-zinc-400 mt-0.5 leading-relaxed text-[11px]">
                    Вы можете подключать свои мыши, клавиатуры и наушники. Администратор поможет мгновенно настроить софт.
                  </div>
                </div>
              </div>
            </div>

            {/* Confirm & Proceed Button */}
            <div className="pt-2">
              <button
                onClick={handleConfirmRules}
                className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#E32124] via-[#FF2A2E] to-[#E32124] text-white font-mono font-black text-xs sm:text-sm uppercase tracking-[0.18em] shadow-[0_0_35px_rgba(227,33,36,0.7)] hover:shadow-[0_0_50px_rgba(227,33,36,0.95)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
              >
                <span>ПОНЯТНО, ПЕРЕЙТИ К БРОНИРОВАНИЮ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================================
              STEP 2: BOOKING VIEW (DIRECT APP / QR CODE SELECTION)
          ========================================================================= */
          <div className="animate-fadeIn">
            {/* Header Title */}
            <div className="mb-6 font-mono text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E32124]/15 border border-[#E32124]/30 text-[#E32124] text-[10px] font-bold uppercase tracking-wider mb-2">
                <Zap className="w-3.5 h-3.5" />
                <span>ОНЛАЙН БРОНИРОВАНИЕ В 1 КЛИК // 24/7</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                МОБИЛЬНОЕ <span className="text-[#E32124]">ПРИЛОЖЕНИЕ</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Выбирайте нужный клуб CyberX в Омске и бронируйте желаемый ПК или зал в официальном приложении CyberX Community.
              </p>
            </div>

            {/* Zone indicator if directed from a specific zone card */}
            {defaultZoneId && (
              <div className="mb-4 p-3 rounded-2xl bg-[#E32124]/10 border border-[#E32124]/30 flex items-center justify-between font-mono text-xs text-white">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#E32124] animate-pulse" />
                  <span>Выбрана зона: <strong className="text-white uppercase">{defaultZoneId}</strong></span>
                </div>
                <span className="text-[10px] text-zinc-400">Переход в приложение →</span>
              </div>
            )}

            {/* 1. Club Selector Tabs */}
            <div className="mb-6">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E32124]" />
                <span>1. Выберите клуб для брони:</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {CLUBS_BOOKING.map((club) => {
                  const isSelected = selectedClubId === club.id && !showAppStoreQR;
                  return (
                    <button
                      key={club.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedClubId(club.id);
                        setShowAppStoreQR(false);
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#181116] border-[#E32124] shadow-[0_0_20px_rgba(227,33,36,0.3)]'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/30 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="font-mono font-bold text-xs uppercase text-white truncate">
                        {club.shortTitle}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400 truncate mt-1">
                        {club.badge || club.address}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Main Action Card (Mobile Direct vs Desktop QR) */}
            {isMobileDevice ? (
              /* MOBILE VIEW: Direct 1-Tap Action Buttons */
              <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#151018] to-[#0A0910] border border-[#E32124]/30 shadow-xl space-y-4 font-mono text-center overflow-hidden">
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#E32124]/40 to-transparent pointer-events-none" />
                
                <div className="w-14 h-14 rounded-2xl bg-[#E32124]/20 border border-[#E32124]/50 flex items-center justify-center mx-auto text-[#E32124] shadow-[0_0_20px_rgba(227,33,36,0.4)]">
                  <Smartphone className="w-7 h-7" />
                </div>

                <div>
                  <h4 className="font-sans font-black text-xl text-white uppercase">
                    {currentClub.title}
                  </h4>
                  <p className="text-xs text-zinc-300 mt-1">
                    {currentClub.address}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    {currentClub.description}
                  </p>
                </div>

                {/* Primary Action Button: Open in Langame / CyberX App */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => handleOpenExternal(currentClub.langameUrl)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#E32124] to-[#FF2A2E] text-white font-bold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(227,33,36,0.7)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border border-white/20"
                  >
                    <span>ЗАБРОНИРОВАТЬ В CYBERX APP</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  {/* Secondary Button: Download App in App Store */}
                  <button
                    onClick={() => handleOpenExternal(APP_STORE_URL)}
                    className="w-full py-3 px-6 rounded-2xl bg-white/[0.05] hover:bg-white/10 text-zinc-200 hover:text-white border border-white/15 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-zinc-400" />
                    <span>СКАЧАТЬ В APP STORE</span>
                  </button>

                  {/* Rules Button under QR/Actions (Mobile) */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setViewStep('rules');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#E32124]" />
                    <span>ПРАВИЛА КЛУБА</span>
                  </button>
                </div>

              </div>
            ) : (
              /* DESKTOP VIEW: High-Resolution Scannable QR Code */
              <div className="relative p-6 rounded-3xl bg-gradient-to-b from-[#151018] to-[#0A0910] border border-[#E32124]/30 shadow-2xl flex flex-col sm:flex-row items-center gap-6 font-mono overflow-hidden">
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#E32124]/40 to-transparent pointer-events-none" />
                
                {/* Left: QR Code Box + Rules Button directly below */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="relative p-3 bg-white rounded-2xl shadow-[0_0_30px_rgba(227,33,36,0.25)] border-2 border-[#E32124]">
                    <img
                      src={showAppStoreQR ? '/qr/qr-appstore.png' : currentClub.qrImage}
                      alt={`QR code for ${showAppStoreQR ? 'App Store' : currentClub.title}`}
                      className="w-40 h-40 object-contain rounded-lg"
                    />
                    {/* Corner Accents */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#E32124]" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#E32124]" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#E32124]" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#E32124]" />
                  </div>

                  {/* Rules Button directly under QR code */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setViewStep('rules');
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm hover:border-[#E32124]/50"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#E32124]" />
                    <span>ПРАВИЛА КЛУБА</span>
                  </button>
                </div>

                {/* Right: Info & Steps */}
                <div className="space-y-3 text-left flex-1">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#E32124] tracking-widest block">
                      {showAppStoreQR ? 'ОФИЦИАЛЬНОЕ ПРИЛОЖЕНИЕ' : currentClub.badge}
                    </span>
                    <h4 className="font-sans font-black text-lg text-white uppercase">
                      {showAppStoreQR ? 'CYBERX COMMUNITY APP' : currentClub.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {showAppStoreQR ? 'Доступно в App Store для iOS' : currentClub.address}
                    </p>
                  </div>

                  {/* 3 Step Guide */}
                  <div className="space-y-1.5 text-[11px] text-zinc-300">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#E32124]/20 text-[#E32124] font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                      <span>Наведите камеру смартфона на QR-код</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#E32124]/20 text-[#E32124] font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                      <span>Откроется страница {showAppStoreQR ? 'приложения' : 'клуба'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#E32124]/20 text-[#E32124] font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                      <span>Выберите свободный ПК или зону</span>
                    </div>
                  </div>

                  {/* Direct Link Button */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenExternal(showAppStoreQR ? APP_STORE_URL : currentClub.langameUrl)}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border border-white/10"
                    >
                      <span>Открыть в браузере</span>
                      <ExternalLink className="w-3 h-3 text-zinc-400" />
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* 3. Bottom App Store Quick Switch Bar */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
              
              <button
                onClick={() => {
                  sound.playClick();
                  setShowAppStoreQR(!showAppStoreQR);
                }}
                className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#E32124]" />
                <span>{showAppStoreQR ? '← Вернуться к выбору клубов' : 'Показать QR для скачивания в App Store'}</span>
              </button>

              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Официальный сервис бронирования Langame</span>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
