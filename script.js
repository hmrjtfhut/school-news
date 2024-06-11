document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const gameFrame = document.getElementById('game-frame');

    tabLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const target = link.getAttribute('data-tab');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === target) {
                    content.classList.add('active');
                }
            });

            tabLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Activate the first tab by default
    tabLinks[0].click();
});

function openGame(url) {
    const gameFrame = document.getElementById('game-frame');
    gameFrame.style.display = 'block';
    gameFrame.src = 'about:blank';
    setTimeout(() => gameFrame.src = url, 100);
}
