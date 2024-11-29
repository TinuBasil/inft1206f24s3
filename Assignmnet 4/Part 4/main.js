/*
Title  :   Bouncing Balls with Evil Circle
Author :   Tinu basil
Date   :   Nov 28, 2024
Purpose:   Create and animate bouncing balls with a controllable circle
*/

// Canvas Setup
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Helper Functions
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomRGB = () => `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;

// Shape Class
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Ball Class
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  draw() {
    if (!this.exists) return;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
      this.velX *= -1;
    }
    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
      this.velY *= -1;
    }
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(balls) {
    for (const ball of balls) {
      if (this !== ball && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + ball.size) {
          this.color = ball.color = randomRGB();
        }
      }
    }
  }
}

// Evil Circle Class
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = "white";
    this.size = 10;
    window.addEventListener("keydown", this.control.bind(this));
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  control(e) {
    switch (e.key) {
      case "a":
        this.x -= this.velX;
        break;
      case "d":
        this.x += this.velX;
        break;
      case "w":
        this.y -= this.velY;
        break;
      case "s":
        this.y += this.velY;
        break;
    }
  }

  checkBounds() {
    if ((this.x + this.size) >= width) this.x = width - this.size;
    if ((this.x - this.size) <= 0) this.x = this.size;
    if ((this.y + this.size) >= height) this.y = height - this.size;
    if ((this.y - this.size) <= 0) this.y = this.size;
  }

  collisionDetect(balls) {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + ball.size) {
          ball.exists = false;
          updateBallCount();
        }
      }
    }
  }
}

// Initialize Balls
const balls = [];
let ballCount = 0;

function initBalls(numBalls) {
  for (let i = 0; i < numBalls; i++) {
    const size = random(10, 20);
    const ball = new Ball(
      random(size, width - size),
      random(size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomRGB(),
      size
    );
    balls.push(ball);
    ballCount++;
  }
}

function updateBallCount() {
  ballCount--;
  document.getElementById("ballCount").textContent = ballCount;
}

document.getElementById("ballCount").textContent = ballCount;

// Create and animate Evil Circle
const evilCircle = new EvilCircle(random(0, width), random(0, height));

// Animation Loop
function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect(balls);
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect(balls);

  requestAnimationFrame(loop);
}

// Start animation
initBalls(25);
loop();
