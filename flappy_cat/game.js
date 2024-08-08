const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Variables del juego
let catrinaY = canvas.height / 2;
let catrinaX = 50;
let gravity = 0.6;
let lift = -15;
let velocity = 0;
let isGameOver = false;
let score = 0;

let obstacles = [];
let obstacleWidth = 50;
let obstacleGap = 150;
let obstacleSpeed = 2;


const catrinaImg = new Image();
catrinaImg.src = 'images/cat.jpg';

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        velocity = lift;
    }
});

// Generar obstáculos
function generateObstacles() {
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - 200) {
        let obstacleHeight = Math.floor(Math.random() * (canvas.height - obstacleGap));
        obstacles.push({
            x: canvas.width,
            y: obstacleHeight
        });
    }
}

// Dibujar obstáculos
function drawObstacles() {
    obstacles.forEach(obstacle => {
        context.fillStyle = 'green';
        context.fillRect(obstacle.x, 0, obstacleWidth, obstacle.y);
        context.fillRect(obstacle.x, obstacle.y + obstacleGap, obstacleWidth, canvas.height - obstacle.y - obstacleGap);
    });
}

// Mover obstáculos
function moveObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.x -= obstacleSpeed;
    });

    // Eliminar obstáculos que han salido de la pantalla
    if (obstacles.length > 0 && obstacles[0].x < -obstacleWidth) {
        obstacles.shift();
        score++;
    }
}

// Comprobar colisiones
function checkCollisions() {
    if (catrinaY + 30 > canvas.height || catrinaY < 0) {
        isGameOver = true;
    }

    obstacles.forEach(obstacle => {
        if (catrinaX + 30 > obstacle.x && catrinaX < obstacle.x + obstacleWidth) {
            if (catrinaY < obstacle.y || catrinaY + 30 > obstacle.y + obstacleGap) {
                isGameOver = true;
            }
        }
    });
}

// Dibujar el juego
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la catrina
    context.drawImage(catrinaImg, catrinaX, catrinaY, 30, 30);

    // Dibujar obstáculos
    drawObstacles();

    // Dibujar puntuación
    context.fillStyle = 'black';
    context.font = '20px Arial';
    context.fillText(`Puntuación: ${score}`, 10, 20);
}

// Actualizar el juego
function update() {
    if (!isGameOver) {
        velocity += gravity;
        catrinaY += velocity;

        generateObstacles();
        moveObstacles();
        checkCollisions();
        draw();
    } else {
        context.fillStyle = 'red';
        context.font = '30px Arial';
        context.fillText('A casa', canvas.width / 2 - 70, canvas.height / 2);
    }

    requestAnimationFrame(update);
}

update();
