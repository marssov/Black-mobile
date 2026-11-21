// 1. Надёжное открытие Telegram (приложение + fallback на telegram.me)
function openTelegramLink(event, username) {
    event.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        window.location.href = `tg://resolve?domain=${username}`;

        setTimeout(() => {
            if (!document.hidden) {
                window.location.href = `https://telegram.me{username}`;
            }
        }, 1200);
    } else {
        window.open(`https://telegram.me{username}`, '_blank', 'noopener,noreferrer');
    }
}

// 2. Интерактивный переключатель вкладок «Выбери свой путь»
const pathData = {
    gov: {
        img: 'Screenshot1.jpg',
        badge: 'ЗАКОН И ПОРЯДОК',
        title: 'ФСБ, Полиция и Армия',
        desc: 'Поднимись от рядового до директора ФСБ. Проводи спецоперации, контролируй порядок на дорогах и защищай интересы государства.',
        tip: '💡 <b>Стартовый совет:</b> Получи военный билет в первые дни и подай заявку в академию ФСБ для доступа к закрытому автопарку.'
    },
    biz: {
        img: 'Screenshot6.jpg',
        badge: 'БОЛЬШИЕ ДЕНЬГИ И СТАТУС',
        title: 'Бизнес, Казино и Элитные Авто',
        desc: 'Скупай прибыльные АЗС, автосалоны и клубы, участвуй в закрытых аукционах и собери гараж из редчайших гиперкаров.',
        tip: '💡 <b>Стартовый совет:</b> Используй стартовый капитал 50 000 000 ₽ для покупки первого бизнеса на аукционе и пассивного дохода.'
    },
    crime: {
        img: 'Screenshot2.jpg',
        badge: 'ВЛАСТЬ УЛИЦ',
        title: 'Криминал, ОПГ и Синдикаты',
        desc: 'Создай собственную группировку, захватывай территории и бизнесы, организуй налёты и держи весь город под контролем.',
        tip: '💡 <b>Стартовый совет:</b> Собери надёжную команду, прокачай навыки стрельбы и начни с крышевания районов.'
    }
};

function switchPath(key, btnElement) {
    const data = pathData[key];
    if (!data) return;

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    document.getElementById('path-img').src = data.img;
    document.getElementById('path-badge').textContent = data.badge;
    document.getElementById('path-title').textContent = data.title;
    document.getElementById('path-desc').textContent = data.desc;
    document.getElementById('path-tip').innerHTML = data.tip;
}

// 3. Падающие золотые искры и золотая пыль на фоне (автосоздание Canvas)
(function initGoldSparks() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '50';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let sparks = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const goldPalette = [
        'rgba(253, 224, 71, 0.9)',  // Яркое светлое золото
        'rgba(245, 158, 11, 0.85)', // Насыщенный янтарь
        'rgba(217, 119, 6, 0.75)'   // Глубокий золотой отблеск
    ];

    function createSpark(randomY = false) {
        return {
            x: Math.random() * canvas.width,
            y: randomY ? Math.random() * canvas.height : -10,
            r: Math.random() * 2.2 + 0.7,
            speedY: Math.random() * 1.1 + 0.45,
            driftX: (Math.random() - 0.5) * 0.5,
            sway: Math.random() * Math.PI * 2,
            color: goldPalette[Math.floor(Math.random() * goldPalette.length)]
        };
    }

    for (let i = 0; i < 60; i++) {
        sparks.push(createSpark(true));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        sparks.forEach((s, i) => {
            s.sway += 0.025;
            s.y += s.speedY;
            s.x += s.driftX + Math.sin(s.sway) * 0.35;

            if (s.y > canvas.height + 10) {
                sparks[i] = createSpark(false);
            }

            ctx.save();
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#F59E0B';
            ctx.fill();
            ctx.restore();
        });

        requestAnimationFrame(animate);
    }
    animate();
})();
