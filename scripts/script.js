// Получаем мячик
const ball = document.getElementById('ball');

// Настройки мячика
let posX = Math.random()*1000; // Начальная позиция X
let posY = Math.random()*1000; // Начальная позиция Y
let velocityX = 5; // Начальная скорость по X
let velocityY = 5; // Начальная скорость по Y
const ballSize = 50; // Размер мячика

// Функция для проверки столкновений с границами viewport
function checkCollisions() {
    const windowWidth = window.innerWidth; // Ширина видимой области
    const windowHeight = window.innerHeight; // Высота видимой области
    const scrollY = window.scrollY; // Текущая прокрутка страницы по вертикали

    // Проверяем столкновение с левой и правой границами
    if (posX < 0) {
        posX = 0;
        velocityX = Math.abs(velocityX); // Отскок вправо
    } else if (posX + ballSize > windowWidth) {
        posX = windowWidth - ballSize;
        velocityX = -Math.abs(velocityX); // Отскок влево
    }

    // Проверяем столкновение с верхней и нижней границами
    if (posY < scrollY) { // Верхняя граница viewport
        posY = scrollY;
        velocityY = Math.abs(velocityY); // Отскок вниз
    } else if (posY + ballSize > scrollY + windowHeight) { // Нижняя граница viewport
        posY = scrollY + windowHeight - ballSize;
        velocityY = -Math.abs(velocityY); // Отскок вверх
    }
}

// Функция для обновления позиции мячика
function updateBallPosition() {
    // Обновляем позицию мячика
    posX += velocityX;
    posY += velocityY;

    // Проверяем столкновения с границами viewport
    checkCollisions();

    // Применяем новую позицию
    ball.style.left = `${posX}px`;
    ball.style.top = `${posY}px`;

    // Запускаем анимацию на следующем кадре
    requestAnimationFrame(updateBallPosition);
}

// Запускаем движение мячика
updateBallPosition();

// Инвертирование цветов при наведении мячика
ball.addEventListener('mousemove', () => {
    document.body.classList.add('invert-colors');
});

ball.addEventListener('mouseleave', () => {
    document.body.classList.remove('invert-colors');
});

// Обработчик прокрутки страницы
window.addEventListener('scroll', () => {
    checkCollisions(); // Проверяем столкновения при прокрутке
});