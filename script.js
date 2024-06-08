const predefinedUser = {
    username: 'admin1',
    password: 'lol'
};

function showHome() {
    hideAllSections();
    document.getElementById('home').style.display = 'block';
    loadPosts();
}

function showLogin() {
    hideAllSections();
    document.getElementById('login').style.display = 'block';
}

function showCreatePost() {
    hideAllSections();
    document.getElementById('createPost').style.display = 'block';
}

function hideAllSections() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('createPost').style.display = 'none';
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = '';
    posts.forEach((post) => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `<h4>${post.title}</h4><p>${post.content}</p>`;
        postsList.appendChild(postDiv);
    });
}

function createPost(event) {
    event.preventDefault();
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    const newPost = {
        title,
        content
    };

    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    document.getElementById('postForm').reset();
    showHome();
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (username === predefinedUser.username && password === predefinedUser.password) {
        document.getElementById('createPostButton').style.display = 'block';
        showHome();
    } else {
        alert('Invalid login credentials.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showHome();
});
