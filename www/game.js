
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 450;

let carX = 179;
let score = 0;
let running = false;
let obstacles = [];
let roadOffset = 0;

function drawCar(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 42, 65);

  ctx.fillStyle = "#111";
  ctx.fillRect(x - 5, y + 10, 7, 17);
  ctx.fillRect(x + 40, y + 10, 7, 17);
  ctx.fillRect(x - 5, y + 42, 7, 17);
  ctx.fillRect(x + 40, y + 42, 7, 17);

  ctx.fillStyle = "#aeeaff";
  ctx.fillRect(x + 7, y + 7, 28, 13);
  ctx.fillStyle = "#ff3333";
  ctx.fillRect(x + 6, y + 53, 8, 5);
  ctx.fillRect(x + 28, y + 53, 8, 5);
}

function drawRoad() {
  ctx.fillStyle = "#287a35";
  ctx.fillRect(0, 0, 400, 450);

  ctx.fillStyle = "#444";
  ctx.fillRect(45, 0, 310, 450);

  ctx.fillStyle = "white";
  ctx.fillRect(53, 0, 5, 450);
  ctx.fillRect(342, 0, 5, 450);

  for (let y = -50; y < 450; y += 90) {
    ctx.fillRect(197, (y + roadOffset) % 500, 6, 45);
  }
}

function draw() {
  drawRoad();
  obstacles.forEach(o => drawCar(o.x, o.y, "#e53935"));
  drawCar(carX, 355, "#ffcc00");

  ctx.fillStyle = "white";
  ctx.font = "bold 20px Arial";
  ctx.fillText("Score: " + score, 12, 28);
}

function endGame() {
  running = false;
  alert("Race Over! Score: " + score);
}

function loop() {
  if (!running) return;

  roadOffset = (roadOffset + 5) % 90;

  if (Math.random() < 0.025) {
    const lanes = [85, 180, 275];
    obstacles.push({
      x: lanes[Math.floor(Math.random() * lanes.length)],
      y: -70
    });
  }

  obstacles.forEach(o => o.y += 5);
  obstacles = obstacles.filter(o => o.y < 460);

  for (const o of obstacles) {
    if (carX < o.x + 42 && carX + 42 > o.x &&
        355 < o.y + 65 && 420 > o.y) {
      endGame();
      return;
    }
  }

  score++;
  draw();
  requestAnimationFrame(loop);
}

document.getElementById("leftBtn").onclick = () => {
  carX = Math.max(65, carX - 30);
  if (!running) draw();
};

document.getElementById("rightBtn").onclick = () => {
  carX = Math.min(293, carX + 30);
  if (!running) draw();
};

document.getElementById("startBtn").onclick = () => {
  if (running) return;
  obstacles = [];
  score = 0;
  carX = 179;
  running = true;
  loop();
};

draw();
