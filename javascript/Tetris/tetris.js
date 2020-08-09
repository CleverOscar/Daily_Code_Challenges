// canvas by getElementById
const canvas = document.getElementById('tetris')

// context object with properties and methods for drawing
const context = canvas.getContext("2d")


// scale pieces
context.scale(20,20)

// tetris matrix , T shape hardcoded in for now
const tetris = [
  [0,0,0],
  [1,1,1],
  [0,1,0],
];

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


function draw() {
  // fillStyle property can be any css color
  context.fillStyle = '#000'
  // fillRect(x,y, width, height)
  context.fillRect(0,0, canvas.width, canvas.height);
  drawTetris(arena, {x: 0, y:0})
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
  tetris: tetris
}

const arena = createTetris(12,20);
console.log(arena);
console.table(arena);

document.addEventListener('keydown', e => {
  if (e.keyCode === 37){
    player.pos.x--;
  } else if (e.keyCode === 39){
    player.pos.x++;
  } else if (e.keyCode === 40){
    playerDrop();
  }
})

update();
