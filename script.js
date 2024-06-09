document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();

            // Remove active class from all tab contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Remove active class from all tab links
            tabLinks.forEach(link => link.classList.remove('active'));

            // Add active class to the clicked tab link
            link.classList.add('active');

            // Get the target tab content and add active class
            const target = link.getAttribute('data-tab');
            document.getElementById(target).classList.add('active');
        });
    });

    // Initialize by showing the home tab
    document.querySelector('.tab-link[data-tab="home"]').click();
});
