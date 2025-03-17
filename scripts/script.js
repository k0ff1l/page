// Контейнер для мячиков
const ballsContainer = document.getElementById('balls-container');

// Настройки мячиков
const ballSize = 50; // Размер мячика
const numBalls = 150; // Количество мячиков
const balls = []; // Массив для хранения мячиков

// Создаем мячики
for (let i = 0; i < numBalls; i++) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    ballsContainer.appendChild(ball);

    // Начальные параметры мячика
    balls.push({
        element: ball,
        posX: Math.random() * (window.innerWidth - ballSize),
        posY: Math.random() * (window.innerHeight - ballSize),
        velocityX: (Math.random() - 0.5) * 25, // Случайная скорость по X
        velocityY: (Math.random() - 0.5) * 25, // Случайная скорость по Y
    });
}

// Функция для проверки столкновений с границами viewport
function checkCollisions(ball) {
    const windowWidth = window.innerWidth; // Ширина видимой области
    const windowHeight = window.innerHeight; // Высота видимой области
    const scrollY = window.scrollY; // Текущая прокрутка страницы по вертикали

    // Проверяем столкновение с левой и правой границами
    if (ball.posX < 0) {
        ball.posX = 0;
        ball.velocityX = Math.abs(ball.velocityX); // Отскок вправо
    } else if (ball.posX + ballSize > windowWidth) {
        ball.posX = windowWidth - ballSize;
        ball.velocityX = -Math.abs(ball.velocityX); // Отскок влево
    }

    // Проверяем столкновение с верхней и нижней границами
    if (ball.posY < scrollY) { // Верхняя граница viewport
        ball.posY = scrollY;
        ball.velocityY = Math.abs(ball.velocityY); // Отскок вниз
    } else if (ball.posY + ballSize > scrollY + windowHeight) { // Нижняя граница viewport
        ball.posY = scrollY + windowHeight - ballSize;
        ball.velocityY = -Math.abs(ball.velocityY); // Отскок вверх
    }
}

// Функция для обновления позиции всех мячиков
function updateBallsPosition() {
    balls.forEach(ball => {
        // Обновляем позицию мячика
        ball.posX += ball.velocityX;
        ball.posY += ball.velocityY;

        // Проверяем столкновения с границами viewport
        checkCollisions(ball);

        // Применяем новую позицию
        ball.element.style.left = `${ball.posX}px`;
        ball.element.style.top = `${ball.posY}px`;
    });

    // Запускаем анимацию на следующем кадре
    requestAnimationFrame(updateBallsPosition);
}

// Запускаем движение мячиков
updateBallsPosition();

// Инвертирование цветов при наведении на мячики
ballsContainer.addEventListener('mousemove', () => {
    document.body.classList.add('invert-colors');
});

ballsContainer.addEventListener('mouseleave', () => {
    document.body.classList.remove('invert-colors');
});

// Обработчик прокрутки страницы
window.addEventListener('scroll', () => {
    balls.forEach(ball => checkCollisions(ball)); // Проверяем столкновения при прокрутке
});

const translations = {
    fr: {
        welcome: "Bienvenue sur ma page!",
        about: "À propos",
        hobby: "Loisirs",
        study: "Études",
        music: "Musique",
        aboutText: "Salut! Je m'appelle Konstantin Filippov. J'étudie à l'Université technique d'État de Bauman et je suis passionné par la programmation et la musique. Sur cette page, vous pouvez en apprendre plus sur mes loisirs, mes études et ma musique préférée.",
        hobbyText: "Dans mon temps libre, j'aime trapper. Cela m'aide à me détendre et à développer mes compétences.",
        studyText: "Je suis en deuxième année. Mes matières préférées sont [aucune]. J'essaie de consacrer beaucoup de temps à la musique pour atteindre mes objectifs.",
        musicText: "J'aime écouter de la musique de différents genres. Voici quelques-uns de mes morceaux préférés",
        footerText: "&copy; 2025 KONSTANTIN ANDREEVICH FILIPPOV. Tous droits réservés."
    },
    en: {
        welcome: "Welcome to my page!",
        about: "About",
        hobby: "Hobbies",
        study: "Studies",
        music: "Music",
        aboutText: "Hi! My name is Konstantin Filippov. I study at Bauman Moscow State Technical University and I am passionate about programming and music. On this page, you can learn more about my hobbies, studies, and favorite music.",
        hobbyText: "In my free time, I like to trap. It helps me relax and develop my skills.",
        studyText: "I am in my second year. My favorite subjects are [none]. I try to devote a lot of time to music to achieve my goals.",
        musicText: "I enjoy listening to music of different genres. Here are some of my favorite tracks",
        footerText: "&copy; 2025 KONSTANTIN ANDREEVICH FILIPPOV. All rights reserved."
    },
    ru: {
        welcome: "Добро пожаловать на мою страницу!",
        about: "Обо мне",
        hobby: "Хобби",
        study: "Учёба",
        music: "Музыка",
        aboutText: "Привет! Меня зовут Константин Филиппов. Я учусь в МГТУ им. Баумана и увлекаюсь программированием и музыкой. На этой странице вы можете узнать больше о моих хобби, учёбе и любимой музыке.",
        hobbyText: "В свободное время я люблю заниматься трэпом. Это помогает мне расслабиться и развивать свои навыки.",
        studyText: "Я учусь на втором курсе. Мои любимые предметы — [нет]. Я стараюсь уделять много времени музыке, чтобы достичь своих целей.",
        musicText: "Я люблю слушать музыку разных жанров. Вот несколько моих любимых треков",
        footerText: "&copy; 2025 КОНСТАНТИН АНДРЕЕВИЧ ФИЛИППОВ. Все права защищены."
    }
};

function changeLanguage(lang) {
    // Получаем тексты для выбранного языка
    const texts = translations[lang];

    // Обновляем текст на странице
    document.querySelector('header h1').textContent = texts.welcome;
    document.querySelector('nav a[href="#about"]').textContent = texts.about;
    document.querySelector('nav a[href="#hobby"]').textContent = texts.hobby;
    document.querySelector('nav a[href="#study"]').textContent = texts.study;
    document.querySelector('nav a[href="#music"]').textContent = texts.music;
    document.querySelector('#about h2').textContent = texts.about;
    document.querySelector('#about p').textContent = texts.aboutText;
    document.querySelector('#hobby h2').textContent = texts.hobby;
    document.querySelector('#hobby p').textContent = texts.hobbyText;
    document.querySelector('#study h2').textContent = texts.study;
    document.querySelector('#study p').textContent = texts.studyText;
    document.querySelector('#music h2').textContent = texts.music;
    document.querySelector('#music p').textContent = texts.musicText;
    document.querySelector('footer').innerHTML = texts.footerText;
}

document.getElementById('lang-fr').addEventListener('click', () => changeLanguage('fr'));
document.getElementById('lang-en').addEventListener('click', () => changeLanguage('en'));
document.getElementById('lang-ru').addEventListener('click', () => changeLanguage('ru'));