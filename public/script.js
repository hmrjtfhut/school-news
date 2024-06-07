const API_URL = 'https://<your-vercel-deployment-url>/api/posts';

// Predefined account for simplicity
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

async function loadPosts() {
    try {
        const response = await fetch(API_URL);
        const posts = await response.json();
        const postsList = document.getElementById('postsList');
        postsList.innerHTML = '';
        posts.forEach((post) => {
            const postDiv = document.createElement('div');
            postDiv.innerHTML = `<h4>${post.title}</h4><p>${post.content}</p>`;
            postsList.appendChild(postDiv);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

async function createPost(event) {
    event.preventDefault();
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    const newPost = {
        title,
        content
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });

        if (response.ok) {
            document.getElementById('postForm').reset();
            showHome();
        } else {
            console.error('Failed to create post');
        }
    } catch (error) {
        console.error('Error creating post:', error);
    }
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
