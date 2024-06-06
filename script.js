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

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
}

function register(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let users = loadUsers();
    if (users[username]) {
        alert('Username already exists');
    } else {
        users[username] = password;
        saveUsers(users);
        alert('Registration successful');
        showLogin();
    }
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    let users = loadUsers();
    if (users[username] && users[username] === password) {
        alert('Login successful');
        // Add logic here for successful login, e.g., redirecting to a user dashboard
    } else {
        alert('Invalid username or password');
    }
}
