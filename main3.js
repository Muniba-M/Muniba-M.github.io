// Setup canvas
const canvas = document.querySelector('canvas');
// CanvasRenderContext2D
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


// Function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}


// Function to generate random color
function randomRGB() {
  return `rgb(${ random(0, 255) },${ random(0, 255) },${ random(0, 255) })`;
}


// Object to represent a ball
class Ball {

    // Class properties
    x;
    y;
    velX;
    velY;
    color;
    size;

    // Constructors
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    // Drawing the ball
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    // Moving the ball
    update() {
        if ((this.x + this.size) >= width) {
          this.velX = -(this.velX);
        }
      
        if ((this.x - this.size) <= 0) {
          this.velX = -(this.velX);
        }
      
        if ((this.y + this.size) >= height) {
          this.velY = -(this.velY);
        }
      
        if ((this.y - this.size) <= 0) {
          this.velY = -(this.velY);
        }
      
        this.x += this.velX;
        this.y += this.velY;
    }

    //Checks for collisions between balls and changes their colors if they collide
    collisionDetect() {
        for (const ball of balls) {

            // Ensure a ball doesn't check collision with itself
            if (this !== ball) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // If the distance is less than the sum of the two ball sizes, a collision occurs
                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }      
}

// Array to store all balls
const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(

    // ball position always drawn at least one ball width away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );

  // Add the new ball to the array
  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  // Call loop again to create animation (frame-by-frame update)
  requestAnimationFrame(loop);
}

// Start the animation
loop();
