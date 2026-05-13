let currentAudio = null;

function startLoop(id) {
  // Falls schon etwas läuft → stoppen
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(`sounds/${id}.mp3`);
  currentAudio.loop = true; // Endlosschleife aktivieren
  currentAudio.play();
}

function stopLoop() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}
