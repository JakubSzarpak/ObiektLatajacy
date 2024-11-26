const gameContainer = document.getElementById('game-container');
const playerPaddle = document.getElementById('player-paddle');
const aiPaddle = document.getElementById('ai-paddle');
const ball = document.getElementById('ball');
const playerScoreEl = document.getElementById('player-score');
const aiScoreEl = document.getElementById('ai-score');

// Initial positions and dimensions
let playerPaddleY = window.innerHeight / 2 - 100;
let aiPaddleY = window.innerHeight / 2 - 100;
let ballX = window.innerWidth / 2 - 20;
let ballY = window.innerHeight / 2 - 20;

// Speeds
let ballSpeedX = 8;
let ballSpeedY = 4;
let aiSpeed = 6;

// Scores
let playerScore = 0;
let aiScore = 0;

// Bounce count to track when to increase speed
let bounceCount = 0;

// Paddle movement
let playerSpeed = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') playerSpeed = -10;
    if (e.key === 'ArrowDown') playerSpeed = 10;
});
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') playerSpeed = 0;
});

// Update the game state
function updateGame() {
    // Player Paddle
    playerPaddleY += playerSpeed;
    if (playerPaddleY < 0) playerPaddleY = 0;
    if (playerPaddleY > window.innerHeight - 200) playerPaddleY = window.innerHeight - 200;
    playerPaddle.style.top = `${playerPaddleY}px`;

    // AI Paddle
    if (ballY > aiPaddleY + 100) aiPaddleY += aiSpeed;
    if (ballY < aiPaddleY + 100) aiPaddleY -= aiSpeed;
    if (aiPaddleY < 0) aiPaddleY = 0;
    if (aiPaddleY > window.innerHeight - 200) aiPaddleY = window.innerHeight - 200;
    aiPaddle.style.top = `${aiPaddleY}px`;

    // Ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY <= 0 || ballY >= window.innerHeight - 40) {
        ballSpeedY *= -1;
    }

    // Ball collision with player paddle
    if (
        ballX <= 60 &&
        ballY + 40 >= playerPaddleY &&
        ballY <= playerPaddleY + 200
    ) {
        ballSpeedX *= -1;
        handleBounce();
    }

    // Ball collision with AI paddle
    if (
        ballX >= window.innerWidth - 100 &&
        ballY + 40 >= aiPaddleY &&
        ballY <= aiPaddleY + 200
    ) {
        ballSpeedX *= -1;
        handleBounce();
    }

    // Check if player or AI scores
    if (ballX <= 0) {
        aiScore++;
        resetBall();
    }

    if (ballX >= window.innerWidth - 40) {
        playerScore++;
        resetBall();
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    // Update scores
    playerScoreEl.textContent = playerScore;
    aiScoreEl.textContent = aiScore;

    // Game loop
    requestAnimationFrame(updateGame);
}

// Reset ball to center
function resetBall() {
    ballX = window.innerWidth / 2 - 20;
    ballY = window.innerHeight / 2 - 20;
    ballSpeedX = 8 * (Math.random() > 0.5 ? 1 : -1); // Reset speed
    ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1); // Reset speed
    bounceCount = 0; // Reset bounce count
}

// Increase ball speed every 2 bounces
function handleBounce() {
    bounceCount++;
    if (bounceCount % 2 === 0) {
        ballSpeedX *= 1.1; // Increase horizontal speed
        ballSpeedY *= 1.1; // Increase vertical speed
    }
}

// Resize paddles and ball on window resize
window.addEventListener('resize', () => {
    playerPaddleY = window.innerHeight / 2 - 100;
    aiPaddleY = window.innerHeight / 2 - 100;
    resetBall();
});

// Start the game
resetBall();
updateGame();
