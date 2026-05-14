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
// 2) Sound-System
// --------------------------------------
let currentAudio = null;

function playLoop(name) {
  // Absoluter Pfad → GitHub Pages lädt zuverlässig
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
    alert(`Die Datei existiert nicht oder kann nicht geladen werden:\n${file}`);
  };

  currentAudio
    .play()
    .then(() => console.log("Sound läuft:", name))
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
  console.log("Sound gestoppt");
}
