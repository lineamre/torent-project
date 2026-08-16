// Android Haptics Vibration Utility

export const haptic = {
  // Light tick for tab navigation, toggle switches
  tick: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(8);
      } catch {}
    }
  },

  // Card touch / select
  cardSelect: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {}
    }
  },

  // Card flip waveform
  cardFlip: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([12, 30, 20]);
      } catch {}
    }
  },

  // Shuffle sequence
  shuffle: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([10, 25, 10, 25, 15, 30, 20]);
      } catch {}
    }
  },

  // Celebratory synthesis revelation
  success: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([30, 50, 40, 60, 60]);
      } catch {}
    }
  },
};
