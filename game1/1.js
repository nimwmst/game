// متغیرها
const gameArea = document.getElementById('game-area');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');

let score = 0;
let playerPosition = gameArea.offsetWidth / 2;
let drops = [];
let obstacles = [];
let gameInterval;

// حرکت شخصیت
function movePlayer(direction) {
    if (direction === 'left' && playerPosition > 0) {
        playerPosition -= 20;
    } else if (direction === 'right' && playerPosition < gameArea.offsetWidth - 60) {
        playerPosition += 20;
    }
    player.style.left = playerPosition + 'px';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        movePlayer('left');
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        movePlayer('right');
    }
});

// دکمه‌های مجازی برای گوشی
document.getElementById('left-button').addEventListener('touchstart', () => {
    movePlayer('left');
});

document.getElementById('right-button').addEventListener('touchstart', () => {
    movePlayer('right');
});

// ایجاد قطره‌ها
function createDrop() {
    const drop = document.createElement('div');
    drop.classList.add('drop');
    drop.style.left = Math.random() * (gameArea.offsetWidth - 30) + 'px';
    drop.style.top = '-30px';
    gameArea.appendChild(drop);
    drops.push(drop);
}

// ایجاد موانع
function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = Math.random() * (gameArea.offsetWidth - 80) + 'px';
    obstacle.style.top = '-80px';
    gameArea.appendChild(obstacle);
    obstacles.push(obstacle);
}

// حرکت قطره‌ها و موانع
function moveObjects() {
    drops.forEach((drop, index) => {
        let top = parseInt(drop.style.top);
        if (top > gameArea.offsetHeight) {
            drop.remove();
            drops.splice(index, 1);
        } else {
            drop.style.top = top + 5 + 'px';

            // بررسی برخورد با شخصیت
            if (
                playerPosition < parseInt(drop.style.left) + 30 &&
                playerPosition + 60 > parseInt(drop.style.left) &&
                gameArea.offsetHeight - 90 < top + 30
            ) {
                score++;
                scoreDisplay.textContent = score;
                drop.remove();
                drops.splice(index, 1);
            }
        }
    });

    obstacles.forEach((obstacle, index) => {
        let top = parseInt(obstacle.style.top);
        if (top > gameArea.offsetHeight) {
            obstacle.remove();
            obstacles.splice(index, 1);
        } else {
            obstacle.style.top = top + 5 + 'px';

            // بررسی برخورد با شخصیت
            if (
                playerPosition < parseInt(obstacle.style.left) + 80 &&
                playerPosition + 60 > parseInt(obstacle.style.left) &&
                gameArea.offsetHeight - 90 < top + 80
            ) {
                endGame();
            }
        }
    });
}

// پایان بازی
function endGame() {
    clearInterval(gameInterval);
    alert(`بازی تمام شد! امتیاز شما: ${score}`);
    location.reload();
}

// شروع بازی
function startGame() {
    gameInterval = setInterval(() => {
        moveObjects();
    }, 50);

    setInterval(createDrop, 1000);
    setInterval(createObstacle, 3000);
}

startGame();