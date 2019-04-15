let canvas        = document.querySelector("#canvas");
let context       = canvas.getContext("2d");

let barWidth    = 100;
let barHeight   = 20;

let ballDia     = 10;
let ballStartX  = canvas.width / 2;
let ballStartY  = canvas.height - (ballDia + barHeight);
let ballMoveX   = 5;   // x 축으로 이동하는 거리
let ballMoveY   = -5;  // y 축으로 이동하는 거리
let ballSpeep   = 5;
let ballAbs     = Math.abs(ballMoveX) + Math.abs(ballMoveY);

function ballCreate() {
  context.beginPath();
  context.arc(ballStartX, ballStartY, ballDia, 0, Math.PI * 2);
  context.fillStyle = "red";
  context.fill();
  context.closePath();
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  ballCreate();
  ballStartX += ballMoveX;
  ballStartY += ballMoveY;

  if (ballStartX >= canvas.width - ballDia) {
    ballMoveX = -(ballMoveX);
  }
  if (ballStartY >= canvas.height - ballDia) {
    ballMoveY = Math.floor(Math.random() * 5) + 1;
    if (ballMoveX < 0) ballMoveX = -(ballAbs - ballMoveY);
    else if (ballMoveX >= 0) ballMoveX = (ballAbs - ballMoveY);
    ballMoveY = -(ballMoveY);
  }
  if (ballStartX <= ballDia) {
    ballMoveX = -(ballMoveX);
  }
  if (ballStartY <= ballDia) {
    ballMoveY = -(ballMoveY);
  }
}

setInterval(draw, 10);

