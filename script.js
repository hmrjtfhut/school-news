// Predefined accounts
const predefinedUsers = {
    'admin1': 'lol'
};

// Save predefined users to localStorage if not already present
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(predefinedUsers));
}

// Initialize posts
if (!localStorage.getItem('posts')) {
    localStorage.setItem('posts', JSON.stringify([]));
}

function showHome() {
    hideAllSections();
    document.getElementById('home').style.display = 'block';
    loadPosts();
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

function savePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

function loadPosts() {
    const posts = localStorage.getItem('posts');
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = '';
    JSON.parse(posts).forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `<h4>${post.title}</h4><p>${post.content}</p>`;
        if (sessionStorage.getItem('loggedInUser') === 'admin1') {
            postDiv.innerHTML += `<button onclick="editPost(${index})">Edit</button>
                                  <button onclick="deletePost(${index})">Delete</button>`;
        }
        postsList.appendChild(postDiv);
    });
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    let users = loadUsers();
    if (users[username] && users[username] === password) {
        alert('Login successful');
        sessionStorage.setItem('loggedInUser', username);
        if (username === 'admin1') {
            document.getElementById('adminControls').style.display = 'block';
            showAdminMessages();
        }
        showHome();
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

function createOrUpdatePost(event) {
    event.preventDefault();
    const postId = document.getElementById('postId').value;
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    let posts = JSON.parse(localStorage.getItem('posts'));
    if (postId) {
        posts[postId] = { title, content };
    } else {
        posts.push({ title, content });
    }
    savePosts(posts);
    document.getElementById('postForm').reset();
    document.getElementById('postId').value = '';
    loadPosts();
}

function editPost(index) {
    let posts = JSON.parse(localStorage.getItem('posts'));
    document.getElementById('postId').value = index;
    document.getElementById('postTitle').value = posts[index].title;
    document.getElementById('postContent').value = posts[index].content;
    document.getElementById('postForm').scrollIntoView();
}

function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem('posts'));
    posts.splice(index, 1);
    savePosts(posts);
    loadPosts();
}

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser === 'admin1') {
        document.getElementById('adminControls').style.display = 'block';
        showAdminMessages();
    }
    loadPosts();
    showHome();
});
