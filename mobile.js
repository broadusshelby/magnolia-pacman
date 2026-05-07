function setDirection(dir){
  movePlayer(dir);
}

document.addEventListener('DOMContentLoaded', ()=>{
  const toggle = document.getElementById('touchToggle');
  const controls = document.getElementById('mobile-controls');

  if(/Android|iPhone/i.test(navigator.userAgent)){
    toggle.checked = true;
    controls.classList.remove('hidden');
  }

  toggle.addEventListener('change', ()=>{
    controls.classList.toggle('hidden');
  });
});
