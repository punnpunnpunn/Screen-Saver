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

    detectCollision(ball) {
        return (Math.hypot(this.x-ball.x, this.y-ball.y) < this.r + ball.r)
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

    checkCollision() {
        for (let b1 in this.ballArr) {
            b1 = Number(b1)
            for (let b2 in this.ballArr.slice(Number(b1) + 1)) {
                b2 = Number(b2)
                if (this.ballArr[b2 + Number(b1) + 1] && this.ballArr[b1].detectCollision(this.ballArr[b2 + b1 + 1])) {
                    this.resolveCollision(this.ballArr[b1], this.ballArr[b2 + b1 + 1])
                    console.log("collision")
                }
            }
        }
    }

    resolveCollision(b1, b2) {
        let theta1, theta2, phi, v1, v2;
        theta1 = findAngle(b1.dx, b1.dy);
        theta2 = findAngle(b2.dx, b2.dy);
        phi = findAngle(b1.x - b2.x, b1.y - b2.y);
        v1 = Math.hypot(b1.dx, b1.dy)
        v2 = Math.hypot(b2.dx, b2.dy)
        b1.dx = v2*Math.cos(theta2 - phi) * Math.cos(phi) + v1 * Math.sin(theta1 - phi) * Math.cos(phi + Math.PI/2)
        b1.dy = v2*Math.cos(theta2 - phi) * Math.sin(phi) + v1 * Math.sin(theta1 - phi) * Math.sin(phi + Math.PI/2)
        b2.dx = v1*Math.cos(theta1 - phi) * Math.cos(phi) + v2 * Math.sin(theta2 - phi) * Math.cos(phi + Math.PI/2)
        b2.dy = v1*Math.cos(theta1 - phi) * Math.sin(phi) + v2 * Math.sin(theta2 - phi) * Math.sin(phi + Math.PI/2)
        
        function findAngle(x, y) {
            let theta
            if (x) {
                theta = Math.atan(y / x);
                if (x < 0) {
                    theta = Math.PI - theta;
                }
            }
            else {
                if (y > 0) {
                    theta = Math.PI / 2;
                }
                else if (y < 0) {
                    theta = -Math.PI / 2;
                }
            }
            return theta;
        }
    }
}

const animationLoop = () => {
    screen.updateCanvas();
    if (play) {
        screen.updateBalls();
        screen.checkCollision();
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