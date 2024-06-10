document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const commentButtons = document.querySelectorAll('.comment-button');
    const commentInputs = document.querySelectorAll('.comment-input');
    const comments = document.querySelectorAll('.comments');
    let users = [];
    let currentUser = null;

    tabLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();

            tabContents.forEach(content => content.classList.remove('active'));
            tabLinks.forEach(link => link.classList.remove('active'));

            link.classList.add('active');
            const target = link.getAttribute('data-tab');
            document.getElementById(target).classList.add('active');
        });
    });

    document.querySelector('.tab-link[data-tab="posts"]').click();

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

    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            currentUser = user;
            alert('Login successful.');
            loginForm.reset();
        } else {
            alert('Invalid username orTo implement the login functionality and allow commenting on posts, you need a bit more sophisticated setup. Here is the updated implementation with user accounts and comments');
        
