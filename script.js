document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const commentButtons = document.querySelectorAll('.comment-button');
    const comments = document.querySelectorAll('.comments');
    let users = [];
    let currentUser = null;

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

    // Initialize by showing the posts tab
    document.querySelector('.tab-link[data-tab="posts"]').click();

    // Handle registration
    registerForm.addEventListener('submit', event => {
        event.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;

        if (users.some(user => user.username === username)) {
            alert('Username already exists.');
        } else {
            users.push({ username, password });
            alert('Registration successful.');
            registerForm.reset();
        }
    });

    // Handle login
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const username = document.get
