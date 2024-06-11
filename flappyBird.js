document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('flappyBirdCanvas');
    const context = canvas.getContext('2d');
    const startBtn = document.getElementById('flappyBirdStartBtn');

    let birdY = 200;
    let birdVelocity = 0;
    const gravity = 0.25;
    const lift = -5;
    let isGameOver = false;

    function drawBird() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'yellow';
        context.fillRect(150, birdY, 20, 20);
    }

    function updateBird() {
        birdVelocity += gravity;
        birdY += birdVelocity;
        if (birdY + 20 > canvas.height || birdY < 0) {
            isGameOver = true;
            alert('Game Over');
        }
    }

    function gameLoop() {
        if (!isGameOver) {
            updateBird();
            drawBird();
            requestAnimationFrame(gameLoop);
        }
    }

    canvas.addEventListener('click', () => {
        birdVelocity = lift;
    });

    startBtn.addEventListener('click', () => {
        birdY = 200;
        birdVelocity = 0;
        isGameOver = false;
        gameLoop();
    });
});
