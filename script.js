const users = { 'admin': 'lol' };
let currentUser = null;
let chatMessages = [];

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (users[username] && users[username] === password) {
        currentUser = username;
        document.getElementById('login').style.display = 'none';
        document.getElementById('home').style.display = 'block';
        if (currentUser === 'admin') {
            document.getElementById('adminPost').style.display = 'block';
        }
        displayNews();
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function logout() {
    currentUser = null;
    document.getElementById('login').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('chat').style.display = 'none';
}

function postNews() {
    const message = document.getElementById('newsMessage').value;
    chatMessages.push({ user: 'admin', message });
    document.getElementById('newsMessage').value = '';
    displayNews();
}

function displayNews() {
    const newsDiv = document.getElementById('news');
    newsDiv.innerHTML = chatMessages
        .filter(msg => msg.user === 'admin')
        .map(msg => `<p><strong>${msg.user}</strong>: ${msg.message}</p>`)
        .join('');
}

function showChat() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
    loadChatMessages();
}

function showHome() {
    document.getElementById('chat').style.display = 'none';
    document.getElementById('home').style.display = 'block';
}

function sendMessage() {
    const message = document.getElementById('chatMessage').value;
    chatMessages.push({ user: currentUser, message });
    document.getElementById('chatMessage').value = '';
    loadChatMessages();
}

function loadChatMessages() {
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML = chatMessages
        .map(msg => `<p><strong>${msg.user}</strong>: ${msg.message}</p>`)
        .join('');
}

setInterval(loadChatMessages, 1000);
