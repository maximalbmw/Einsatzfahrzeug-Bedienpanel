// Globale Variable für aktuell spielenden Sound
let currentAudio = null;
let audioUnlocked = false;

// Audio einmalig "freischalten" (wichtig für Handy-Browser)
document.addEventListener(
  "click",
  () => {
    if (audioUnlocked) return;
    const a = new Audio();
    a.play().catch(() => {});
    audioUnlocked = true;
    console.log("Audio freigeschaltet");
  },
  { once: true }
);

// Hilfsfunktion: Sound starten (Endlosschleife)
function startLoop(id) {
  // Falls schon etwas läuft → stoppen
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  // Neue Audio-Datei laden
  const src = `sounds/${id}.mp3`;
  console.log("Starte Sound:", src);

  currentAudio = new Audio(src);
  currentAudio.loop = true;

  currentAudio
    .play()
    .then(() => {
      console.log("Sound läuft:", src);
    })
    .catch((err) => {
      console.error("Konnte Sound nicht abspielen:", err);
      alert(
        "Sound konnte nicht gestartet werden. Tippe einmal irgendwo auf die Seite und versuche es erneut."
      );
    });
}

// Sound stoppen
function stopLoop() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    console.log("Sound gestoppt");
    currentAudio = null;
  }
}

// Beispiel: weitere Funktionen (falls du sie nutzt)
function toggleLight(id) {
  const btn = event.currentTarget;
  btn.classList.toggle("active");
  console.log("Light toggle:", id);
}
