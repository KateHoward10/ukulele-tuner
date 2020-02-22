const ukuleleTuner = new Vue({
  el: '#ukulele-tuner',
  data: {
    context: new (AudioContext || webkitAudioContext)(),
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
    strings: {
      g: ['g#', 'a', 'a#', 'b'],
      c: ['c#', 'd', 'd#', 'e'],
      e: ['f', 'f#', 'g', 'g#'],
      a: ['a#', 'b', 'c', 'c#']
    },
    chord: 'none',
    chords: {
      none: [],
      c: ['a2'],
      f: ['g1', 'e0'],
      g: ['c1', 'e2', 'a1']
    }
  },
  methods: {
    pluckString: function(e) {
      if (e.buttons === 1 || e.which === 1) {
        const oscillator = this.context.createOscillator();
        oscillator.frequency.value = this.frequencies[e.target.value];
        const gainNode = this.context.createGain();
        gainNode.gain.value = 0.3;
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + 0.3);
      }
    },
    setChord: function(e) {
      document
        .querySelectorAll('.section')
        .forEach(section => section.setAttribute('value', section.getAttribute('id')));
      document.querySelectorAll('.finger').forEach(finger => finger.remove());
      const notes = this.chords[e.target.value];
      if (notes) {
        notes.forEach(note => {
          const string = document.getElementById(note);
          const finger = document.createElement('div');
          finger.classList.add('finger');
          string.appendChild(finger);
          const currentNote = string.parentElement;
          const stringName = note.split('')[0];
          const fret = note.split('')[1];
          currentNote.setAttribute('value', this.strings[stringName][fret]);
        });
      }
    }
  }
});
