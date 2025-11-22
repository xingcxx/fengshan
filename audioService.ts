import { FanSpeed } from '../types';

class AudioService {
  private context: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private isInitialized = false;

  private init() {
    if (this.isInitialized) return;
    
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.context = new AudioContextClass();
    
    // Create White Noise Buffer
    const bufferSize = 2 * this.context.sampleRate;
    const noiseBuffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02; // Pink-ish noise approximation
      lastOut = output[i];
      output[i] *= 3.5; // Compensate for gain
    }

    this.noiseSource = this.context.createBufferSource();
    this.noiseSource.buffer = noiseBuffer;
    this.noiseSource.loop = true;

    // Filter for "Wind" sound
    this.filterNode = this.context.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.value = 400;

    // Gain for Volume
    this.gainNode = this.context.createGain();
    this.gainNode.gain.value = 0;

    // Connect graph
    this.noiseSource.connect(this.filterNode);
    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    
    this.noiseSource.start(0);
    this.isInitialized = true;
  }

  public setSpeed(speed: FanSpeed) {
    if (!this.isInitialized) this.init();
    if (!this.context || !this.gainNode || !this.filterNode) return;

    if (this.context.state === 'suspended') {
      this.context.resume();
    }

    const currentTime = this.context.currentTime;
    let targetGain = 0;
    let targetFreq = 200;

    switch (speed) {
      case FanSpeed.OFF:
        targetGain = 0;
        targetFreq = 100;
        break;
      case FanSpeed.LOW:
        targetGain = 0.05;
        targetFreq = 300;
        break;
      case FanSpeed.MEDIUM:
        targetGain = 0.15;
        targetFreq = 600;
        break;
      case FanSpeed.HIGH:
        targetGain = 0.3;
        targetFreq = 1000;
        break;
      case FanSpeed.TURBO:
        targetGain = 0.5;
        targetFreq = 1400;
        break;
    }

    // Smooth transition for realistic motor/wind ramp-up
    this.gainNode.gain.setTargetAtTime(targetGain, currentTime, 0.5);
    this.filterNode.frequency.setTargetAtTime(targetFreq, currentTime, 0.5);
  }
}

export const audioService = new AudioService();