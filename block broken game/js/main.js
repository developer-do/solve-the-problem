let canvas          = document.querySelector("#canvas");
let context         = canvas.getContext("2d");

let barWidth        = 100;
let barHeight       = 20;
let barStartX       = (canvas.width / 2) - (barWidth / 2);
let barStartY       = canvas.height - barHeight;
let barMoveRight    = false;
let barMoveLeft     = false;

let ballDia         = 10;
let ballStartX      = canvas.width / 2;
let ballStartY      = canvas.height - (ballDia + barHeight);
let ballMoveX       = 2;   // x 축으로 이동하는 거리
let ballMoveY       = -2;  // y 축으로 이동하는 거리
let ballAbs         = Math.abs(ballMoveX) + Math.abs(ballMoveY);
let ballTouchHeight = canvas.height - (barHeight + ballDia);

let blockRowCnt     = 10;
let blockColCnt     = 6;
let blockWidth      = (canvas.width / blockRowCnt);
let blockHeight     = 20;
let blockArr        = [];

for (let i = 0; i < blockColCnt; i++) {
  blockArr[i] = [];
  for (let j = 0; j < blockRowCnt; j++) {
    blockArr[i][j] = {
      state: 1,
      x: (j * blockWidth) + 1,
      y: (i * (blockHeight + 1)) + 55
    }
  }
}


document.addEventListener("keydown", function (e) {
  if (e.key == "ArrowLeft" || e.keyCode == 37) {
    barMoveLeft = true;
  } else if (e.key == "ArrowRight" || e.keyCode == 39) {
    barMoveRight = true;
  }
});

document.addEventListener("keyup", function (e) {
  if (e.key == "ArrowLeft" || e.key == 37) {
    barMoveLeft = false;
  } else if (e.key == "ArrowRight" || e.keyCode == 39) {
    barMoveRight = false;
  }
});


function blockCreate() {
  for (let i = 0; i < blockArr.length; i++) {
    for (let j = 0; j < blockArr[i].length; j++) {
      if (blockArr[i][j].state == 1) {
        context.beginPath();
        context.fillStyle = "coral";
        context.fillRect(blockArr[i][j].x, blockArr[i][j].y, blockWidth - 1, blockHeight);
        context.fill();
        context.closePath();
      }
    }
  }
}


function barCreate() {
  context.beginPath();
  context.fillStyle = "#3498db";
  context.fillRect(barStartX, barStartY, barWidth, barHeight);
}

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
  barCreate();
  blockCreate();
  ballStartX += ballMoveX;
  ballStartY += ballMoveY;

  // 볼 벽 튕기기 
  if (ballStartX >= canvas.width - ballDia || ballStartX <= ballDia) {
    ballMoveX = -(ballMoveX);
  }
  if (ballStartY <= ballDia) {
    ballMoveY = -(ballMoveY);
  } else if (ballStartY >= ballTouchHeight) {
    if (ballStartX <= barStartX + barWidth && ballStartX >= barStartX) {
      ballMoveY = Math.floor(Math.random() * 0.2) + 2;
      ballMoveX < 0 ? ballMoveX = -(ballAbs - ballMoveY) : ballMoveX = (ballAbs - ballMoveY);
      ballMoveY = -(ballMoveY);
    } else {
      // location.reload();
      // alert("game over");
    }
  }

  // bar에 조건 주기
  if (barStartX < 0) {
    barStartX = 0;
    barMoveLeft = false;
  } else if (barStartX > 700) {
    barSatrtX = 700;
    barMoveRight = false;
  }

  // bar 옮기기
  if (barMoveLeft && barStartX > 0) barStartX -= 3;
  else if (barMoveRight && barStartX< 700) barStartX += 3;
}

setInterval(draw, 5);