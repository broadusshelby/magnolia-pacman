let currentLevel = 0;
let score = 0;
let board = [];
let player = {x:1,y:1};
let bees = [];

function loadLevel(){
  const levelData = LEVELS[currentLevel];
  board = levelData.rows.map(r=>r.split(''));
  bees = [];

  for(let i=0;i<levelData.bees;i++){
    bees.push({x:13-i,y:13});
  }

  document.getElementById('game').style.gridTemplateColumns =
    `repeat(${board[0].length},34px)`;

  drawGame();
  showMessage('Level ' + (currentLevel+1));
}

function drawGame(){
  const game = document.getElementById('game');
  game.innerHTML = '';

  for(let y=0;y<board.length;y++){
    for(let x=0;x<board[y].length;x++){
      const cell = document.createElement('div');
      cell.className = 'cell ' + (board[y][x]==='#' ? 'wall':'path');

      if(player.x===x && player.y===y){
        cell.innerHTML='🌸';
      } else if(bees.some(b=>b.x===x && b.y===y)){
        cell.innerHTML='🐝';
      } else if(board[y][x]==='.'){
        cell.innerHTML='✿';
      }

      game.appendChild(cell);
    }
  }

  document.getElementById('score').innerText = 'Score: ' + score;
  document.getElementById('level').innerText = 'Level: ' + (currentLevel+1);
}

function movePlayer(dir){
  let nx = player.x;
  let ny = player.y;

  if(dir==='up') ny--;
  if(dir==='down') ny++;
  if(dir==='left') nx--;
  if(dir==='right') nx++;

  if(board[ny][nx] !== '#'){
    player.x = nx;
    player.y = ny;

    if(board[ny][nx] === '.'){
      board[ny][nx] = ' ';
      score += 10;
    }

    moveBees();
    checkCollision();
    checkWin();
    drawGame();
  }
}

function moveBees(){
  bees.forEach(bee=>{
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    let valid = dirs.filter(d=> board[bee.y+d[1]][bee.x+d[0]] !== '#');
    let pick = valid[Math.floor(Math.random()*valid.length)];
    bee.x += pick[0];
    bee.y += pick[1];
  });
}

function checkCollision(){
  if(bees.some(b=>b.x===player.x && b.y===player.y)){
    showMessage('The bees found your blossom!');
    setTimeout(restartGame,1500);
  }
}

function checkWin(){
  let flowersLeft = 0;
  board.forEach(r=>r.forEach(c=>{
    if(c==='.') flowersLeft++;
  }));

  if(flowersLeft===0){
    currentLevel++;

    if(currentLevel >= LEVELS.length){
      showMessage('You completed every blooming garden!');
      setTimeout(restartGame,2000);
    } else {
      player = {x:1,y:1};
      setTimeout(loadLevel,1200);
    }
  }
}

function showMessage(text){
  const overlay = document.getElementById('message-overlay');
  overlay.innerText = text;
  overlay.classList.remove('hidden');
  setTimeout(()=>overlay.classList.add('hidden'),1000);
}

document.addEventListener('keydown',e=>{
  if(e.key==='ArrowUp') movePlayer('up');
  if(e.key==='ArrowDown') movePlayer('down');
  if(e.key==='ArrowLeft') movePlayer('left');
  if(e.key==='ArrowRight') movePlayer('right');
});

function restartGame(){
  currentLevel = 0;
  score = 0;
  player = {x:1,y:1};
  loadLevel();
}

loadLevel();
