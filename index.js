class Ball {
    constructor(x, y, r, dx, dy) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.red = randomNumber(255);
        this.green = randomNumber(255);
        this.blue = randomNumber(255);
    }

    updatePosition(canvas) {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x > canvas.width) {
            this.dx = -Math.abs(this.dx);
        }
        else if (this.x < 0) {
            this.dx = Math.abs(this.dx);
        }
        if (this.y > canvas.height) {
            this.dy = -Math.abs(this.dy);
        } else if (this.y < 0) {
            this.dy = Math.abs(this.dy);
        }
    }

    drawBall(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgb(${this.red}, ${this.green}, ${this.blue})`;
        ctx.fill();
        ctx.stroke();
    }
}

class Screen {
    constructor(canvas, ballArr) {
        this.canvas = canvas;
        this.ballArr = ballArr;
        this.ctx = canvas.getContext('2d');
    }

    updateCanvas() {
        this.canvas.width = window.innerWidth * 0.8;
        this.canvas.height = window.innerHeight * 0.8;
    }

    updateBalls() {
        this.ballArr.forEach(b => b.updatePosition(this.canvas));
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.ballArr.forEach(b => b.drawBall(this.ctx));
    }

    addBall() {
        let speed = 8;
        let direction = randomNumber(2 * Math.PI);
        let dx = speed * Math.cos(direction);
        let dy = speed * Math.sin(direction);
        this.ballArr.push(new Ball(randomNumber(canvas.width), randomNumber(canvas.height), 10, dx, dy))
    }
}

const animationLoop = () => {
    screen.updateCanvas();
    if (play) {
        screen.updateBalls();
        screen.clear();
    }
    screen.draw();
    window.requestAnimationFrame(animationLoop);
}

const toggleAnimation = () => {
    play = !play;
}

const randomNumber = (n) => {
    return Math.floor(Math.random() * n) + 1;
}

const setUp = () => {
    screen.addBall()
    play = true;
}

let play;
let screen = new Screen(document.getElementById('canvas'), []);

window.onload = () => {
    setUp();
    window.requestAnimationFrame(animationLoop);
}