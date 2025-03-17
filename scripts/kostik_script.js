// контейнер для мячиков
const ballsContainer = document.getElementById('balls-container');

// настройки мячиков
const ballSize = 50;
const numBalls = 150;
const balls = [];
const friction = 0.997; // коэффициент трения (антизамедление)
let isPaused = false; // флаг остановки мячиков

// переменные для притяжения
let isMouseDown = false;
let mouseX = 0;
let mouseY = 0;
const attractionStrength = 1;

// создаем мячики
for (let i = 0; i < numBalls; i++) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    ballsContainer.appendChild(ball);

    balls.push({
        element: ball,
        posX: Math.random() * (window.innerWidth - ballSize),
        posY: Math.random() * (window.innerHeight - ballSize),
        velocityX: (Math.random() - 0.5) * 25,
        velocityY: (Math.random() - 0.5) * 25,
    });
}

// функция проверки столкновений с границами viewport
function checkCollisions(ball) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const headerBottom = headerHeight; // нижняя граница хедера в координатах страницы

    // проверка столкновений с левым и правым краем экрана
    if (ball.posX < 0) {
        ball.posX = 0;
        ball.velocityX = Math.abs(ball.velocityX);
    } else if (ball.posX + ballSize > windowWidth) {
        ball.posX = windowWidth - ballSize;
        ball.velocityX = -Math.abs(ball.velocityX);
    }

    // проверка столкновений с верхней границей (учитываем header, только если мяч внутри его зоны)
    if (ball.posY < scrollY) {
        ball.posY = scrollY;
        ball.velocityY = Math.abs(ball.velocityY);
    } else if (ball.posY < headerBottom && scrollY < headerHeight) {
        ball.posY = headerBottom;
        ball.velocityY = Math.abs(ball.velocityY);
    }

    // проверка столкновений с нижней границей экрана
    if (ball.posY + ballSize > scrollY + windowHeight) {
        ball.posY = scrollY + windowHeight - ballSize;
        ball.velocityY = -Math.abs(ball.velocityY);
    }
}

// функция обновления позиций мячиков
function updateBallsPosition() {
    if (isPaused) return;

    balls.forEach(ball => {
        if (isMouseDown) {
            const dx = mouseX - ball.posX;
            const dy = (mouseY + window.scrollY) - ball.posY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 0) {
                ball.velocityX += (dx / distance) * attractionStrength;
                ball.velocityY += (dy / distance) * attractionStrength;
            }
        }

        // обновляем позиции с учетом замедления
        ball.velocityX *= friction;
        ball.velocityY *= friction;
        ball.posX += ball.velocityX;
        ball.posY += ball.velocityY;

        checkCollisions(ball);

        ball.element.style.left = `${ball.posX}px`;
        ball.element.style.top = `${ball.posY}px`;
    });

    requestAnimationFrame(updateBallsPosition);
}

updateBallsPosition();

// обработчики притяжения
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') isMouseDown = true;
    if (e.key === 'ArrowRight') document.body.classList.toggle('invert-colors');
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') isMouseDown = false;
});

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// обработчик остановки мячиков на пробел
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        isPaused = !isPaused;
        if (!isPaused) updateBallsPosition();
    }
});

window.addEventListener('scroll', () => {
    balls.forEach(ball => checkCollisions(ball));
});