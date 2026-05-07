let currentLevel = 0;
let score = 0;
let board = [];
let player = {x:1,y:1};
let bees = [];

function loadLevel(){
  const level = LEVELS[currentLevel];
  board = level.rows.map(r=>r.split(''));
  bees = [];

  for(let i=0;i<level.bees;i++){
    bees.push({x:13-i,y:13});
  }

  const game = document.getElementById('game');
  game.style.opacity = 0;

  setTimeout(()=>{
    game.style.gridTemplateColumns = `repeat(${board[0].length},34px)`;
    drawGame();
    game.style.opacity = 1;
  },200);
}

function drawGame(){
  const game = document.getElementById('game');
  game.innerHTML = '';

  for(let y=0;y<board.length;y++){
    for(let x=0;x<board[y].length;x++){
      const cell = document.createElement('div');
      cell.className = 'cell ' + (board[y][x]==='#' ? 'wall':'path');

      if(player.x===x && player.y===y){
        cell.innerHTML='<div class=\"player\"></div>';
      } else if(bees.some(b=>b.x===x && b.y===y)){
        cell.innerHTML='<div class=\"bee\"></div>';
      } else if(board[y][x]==='.'){
        cell.innerHTML='<div class=\"flower\"></div>';
      }

      game.appendChild(cell);
    }
  }

  document.getElementById('score').innerText = 'Score: '+score;
  document.getElementById('level').innerText = 'Level: '+(currentLevel+1);
}

function movePlayer(dir){
  let nx=player.x, ny=player.y;
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
  bees.forEach(b=>{
    const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
    let valid=dirs.filter(d=>board[b.y+d[1]][b.x+d[0]]!=='#');
    let pick=valid[Math.floor(Math.random()*valid.length)];
    b.x+=pick[0];
    b.y+=pick[1];
  });
}

function checkCollision(){
  if(bees.some(b=>b.x===player.x && b.y===player.y)){
    alert('Game Over');
    restartGame();
  }
}

function checkWin(){
  if(!board.flat().includes('.')){
    currentLevel++;
    if(currentLevel>=LEVELS.length){
      alert('You Win!');
      restartGame();
    } else {
      player={x:1,y:1};
      loadLevel();
    }
  }
}

document.addEventListener('keydown',e=>{
  if(e.key==='ArrowUp') movePlayer('up');
  if(e.key==='ArrowDown') movePlayer('down');
  if(e.key==='ArrowLeft') movePlayer('left');
  if(e.key==='ArrowRight') movePlayer('right');
});

function restartGame(){
  currentLevel=0;
  score=0;
  player={x:1,y:1};
  loadLevel();
}

loadLevel();
