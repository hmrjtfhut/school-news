document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const target = tab.getAttribute('data-tab');

            contents.forEach(content => {
                content.classList.remove('active');
                if (content.id === target) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Game loading functionality
    const games = document.querySelectorAll('.game');

    games.forEach(game => {
        game.addEventListener('click', () => {
            const gameName = game.getAttribute('data-game');
            let gameUrl;

            switch (gameName) {
                case '2048':
                    gameUrl = 'https://artclass.site/service/hvtrs8%2F-aqsgtq.1kj0%2Cngt-224%3A%2Fknfez.jtol';
                    break;
                case 'adofai':
                    gameUrl = 'https://artclass.site/service/hvtrs8%2F-aqsgtq.1kj0%2Cngt-a%2Fdcnae%2Fod-dipe%2Fald%2Fiae-ildgx%2Chvmn';
                    break;
                default:
                    gameUrl = 'about:blank';
            }

            if (gameUrl !== 'about:blank') {
                window.open(gameUrl, '_blank');
            }
        });
    });
});
