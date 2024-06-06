// Predefined account for simplicity
const predefinedUser = {
    username: 'admin1',
    password: 'lol'
};

function showHome() {
    hideAllSections();
    document.getElementById('home').style.display = 'block';
}

function showLogin() {
    hideAllSections();
    document.getElementById('login').style.display = 'block';
}

function hideAllSections() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('login').style.display = 'none';
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (username === predefinedUser.username && password === predefinedUser.password) {
        alert('Login successful');
        showHome();
    } else {
        alert('Invalid username or password');
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    showHome();
});
