// Initialize posts
if (!localStorage.getItem('posts')) {
    localStorage.setItem('posts', JSON.stringify([]));
}

function showHome() {
    hideAllSections();
    document.getElementById('home').style.display = 'block';
    loadPosts();
}

function showCreatePost() {
    hideAllSections();
    document.getElementById('createPost').style.display = 'block';
}

function hideAllSections() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('createPost').style.display = 'none';
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
        postsList.appendChild(postDiv);
    });
}

function createPost(event) {
    event.preventDefault();
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    let posts = JSON.parse(localStorage.getItem('posts'));
    posts.push({ title, content });
    savePosts(posts);
    document.getElementById('postForm').reset();
    showHome();
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    showHome();
});
