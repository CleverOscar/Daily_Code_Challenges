// canvas by getElementById
const canvas = document.getElementById('tetris')

// context object with properties and methods for drawing
const context = canvas.getContext("2d")


// scale pieces
context.scale(20,20)

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
  }
}

function rotate(matrix, dir) {
  for (let y = 0; y < matrix.length; ++y){
    for (let x = 0; x < y; ++x) {
      [
        matrix[x][y],
        matrix[y][x],
      ] = [
        matrix[y][x],
        matrix[x][y],
      ];
    }
  }
  if (dir > 0) {
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse();
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
        context.fillStyle = 'red';
        context.fillRect(x + offset.x,
                         y + offset.y,
                         1,
                         1)
      }
    });
  });
}

let lastTime = 0;
let dropCounter = 0;
let dropInterval = 1000;

function playerDrop(){
  player.pos.y++;
  if (collide(arena, player)){
      player.pos.y--;
      merge(arena,player);
      player.pos.y = 0;
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

const player = {
  pos: {x: 5, y: 5},
  tetris: createPiece('T')
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

update();
