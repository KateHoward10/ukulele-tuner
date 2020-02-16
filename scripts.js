const ukuleleTuner = new Vue({
  el: '#ukulele-tuner',
  data: {
    context: new AudioContext(),
    frequencies: {
      'a#': 233.08,
      b: 246.94,
      c: 261.63,
      'c#': 277.18,
      d: 293.66,
      'd#': 311.13,
      e: 329.63,
      f: 349.23,
      'f#': 369.99,
      g: 392,
      'g#': 415.3,
      a: 440
    },
    aFrets: ['a#', 'b', 'c', 'c#'],
    eFrets: ['f', 'f#', 'g', 'g#'],
    cFrets: ['c#', 'd', 'd#', 'e'],
    gFrets: ['g#', 'a', 'a#', 'b'],
    chord: 'none',
    chords: {
      c: ['a2'],
      f: ['g1', 'e0'],
      g: ['c1', 'e2', 'a1']
    }
  },
  methods: {
    pluckString: function(e, string) {
      if (e.buttons === 1 || e.which === 1) {
        const oscillator = this.context.createOscillator();
        oscillator.frequency.value = this.frequencies[string];
        oscillator.connect(this.context.destination);
        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + 0.5);
      }
    },
    setChord: function(e) {
      document.querySelectorAll('.finger').forEach(finger => finger.remove());
      const notes = this.chords[e.target.value];
      if (notes) {
        notes.forEach(note => {
          const string = document.getElementById(note);
          const finger = document.createElement('div');
          finger.classList.add('finger');
          string.appendChild(finger);
        });
      }
    }
  }
});
