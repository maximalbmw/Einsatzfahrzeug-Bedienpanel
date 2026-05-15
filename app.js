// --------------------------------------
// 1) Audio auf Handy freischalten
// --------------------------------------
let audioUnlocked = false;

function unlockAudio() {
  if (audioUnlocked) return;
  const a = new Audio();
  a.play().catch(() => {});
  audioUnlocked = true;
  console.log("Audio freigeschaltet");
}

document.addEventListener("pointerdown", unlockAudio, { once: true });
document.addEventListener("touchstart", unlockAudio, { once: true });


// --------------------------------------
// 2) Sound-System mit Status-Indikatoren
// --------------------------------------
let currentAudio = null;
let activeButton = null;

function setActive(buttonId) {
  // Vorherigen aktiven Button zurücksetzen
  if (activeButton) {
    activeButton.classList.remove('active');
  }
  if (buttonId) {
    const btn = document.getElementById(buttonId);
    if (btn) {
      btn.classList.add('active');
      activeButton = btn;
    }
  } else {
    activeButton = null;
  }
}

function playLoop(name) {
  const file = `${window.location.origin}/Einsatzfahrzeug-Bedienpanel/sounds/${name}.mp3`;

  console.log("Versuche zu starten:", file);

  // Falls bereits etwas läuft → stoppen
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(file);
  currentAudio.loop = true;
  currentAudio.volume = 1.0;

  // Fehler sichtbar machen
  currentAudio.onerror = () => {
    console.error("Sound konnte nicht geladen werden:", file);
    setActive(null);
    alert(`Die Datei existiert nicht oder kann nicht geladen werden:\n${file}`);
  };

  currentAudio
    .play()
    .then(() => {
      console.log("Sound läuft:", name);
      setActive(`btn-${name}`);
    })
    .catch((err) => {
      console.error("Fehler beim Abspielen:", err);
      alert("Audio wurde blockiert. Tippe einmal auf die Seite und versuche es erneut.");
    });
}

function stopSound() {
  if (!currentAudio) return;
  currentAudio.pause();
  currentAudio.currentTime = 0;
  currentAudio = null;
  setActive(null);
  console.log("Sound gestoppt");
}


// --------------------------------------
// 3) Blaulicht-Overlay
// --------------------------------------
function startBlaulicht(mode) {
  const overlay = document.getElementById('blaulicht-overlay');
  // Reset: alle Klassen entfernen und Animation neu starten
  overlay.classList.remove('active', 'mode1', 'mode2');
  // Reflow erzwingen damit die Animation sauber neu startet
  void overlay.offsetWidth;
  overlay.classList.add('active', mode === 2 ? 'mode2' : 'mode1');
}

function stopBlaulicht() {
  const overlay = document.getElementById('blaulicht-overlay');
  overlay.classList.remove('active', 'mode1', 'mode2');
}


// --------------------------------------
// 4) Anhalte-Signal Overlay
// --------------------------------------
function startAnhalteSignal() {
  const overlay = document.getElementById('anhalte-overlay');
  overlay.classList.remove('active');
  void overlay.offsetWidth;
  overlay.classList.add('active');
}

function stopAnhalteSignal() {
  const overlay = document.getElementById('anhalte-overlay');
  overlay.classList.remove('active');
}
