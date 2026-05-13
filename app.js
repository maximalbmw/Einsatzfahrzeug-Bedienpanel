function playSound(id) {
  const audio = new Audio(`sounds/${id}.mp3`);
  audio.play();
}

function toggleLight(id) {
  const btn = event.target;
  btn.classList.toggle('active');
  btn.style.boxShadow = btn.classList.contains('active')
    ? '0 0 25px #00ffcc'
    : '';
}

function toggleDoor(id) {
  alert(`${id} toggled`);
}
