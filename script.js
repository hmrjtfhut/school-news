// Predefined accounts
const predefinedUsers = {
    'admin1': 'password123',
};

// Save predefined users to localStorage if not already present
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(predefinedUsers));
}

function showHome() {
    hideAllSections();
    document.getElementById('home').style.display = 'block';
}

function showRegister() {
    hideAllSections();
    document.getElementById('register').style.display = 'block';
}

function showLogin() {
    hideAllSections();
    document.getElementById('login').style.display = 'block';
}

function showHelp() {
    hideAllSections();
    document.getElementById('help').style.display = 'block';
    document.getElementById('helpOptions').style.display = 'block';
}

function showGetAccount() {
    hideHelpSections();
    document.getElementById('getAccount').style.display = 'block';
}

function showFeedback() {
    hideHelpSections();
    document.getElementById('feedback').style.display = 'block';
}

function showHelpMessage() {
    hideHelpSections();
    document.getElementById('helpMessage').style.display = 'block';
}

function hideAllSections() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('help').style.display = 'none';
}

function hideHelpSections() {
    document.getElementById('getAccount').style.display = 'none';
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('helpMessage').style.display = 'none';
    document.getElementById('helpOptions').style.display = 'none';
    document.getElementById('adminMessages').style.display = 'none';
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
}

function saveMessages(messages) {
    localStorage.setItem('messages', JSON.stringify(messages));
}

function loadMessages() {
    const messages = localStorage.getItem('messages');
    return messages ? JSON.parse(messages) : [];
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
        // Store the logged-in user in sessionStorage
        sessionStorage.setItem('loggedInUser', username);
        if (username === 'admin1') {
            showAdminMessages();
        } else {
            showHome();
        }
    } else {
        alert('Invalid username or password');
    }
}

function requestAccount(event) {
    event.preventDefault();
    const name = document.getElementById('requestName').value;
    const message = document.getElementById('accountMessage').value;
    let messages = loadMessages();
    messages.push({ type: 'account', name: name, message: message });
    saveMessages(messages);
    alert('Account request sent');
    showHome();
}

function sendFeedback(event) {
    event.preventDefault();
    const message = document.getElementById('feedbackMessage').value;
    let messages = loadMessages();
    messages.push({ type: 'feedback', message: message });
    saveMessages(messages);
    alert('Feedback sent');
    showHome();
}

function sendHelpMessage(event) {
    event.preventDefault();
    const message = document.getElementById('helpMessageContent').value;
    let messages = loadMessages();
    messages.push({ type: 'help', message: message });
    saveMessages(messages);
    alert('Help message sent');
    showHome();
}

function showAdminMessages() {
    hideHelpSections();
    const messages = loadMessages();
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '';
    messages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.textContent = `[${msg.type.toUpperCase()}] ${msg.name ? msg.name + ': ' : ''}${msg.message}`;
        messagesList.appendChild(msgDiv);
    });
    document.getElementById('adminMessages').style.display = 'block';
}

// Check if an admin is logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser === 'admin1') {
        showAdminMessages();
    }
});
