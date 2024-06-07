const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;
const postsFilePath = 'posts.json';

app.use(bodyParser.json());
app.use(cors());

// Load posts from the JSON file
function loadPosts() {
    if (!fs.existsSync(postsFilePath)) {
        return [];
    }
    const data = fs.readFileSync(postsFilePath, 'utf-8');
    return JSON.parse(data);
}

// Save posts to the JSON file
function savePosts(posts) {
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');
}

// Endpoint to get posts
app.get('/posts', (req, res) => {
    const posts = loadPosts();
    res.json(posts);
});

// Endpoint to create a new post
app.post('/posts', (req, res) => {
    const posts = loadPosts();
    const newPost = req.body;
    posts.push(newPost);
    savePosts(posts);
    res.status(201).json(newPost);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
