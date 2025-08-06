class Ball {
    constructor(x, y, r, dx, dy, canvas, ctx) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.canvas = canvas;
        this.ctx = ctx;
    }

    updatePosition() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x > this.canvas.width) {
            this.dx = -Math.abs(this.dx);
        }
        else if (this.x < 0) {
            this.dx = Math.abs(this.dx);
        }
        if (this.y > this.canvas.height) {
            this.dy = -Math.abs(this.dy);
        } else if (this.y < 0) {
            this.dy = Math.abs(this.dy);
        }
    }

    drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.stroke();
    }
}

const animationLoop = () => {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    if (play) {
        update();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    drawScreen();
    window.requestAnimationFrame(animationLoop);

}
const toggleAnimation = () => {
    play = !play;
}

const update = () => {
    ball.updatePosition();
}

const drawScreen = () => {
    ball.drawBall();
}

const randomNumber = (n) => {
    return Math.floor(Math.random() * n) + 1;
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

let speed = 8;
let direction = randomNumber(2 * Math.PI);
let dx = speed * Math.cos(direction);
let dy = speed * Math.sin(direction);
let ball = new Ball(randomNumber(canvas.width), randomNumber(canvas.height), 10, dx, dy, canvas, ctx);
let play = true;
let req;

window.onload = () => {
    req = window.requestAnimationFrame(animationLoop);
}