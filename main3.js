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

    x;
    y;
    velX;
    velY;
    color;
    size;

    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    
}
