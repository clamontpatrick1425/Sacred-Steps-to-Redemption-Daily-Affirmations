/**
 * Sacred Audio Service
 * Uses Web Audio API for ambient sacred soundscapes and Web Speech API for reverent narration.
 */

class SacredAudioService {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private isAmbientPlaying: boolean = false;
  private currentPreset: string = 'dawn-cathedral';
  private volume: number = 0.5;

  private isSpeaking: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private onSpeechEndCallback: (() => void) | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public isPlaying(): boolean {
    return this.isAmbientPlaying;
  }

  public getCurrentPreset(): string {
    return this.currentPreset;
  }

  public startAmbient(preset: string = 'dawn-cathedral') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.stopAmbient();
    this.currentPreset = preset;
    this.isAmbientPlaying = true;

    const t = this.ctx.currentTime;

    if (preset === 'dawn-cathedral') {
      // Warm sacred chords (D major 9th warm drone: D2, A2, F#3, A3, E4)
      const freqs = [73.42, 110.0, 185.0, 220.0, 329.63];
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450 + idx * 40, t);

        // Gentle breathing amplitude
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.08 + idx * 0.02, t);
        lfoGain.gain.setValueAtTime(0.03, t);

        const baseAmp = 0.06 / (idx + 1);
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(baseAmp, t + 2.5);

        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        lfo.start();
        this.activeNodes.push(osc, gain, filter, lfo, lfoGain);
      });
    } else if (preset === 'still-waters') {
      // Gentle bubbling water stream + soft resonant 432Hz fifths
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(320, t);
      filter.Q.setValueAtTime(1.8, t);

      // Modulate filter for gentle wave motion
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, t);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(120, t);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      const waterGain = this.ctx.createGain();
      waterGain.gain.setValueAtTime(0.001, t);
      waterGain.gain.linearRampToValueAtTime(0.09, t + 2);

      whiteNoise.connect(filter);
      filter.connect(waterGain);
      waterGain.connect(this.masterGain);

      whiteNoise.start();
      lfo.start();
      this.activeNodes.push(whiteNoise, filter, lfo, lfoGain, waterGain);

      // Peaceful background 432Hz & 216Hz pad
      [216, 324, 432].forEach((freq) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.025, t + 3);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        this.activeNodes.push(osc, gain);
      });
    } else {
      // Sanctuary Strings / Peaceful Drone (F# major chord pad)
      const notes = [92.5, 138.59, 185.0, 277.18];
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.04 / (idx + 1), t + 3);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        this.activeNodes.push(osc, gain);
      });
    }
  }

  public stopAmbient() {
    this.activeNodes.forEach(node => {
      if (typeof node === 'object' && node !== null) {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          try {
            (node as AudioScheduledSourceNode).stop();
          } catch {
            // ignore if already stopped
          }
        }
        if ('disconnect' in node && typeof node.disconnect === 'function') {
          try {
            node.disconnect();
          } catch {
            // ignore
          }
        }
      }
    });
    this.activeNodes = [];
    this.isAmbientPlaying = false;
  }

  public toggleAmbient(preset: string = 'dawn-cathedral'): boolean {
    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient(preset);
      return true;
    }
  }

  // Chime sound effect for completing a step or starting breathwork
  public playSacredChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    const chimeFreqs = [528, 792, 1056]; // Miracle 528Hz Solfeggio harmonics
    chimeFreqs.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.05);

      gain.gain.setValueAtTime(0.08 / (i + 1), t + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + i * 0.05);
      osc.stop(t + 3.5);
    });
  }

  // Spoken Devotional using SpeechSynthesis
  public speakDevotional(
    text: string,
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88; // Gentle, reverent pace
    utterance.pitch = 0.95;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v =>
      (v.name.includes('Natural') || v.name.includes('Serena') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')) &&
      v.lang.startsWith('en')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const sacredAudio = new SacredAudioService();
