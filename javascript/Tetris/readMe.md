# Tetris Javascript Docs

#### Basic First Steps

create the index.html file needed to render out our canvas element and have our tetris.js file.

#### Variables

> arena, holds createMatrix function (see the functions section for more info)

> canvas, targets the canvas element from the index.html file

> context, getContext() method allows us to draw 2d objects onto our canvas

> matrix, basic matrix output of T shape tetris

> player, has two properties position (pos) & matrix (matrix array)

> lastTime, holds zero for our timer, allowing us to determine the drop speed

> dropCounter, holds zero to keep track of our tetris dropping every second

> dropInterval, allowing us to count every second

##### Functions

`
function collide(arena, player) {
  const [m, o] = [player.matrix]

}
`
