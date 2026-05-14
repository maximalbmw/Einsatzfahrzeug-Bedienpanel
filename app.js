let currentAudio = null;

function startLoop(id) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(`sounds/${id}.mp3`);
  currentAudio.loop = true;
  currentAudio.play();
}

function stopLoop() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

function toggleLight(id) {
  const btn = event.currentTarget;
  btn.classList.toggle("active");
}
