// Morse code dictionary
const morseCode = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
  'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
  'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
  'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
  'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
  'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.'
};

// Translate text to Morse
function textToMorse(text) {
  return text.toUpperCase().split('')
    .map(char => morseCode[char] || ' ')
    .join(' ');
}

// Translate Morse to text
function morseToText(morse) {
  const reversed = Object.fromEntries(Object.entries(morseCode).map(([k,v]) => [v,k]));
  return morse.split(' ')
    .map(code => reversed[code] || ' ')
    .join('');
}

// Play Morse sounds
function playMorse(morse) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let time = audioCtx.currentTime;

  morse.split('').forEach(symbol => {
    if (symbol === '.') {
      beep(audioCtx, time, 0.1); // dot: short beep
      time += 0.2;
    } else if (symbol === '-') {
      beep(audioCtx, time, 0.3); // dash: longer beep
      time += 0.4;
    } else if (symbol === ' ') {
      time += 0.6; // space between letters
    }
  });
}

function beep(ctx, startTime, duration) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscillator.type = 'sine';
  oscillator.frequency.value = 600; // Hz
  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

// Event listeners
document.getElementById('translateBtn').addEventListener('click', () => {
  const text = document.getElementById('textInput').value;
  const morse = textToMorse(text);
  document.getElementById('output').textContent = morse;
});

document.getElementById('reverseBtn').addEventListener('click', () => {
  const morse = document.getElementById('morseInput').value.trim();
  const text = morseToText(morse);
  document.getElementById('reverseOutput').textContent = text;
});

document.getElementById('playMorseBtn').addEventListener('click', () => {
  const morse = document.getElementById('output').textContent;
  if (morse) playMorse(morse);
});
