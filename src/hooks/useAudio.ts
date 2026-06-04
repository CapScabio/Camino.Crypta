import { useRef, useEffect } from 'react';

export const useAudio = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  const getAudioContext = (): AudioContext => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playBeep = (freq = 600, duration = 0.05, type: OscillatorType = 'sine') => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio failed:', e);
    }
  };

  const playDialogBeep = () => {
    // Randomize pitch slightly for organic speech synthesizer sound
    const pitch = 300 + Math.random() * 150;
    playBeep(pitch, 0.03, 'triangle');
  };

  const playSuccess = () => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      
      // Satisfying JRPG success arpeggio
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        
        gain.gain.setValueAtTime(0.05, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.25);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const playError = () => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      
      // Buzzer sound
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(110, now);
      
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(112, now); // slightly detuned for chorus grit

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
    } catch (e) {
      console.warn(e);
    }
  };

  const playTension = () => {
    // Alert alarm
    playBeep(220, 0.15, 'sawtooth');
    setTimeout(() => playBeep(293, 0.15, 'sawtooth'), 150);
  };

  const startLofiAmbient = () => {
    if (synthIntervalRef.current) return;
    
    try {
      const ctx = getAudioContext();
      
      // Lofi progression notes (maj7 / min7 chords)
      // Cmaj7 (C, E, G, B) -> Am7 (A, C, E, G) -> Fmaj7 (F, A, C, E) -> G7 (G, B, D, F)
      const chords = [
        [130.81, 164.81, 196.00, 246.94], // C3, E3, G3, B3
        [110.00, 130.81, 164.81, 196.00], // A2, C3, E3, G3
        [87.31, 110.00, 130.81, 164.81],  // F2, A2, C3, E3
        [98.00, 123.47, 146.83, 174.61],  // G2, B2, D3, F3
      ];
      
      let chordIndex = 0;

      const playChord = () => {
        const now = ctx.currentTime;
        const currentChord = chords[chordIndex];
        
        currentChord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          
          // Slow attack, long release (dreamy pad)
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.015, now + 1.5);
          gain.gain.setValueAtTime(0.015, now + 3.5);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(now);
          osc.stop(now + 6.0);
        });
        
        // Add a soft high beep (lofi melody note)
        if (Math.random() > 0.4) {
          const melodyNotes = [523.25, 587.33, 659.25, 783.99, 880.00]; // C5, D5, E5, G5, A5
          const melFreq = melodyNotes[Math.floor(Math.random() * melodyNotes.length)];
          const oscMel = ctx.createOscillator();
          const gainMel = ctx.createGain();
          
          oscMel.type = 'sine';
          oscMel.frequency.setValueAtTime(melFreq, now + 1.0);
          
          gainMel.gain.setValueAtTime(0, now + 1.0);
          gainMel.gain.linearRampToValueAtTime(0.008, now + 1.2);
          gainMel.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
          
          oscMel.connect(gainMel);
          gainMel.connect(ctx.destination);
          oscMel.start(now + 1.0);
          oscMel.stop(now + 2.6);
        }

        chordIndex = (chordIndex + 1) % chords.length;
      };

      // Play first chord immediately
      playChord();
      
      // Repeat chord loop every 6 seconds
      synthIntervalRef.current = window.setInterval(playChord, 6000);
    } catch (e) {
      console.warn('Lofi synthesis failed:', e);
    }
  };

  const stopMusic = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  return {
    playBeep,
    playDialogBeep,
    playSuccess,
    playError,
    playTension,
    startMusic: startLofiAmbient,
    stopMusic,
  };
};
