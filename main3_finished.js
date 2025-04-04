// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


// get the score counter
const scoreCounter = document.querySelector("p");

// set width and height to match window size
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Initialize ball count
let ballCount = 0;

// create a base class named shape (parent class)
class Shape{
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}

// Ball class which is extended from shape
class Ball extends Shape {
    exists;

    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY);
        this.color = color;
        this.size = size;
        this.exists = true; // Ball exists by default
        ballCount += 1; // increase ball count when created 

        // update the ballcount while displaying
        scoreCounter.textContent = 'Ball count:' + ballCount;
    }

    // draw the ball on the canvas
    draw() {
     ctx.beginPath();
     ctx.fillStyle = this.color;
     ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
     ctx.fill();
    }
    
    // update the ball's position while it is bouncing off the walls
    update() {
        if (this.x + this.size >= width) { // Bounce off right wall
        this.velX = -Math.abs(this.velX);
        }

        if (this.x - this.size <= 0) { // Bounce off left wall
        this.velX = Math.abs(this.velX);
        }

        if (this.y + this.size >= height) { // Bounce off bottom wall
        this.velY = -Math.abs(this.velY);
        }

        if (this.y - this.size <= 0) { // Bounce off top wall
        this.velY = Math.abs(this.velY);
        }

        this.x += this.velX; // Move ball horizontially
        this.y += this.velY; // Move ball vertically
    }

     // Detect collisions with other balls and change color on impact
    collisionDetect() {
        for (const ball of balls) {
            if (!(this === ball) && ball.exists === true) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }

}

// EvilCircle class (player-controlled circle)
class EvilCircle extends Shape {
    constructor(x, y) {
        super(x, y, 20, 20);
        this.color = "white";
        this.size = 10;

        // Listen for keyboard input to move the evil circle
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
              case "a":
                this.x -= this.velX; // Move left
                break;
              case "d":
                this.x += this.velX; // Move right
                break;
              case "w":
                this.y -= this.velY; // Move up 
                break;
              case "s":
                this.y += this.velY; // Move down
                break;
            }    
        });
    }    
  
    // Draw the evil circle (player-controlled object)
    draw() {
     ctx.beginPath();
     ctx.strokeStyle = this.color;
     ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
     ctx.stroke();
    }

    // Keep the evil circle inside the canvas
    checkBounds() {
        if (this.x + this.size >= width) {
        this.x = this.x - this.size;
        }

        if (this.x - this.size <= 0) {
        this.x = this.x + this.size;
        }

        if (this.y + this.size >= height) {
        this.y = this.y - this.size;
        }

        if (this.y - this.size <= 0) {
        this.y = this.y + this.size;
        }

    }

     // Check for collisions with balls and remove them
    collisionDetect() {
        for (const ball of balls) {
            if (ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.exists = false; // Remove the ball
                    ballCount -= 1; // Decrease the ball count

                    // Update the displayed ball count
                    scoreCounter.textContent = 'Ball count:' + ballCount;

                }
            }
        }
    }
}

// Create an array to store balls
const balls = [];

// Generate 25 balls with random properties
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size), // Random x position
    random(0 + size, height - size),// Random y position
    random(-7, 7), // Rondom x velocity
    random(-7, 7), // Rondom y velocity
    randomRGB(), // Rondom color
    size //Ball size
  );

  balls.push(ball);
}

// Create the evil circle (player-controlled)
const circle = new EvilCircle(10, 10);

// Game loop to continuously update and redraw objects
function loop() {

    // Clear the canvas with a semi-transparent black overlay
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  // Draw and update all balls
  for (const ball of balls) {
    if (ball.exists === true) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }}

    // Draw and update the evil circle
    circle.draw();
    circle.checkBounds();
    circle.collisionDetect();
    
    // Request the next animation frame
    requestAnimationFrame(loop);
}

// Start the game loop
loop();