// Audio synthesizer using Web Audio API for interactive cyberpunk micro-sounds

class SoundController {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  // UI-микрозвуки (клики, появление навигации/капсулы, toggle-бип) ОТКЛЮЧЕНЫ
  // по просьбе пользователя: остались только женское приветствие и шаги CS2.
  private uiSounds = false;
  private voiceAudio: HTMLAudioElement | null = null;
  private voiceStarted: boolean = false;
  private voicePlaying: boolean = false;

  constructor() {
    // Lazy initialize on first interaction or preloader
  }

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // База планирования всех звуковых событий: currentTime + 30мс.
  // Контекст создаётся «замороженным» (suspended) до первого жеста пользователя:
  // события, запланированные на замороженное время, после resume оказываются
  // в прошлом и НЕ проигрываются (классический баг «первый клик без звука»).
  // Смещение +30мс гарантирует, что событие останется в будущем после resume.
  private now(): number {
    return (this.ctx ? this.ctx.currentTime : 0) + 0.03;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (val) this.init();
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.setEnabled(!this.enabled);
    if (this.enabled) {
      this.playBeep(880, 'sine', 0.1, 0.05);
    }
    return this.enabled;
  }

  // Preloader: Data gathering & telemetry stream sound
  public playDataPacket(progress: number) {
    if (!this.uiSounds) return; // UI-звуки отключены (см. uiSounds)
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Rising frequency from 350Hz up to 1250Hz as data gathers to 100%
      const baseFreq = 350 + (progress / 100) * 900;
      osc.type = progress % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(baseFreq, this.now());
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 120, this.now() + 0.035);

      gain.gain.setValueAtTime(0.025, this.now());
      gain.gain.exponentialRampToValueAtTime(0.0001, this.now() + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.now() + 0.035);
    } catch {
      // Ignore
    }
  }

  // Preloader Complete / System Ready Chime
  public playSystemReady() {
    if (!this.uiSounds) return; // UI-звуки отключены (см. uiSounds)
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.now());
      osc.frequency.exponentialRampToValueAtTime(1040, this.now() + 0.18);

      gain.gain.setValueAtTime(0.06, this.now());
      gain.gain.exponentialRampToValueAtTime(0.0001, this.now() + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.now() + 0.22);
    } catch {
      // Ignore
    }
  }

  // Nav item stagger appearance HUD sound (КЛУБЫ, ПРАЙС, ЖЕЛЕЗО, ТУРНИРЫ, АКЦИИ)
  public playNavAppear(index: number) {
    if (!this.uiSounds) return; // UI-звуки отключены (см. uiSounds)
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Staggered ascending melodic notes for each nav element
      const frequencies = [440, 554.37, 659.25, 880, 1108.73];
      const freq = frequencies[index % frequencies.length];

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.now());
      osc.frequency.exponentialRampToValueAtTime(freq * 1.08, this.now() + 0.08);

      gain.gain.setValueAtTime(0.03, this.now());
      gain.gain.exponentialRampToValueAtTime(0.0001, this.now() + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.now() + 0.09);
    } catch {
      // Ignore
    }
  }

  // Capsule «НАЧАТЬ ЗНАКОМСТВО» reveal sound
  public playCapsuleAppear() {
    if (!this.uiSounds) return; // UI-звуки отключены (см. uiSounds)
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(330, this.now());
      osc.frequency.exponentialRampToValueAtTime(660, this.now() + 0.25);

      gain.gain.setValueAtTime(0.035, this.now());
      gain.gain.exponentialRampToValueAtTime(0.0001, this.now() + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.now() + 0.28);
    } catch {
      // Ignore
    }
  }

  // Звук наведения ВЫРЕЗАН по просьбе пользователя («пик» при hover был
  // навязчивым). Метод оставлен как no-op, чтобы не трогать все вызовы.
  public playHover() {
    // no-op: тишина
  }

  public playClick() {
    if (!this.uiSounds) return; // UI-звуки отключены (см. uiSounds)
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.now());
      osc.frequency.exponentialRampToValueAtTime(140, this.now() + 0.08);

      gain.gain.setValueAtTime(0.04, this.now());
      gain.gain.exponentialRampToValueAtTime(0.0001, this.now() + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.now() + 0.08);
    } catch {
      // Ignore
    }
  }

  public playTrigger() {
    if (!this.uiSounds) return; // UI-звуки отключены (см. uiSounds)
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(550, this.now());
      osc.frequency.exponentialRampToValueAtTime(1200, this.now() + 0.12);

      gain.gain.setValueAtTime(0.03, this.now());
      gain.gain.exponentialRampToValueAtTime(0.0001, this.now() + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.now() + 0.12);
    } catch {
      // Ignore
    }
  }

  // Female voice greeting playback (strictly plays ONCE, preventing double triggers/stutter)
  public playVoiceGreeting(): Promise<void> {
    if (!this.enabled || this.voiceStarted) return Promise.resolve();
    this.voiceStarted = true;
    this.voicePlaying = true;
    this.init();
    try {
      if (!this.voiceAudio) {
        this.voiceAudio = new Audio('/audio/welcome-cyberx-female.mp3');
        this.voiceAudio.volume = 1.0;
        this.voiceAudio.onended = () => {
          this.voicePlaying = false;
        };
      }
      return this.voiceAudio.play().catch((err) => {
        this.voiceStarted = false;
        this.voicePlaying = false;
        throw err;
      });
    } catch (e) {
      this.voiceStarted = false;
      this.voicePlaying = false;
      return Promise.reject(e);
    }
  }

  public isVoicePlaying(): boolean {
    return this.voicePlaying;
  }

  public hasVoiceStarted(): boolean {
    return this.voiceStarted;
  }

  private playBeep(freq: number, type: OscillatorType, dur: number, vol: number) {
    if (!this.uiSounds) return; // UI-звуки отключены
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.now());
    gain.gain.setValueAtTime(vol, this.now());
    gain.gain.exponentialRampToValueAtTime(0.001, this.now() + dur);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.now() + dur);
  }
}

export const sound = new SoundController();
