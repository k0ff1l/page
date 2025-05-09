// контейнер для мячиков
const ballsContainer = document.getElementById('balls-container');

// настройки мячиков
const ballSize = 50;
const numBalls = 150;
const balls = [];
const friction = 0.98; // коэффициент трения (антизамедление)
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
    const footer = document.querySelector('footer');
    const footerBottom = footer ? footer.offsetTop + footer.offsetHeight : document.body.scrollHeight;

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

    const maxY = Math.min(scrollY + windowHeight - ballSize, footerBottom - ballSize);
    if (ball.posY > maxY) {
        ball.posY = maxY;
        ball.velocityY = -Math.abs(ball.velocityY);
    }
}

// функция мигания h1
const h1 = document.querySelector("h1");

function updateTitleEffect() {
    analyser.getByteFrequencyData(dataArray);
    const bass = dataArray[3];

    if (bass > 200) {
        h1.style.color = h1.style.color === "black" ? "white" : "black";
        h1.style.fontWeight = Math.random() * 1000;
        h1.style.fontStretch = Math.random() * 1000 + "px";
    }

    if (bass === 0) {
        h1.style.backgroundColor = "black";
        h1.style.color = "white";
    }

    requestAnimationFrame(updateTitleEffect);
}

updateTitleEffect();


// функция обновления позиций мячиков
function updateBallsPosition() {
    if (isPaused) return;

    analyser.getByteFrequencyData(dataArray);
    const bass = (dataArray[3] * 2 + dataArray[4])/3;

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

        if (bass > 200) {
            if (Math.abs(ball.velocityY) < 10) {
                ball.velocityY += bass * 0.25 * Math.random() * (Math.random() < 0.5 ? 1 : -1);
            }
        }

        if (bass < 200 && bass !== 0) {
            ball.velocityY += 5;
            ball.velocityX = 30 * Math.random() * (Math.random() < 0.5 ? 1 : -1);
        }

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