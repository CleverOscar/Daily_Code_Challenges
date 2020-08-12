// canvas by getElementById
const canvas = document.getElementById('tetris')

// context object with properties and methods for drawing
const context = canvas.getContext("2d")


// scale pieces
context.scale(20,20)


const colors = [
  null,
  '#FB55FF',
  '#D841FA',
  '#8A43E3',
  '#5B5EF5',
  '#0098EE',
  '#0DC6EE',
  '#D4F2F9'
]
// tetris matrix , T shape hardcoded in for now

function collide(arena, player) {
  const [m, o] = [player.tetris, player.pos];

  for (let y = 0; y < m.length; ++y){
    for (let x = 0; x < m[y].length; ++x){
      if(m[y][x] !== 0 &&
        (arena[y + o.y] &&
          arena[y + o.y][x + o.x]) !== 0){
          return true
        }
    }
  }
  return false;
}

function createTetris(w, h){
  const matrix = [];

  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix
}

function createPiece(type) {
  if (type === 'T') {
    return [
      [0,0,0],
      [1,1,1],
      [0,1,0],
    ];
  } else if (type === 'O') {
    return [
      [2,2],
      [2,2],
    ];
  } else if (type === 'L') {
    return [
      [0,3,0],
      [0,3,0],
      [0,3,3],
    ]
  } else if (type === 'J') {
    return [
      [0,4,0],
      [0,4,0],
      [4,4,0],
    ]
  } else if (type === 'I'){
    return [
      [0,5,0,0],
      [0,5,0,0],
      [0,5,0,0],
    ]
  } else if (type === 'S'){
    return [
      [0,6,6],
      [6,6,0],
      [0,0,0],
    ]
  } else if (type === 'Z'){
    return [
      [7,7,0],
      [0,7,7],
      [0,0,0],
    ]
  }
}

function rotate(tetris, dir) {
  for (let y = 0; y < tetris.length; ++y){
    for (let x = 0; x < y; ++x) {
      [
        tetris[x][y],
        tetris[y][x],
      ] = [
        tetris[y][x],
        tetris[x][y],
      ];
    }
  }
  if (dir > 0) {
    tetris.forEach(row => row.reverse());
  } else {
    tetris.reverse();
  }
}

function playerRotate(dir) {
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.tetris, dir);
  while (collide(arena, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.tetris[0].length) {
      rotate(player.tetris -dir);
      player.pos.x = pos;
      return;
    }
  }
}

function draw() {
  // fillStyle property can be any css color
  context.fillStyle = '#000'
  // fillRect(x,y, width, height)
  context.fillRect(0,0, canvas.width, canvas.height);
  drawTetris(arena, {x: 0, y:0 })
  drawTetris(player.tetris, player.pos);
}

function drawTetris(tetris, offset) {
  tetris.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x,
                         y + offset.y,
                         1,
                         1)
      }
    });
  });
}

function sweep(){
  let rowCount = 1;

  outer: for(let y = arena.length - 1; y > 0; --y){
      for (let x = 0; x < arena[y].length; ++x){
        if(arena[y][x] === 0){
          continue outer;
        }
      }
      const row = arena.splice(y,1)[0].fill(0);
      arena.unshift(row);
      ++y;

      player.score += rowCount * 10;
      rowCount *= 2
    }
}

let lastTime = 0;
let dropCounter = 0;
let dropInterval = 1000;

function playerDrop(){
  player.pos.y++;
  if (collide(arena, player)){
      player.pos.y--;
      merge(arena,player);
      playerReset();
      sweep();
      updateScore();
  }
  dropCounter = 0;
}

function playerMove(dir) {
  player.pos.x += dir;
  if(collide(arena,player)) {
    player.pos.x -= dir;
  }
}

function update(time = 0){
  const deltaTime = time - lastTime;
  lastTime = time

  dropCounter += deltaTime;

  if (dropCounter > dropInterval) {
    playerDrop();
  }
  draw();
  requestAnimationFrame(update)
}

function merge(arena, player) {
  player.tetris.forEach((row, y) =>{
    row.forEach((value, x) =>{
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    })
  })
}

function playerReset() {
  const pieces = 'ILJOTSZ';
  player.tetris = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.pos.y = 0;
  player.pos.x = (arena[0].length /2 | 0) - (player.tetris[0].length / 2 | 0);

  if(collide(arena,player)) {
    arena.forEach(row => row.fill(0));
    player.score = 0;
    updateScore();
  }
}

const player = {
  pos: {x: 5, y: 5},
  tetris: null,
  score: 0
}

const arena = createTetris(12,20);
console.log(arena);
console.table(arena);

document.addEventListener('keydown', e => {
  if (e.keyCode === 37){
    playerMove(-1)
  } else if (e.keyCode === 39){
    playerMove(+1)
  } else if (e.keyCode === 40){
    playerDrop();
  } else if (e.keyCode === 82) {
    playerRotate(-1)
  } else if (e.keyCode === 82) {
    playerRotate(-1)
  } else if (e.keyCode === 84) {
    playerRotate(1)
  }
})

function updateScore(){
  document.getElementById('score').innerText = player.score;
}

playerReset();
update();
updateScore();
