document.addEventListener('DOMContentLoaded', () => {
    const dinoGameContainer = document.getElementById('dinoGame');
    const startBtn = document.getElementById('dinoGameStartBtn');

    dinoGameContainer.innerHTML = `
        <div id="dino" style="position:relative; width:20px; height:20px; background:black; top:180px;"></div>
        <div id="ground" style="position:relative; width:100%; height:20px; background:green; top:200px;"></div>
    `;

    const dino = document.getElementById('dino');
    let isJumping = false;
    let dinoY = 180;
    const gravity = 0.9;
    const jumpHeight = 100;
    let velocity = 0;
    let isGameOver = false;

    function handleJump() {
        if (!isJumping) {
            isJumping = true;
            velocity = -jumpHeight;
        }
    }

    function updateDino() {
        if (isJumping) {
            velocity += gravity;
            dinoY += velocity;
            if (dinoY >= 180) {
                dinoY = 180;
                isJumping = false;
            }
            dino.style.top = dinoY + 'px';
        }
    }

    function gameLoop() {
        if (!isGameOver) {
            updateDino();
            requestAnimationFrame(gameLoop);
        }
    }

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            handleJump();
        }
    });

    startBtn.addEventListener('click', () => {
        dinoY = 180;
        velocity = 0;
        isGameOver = false;
        gameLoop();
    });
});
