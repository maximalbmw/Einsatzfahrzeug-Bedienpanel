// ------------------------------
// Audio Unlock (Pflicht für Handy)
// ------------------------------
let audioUnlocked = false;
document.addEventListener(
  "pointerdown",
  () => {
    if (audioUnlocked) return;
    const a = new Audio();
    a.play().catch(() => {});
    audioUnlocked = true;
    console.log("Audio freigeschaltet");
  },
  { once: true }
);

// ------------------------------
// Sound-System
// ------------------------------
let currentAudio = null;

function playLoop(name) {
  const file = `sounds/${name}.mp3`;

  console.log("Starte:", file);

  // Falls bereits etwas läuft → stoppen
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  // Neue Audio-Datei laden
  currentAudio = new Audio(file);
  currentAudio.loop = true;

  // Lautstärke optional anpassen
  currentAudio.volume = 1.0;

  currentAudio
    .play()
    .then(() => console.log("Läuft:", file))
    .catch((err) => {
      console.error("Fehler:", err);
      alert(
        "Sound konnte nicht gestartet werden. Tippe einmal auf die Seite und versuche es erneut."
      );
    });
}

function stopSound() {
  if (!currentAudio) return;
  currentAudio.pause();
  currentAudio.currentTime = 0;
  currentAudio = null;
  console.log("Sound gestoppt");
}
