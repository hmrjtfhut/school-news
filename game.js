document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const game = params.get('game');
    const gameFrame = document.getElementById('game-frame');

    let gameUrl;
    switch (game) {
        case '2048':
            gameUrl = 'https://artclass.site/service/hvtrs8%2F-aqsgtq.1kj0%2Cngt-224%3A%2Fknfez.jtol';
            break;
        case 'adofai':
            gameUrl = 'https://artclass.site/service/hvtrs8%2F-aqsgtq.1kj0%2Cngt-a%2Fdcnae%2Fod-dipe%2Fald%2Fiae-ildgx%2Chvmn';
            break;
        default:
            gameUrl = 'https://artclass.site/service/hvtrs8%2F-aqsgtq.1kj0%2Cngt-224%3A%2Fknfez.jtol';
    }

    gameFrame.src = gameUrl;
});
