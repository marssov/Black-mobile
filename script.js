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
