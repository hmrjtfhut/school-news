function showHome() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'none';
}

function showRegister() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('register').style.display = 'block';
    document.getElementById('login').style.display = 'none';
}

function showLogin() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

let users = {};

function register(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (users[username]) {
        alert('Username already exists');
    } else {
        users[username] = password;
        alert('Registration successful');
    }
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    if (users[username] && users[username] === password) {
        alert('Login successful');
    } else {
        alert('Invalid username or password');
    }
}
