let mobileDirection = null;

function setDirection(dir){
  mobileDirection = dir;
  movePlayer(dir);
}

document.addEventListener('DOMContentLoaded', ()=>{
  const toggle = document.getElementById('touchToggle');
  const controls = document.getElementById('mobile-controls');

  if(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)){
    toggle.checked = true;
    controls.classList.remove('hidden');
  }

  toggle.addEventListener('change', ()=>{
    if(toggle.checked){
      controls.classList.remove('hidden');
    } else {
      controls.classList.add('hidden');
    }
  });
});
