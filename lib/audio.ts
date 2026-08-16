// Cybernetic Web Audio API Synthesizer Engine & Mobile Haptic Driver
// Generates purely synthesized, zero-latency sci-fi audio effects and mobile haptics

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private hasInteracted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        this.hasInteracted = true;
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
      };
      window.addEventListener('pointerdown', unlockAudio, { passive: true });
      window.addEventListener('keydown', unlockAudio, { passive: true });
      window.addEventListener('touchstart', unlockAudio, { passive: true });
    }
  }

  private init(): boolean {
    if (!this.ctx && typeof window !== 'undefined') {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.value = this.isMuted ? 0 : 0.25;
          this.masterGain.connect(this.ctx.destination);
        }
      } catch {
        return false;
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      if (this.hasInteracted) {
        this.ctx.resume().catch(() => {});
      } else {
        return false;
      }
    }

    return Boolean(this.ctx && this.masterGain && this.ctx.state === 'running');
  }

  // Mobile Tactile Haptic Vibration Trigger
  public triggerHaptic(duration: number | number[] = 15) {
    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(duration as VibratePattern);
      }
    } catch {}
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.triggerHaptic(20);
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.25, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Tactile Cybernetic Click with Mobile Haptic Pulse
  public playClick() {
    this.hasInteracted = true;
    this.triggerHaptic(12);
    if (this.isMuted) return;
    try {
      if (!this.init() || !this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {}
  }

  // Soft Cyber Hover Frequency Chirp
  public playHover() {
    if (this.isMuted || !this.hasInteracted) return;
    try {
      if (!this.init() || !this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {}
  }

  // Terminal Keystroke Blip
  public playKeypress() {
    this.hasInteracted = true;
    this.triggerHaptic(8);
    if (this.isMuted) return;
    try {
      if (!this.init() || !this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400 + Math.random() * 400, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {}
  }

  // Cryptographic Glitch / Distortion
  public playGlitch() {
    this.triggerHaptic([20, 30, 20]);
    if (this.isMuted) return;
    try {
      if (!this.init() || !this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.03);
      osc.frequency.setValueAtTime(110, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {}
  }

  // Genesis Activation / Hyper-Warp Chord with Cosmic Haptic Pulse
  public playGenesisActivation() {
    this.hasInteracted = true;
    this.triggerHaptic([30, 50, 40, 60, 30]);
    if (this.isMuted) return;
    try {
      if (!this.init() || !this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const frequencies = [220, 330, 440, 660, 880];

      frequencies.forEach((freq, i) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.6);

        gain.gain.setValueAtTime(0.2, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + i * 0.05);
        osc.stop(now + 0.7);
      });
    } catch {}
  }

  // Access Granted Chime
  public playAccessGranted() {
    this.hasInteracted = true;
    this.triggerHaptic([25, 40, 50]);
    if (this.isMuted) return;
    try {
      if (!this.init() || !this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.2, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } catch {}
  }
}

export const sound = new SoundEngine();
