console.log("Welcome to Snekk!");

window.onload = () => {
  canv = document.getElementById("screen");
  ctx = canv.getContext("2d");

  document.addEventListener("keydown", keyPress);
  setInterval(game, 1000 / 10);
};

xVel = 0;
yVel = 0;

xPos = yPos = 10;
gridSize = 20;
tileCount = 20;

foodX = foodY = 15;

trail = [];
tail = 5;

const game = () => {
  xPos += xVel;
  yPos += yVel;

  if (xPos < 0) {
    xPos = tileCount - 1;
  }
  if (xPos > tileCount - 1) {
    xPos = 0;
  }
  if (yPos < 0) {
    yPos = tileCount - 1;
  }
  if (yPos > tileCount - 1) {
    yPos = 0;
  }

  ctx.fillStyle = "#222831";
  ctx.fillRect(0, 0, canv.width, canv.height);

  ctx.fillStyle = "#fa4659";
  ctx.fillRect(
    foodX * gridSize + 1,
    foodY * gridSize + 1,
    gridSize - 2,
    gridSize - 2
  );

  ctx.fillStyle = "#2eb872";
  for (var i = 0; i < trail.length; i++) {
    ctx.fillRect(
      trail[i].x * gridSize + 1,
      trail[i].y * gridSize + 1,
      gridSize - 2,
      gridSize - 2
    );

    if (trail[i].x === xPos && trail[i].y === yPos) {
      tail = 5;
    }
  }

  trail.push({ x: xPos, y: yPos });
  while (trail.length > tail) {
    trail.shift();
  }
  if (foodX === xPos && foodY === yPos) {
    tail++;

    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
  }
};

const keyPress = (event) => {
  switch (event.keyCode) {
    case 37:
      if (xVel == 0) {
        xVel = -1;
        yVel = 0;
      }
      break;
    case 38:
      if (yVel == 0) {
        xVel = 0;
        yVel = -1;
      }
      break;
    case 39:
      if (xVel == 0) {
        xVel = 1;
        yVel = 0;
      }
      break;
    case 40:
      if (yVel == 0) {
        xVel = 0;
        yVel = 1;
      }
      break;
  }
};
