document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const registerSuccess = document.getElementById("register-success");
    const registerError = document.getElementById("register-error");
    const loginError = document.getElementById("login-error");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendChat = document.getElementById("send-chat");
    const newPostForm = document.getElementById("new-post-form");
    const newsPosts = document.getElementById("news-posts");
    const resetChatBtn = document.getElementById("reset-chat-btn");
    const fileInput = document.getElementById("file-input");
    const chatContainer = document.getElementById("chat-container");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let likes = JSON.parse(localStorage.getItem("likes")) || {};
    let dislikes = JSON.parse(localStorage.getItem("dislikes")) || {};
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    let news = JSON.parse(localStorage.getItem("news")) || [];

    // Function to show a section
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove("active");
        });
        document.querySelector(sectionId).classList.add("active");
    }

    // Add event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute("href");
            showSection(sectionId);

            if (sectionId === "#news" && loggedInUser && loggedInUser.username === "admin1") {
                newPostForm.style.display = "block";
            } else {
                newPostForm.style.display = "none";
            }
        });
    });

    // Registration
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("register-username").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        // Check if email is already in use
        if (users.some(user => user.email === email)) {
            registerError.style.display = "block";
            registerSuccess.style.display = "none";
        } else {
            users.push({ username, email, password });
            localStorage.setItem("users", JSON.stringify(users));
            registerSuccess.style.display = "block";
            registerError.style.display = "none";
            registerForm.reset();
        }
    });

    // Login
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            loggedInUser = user;
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            loginError.style.display = "none";
            showSection("#home");
        } else {
            loginError.style.display = "block";
        }
    });

    // Like and dislike functionality
    function handleLikeDislike(articleId, isLike) {
        if (loggedInUser) {
            if (!likes[articleId]) likes[articleId] = [];
            if (!dislikes[articleId]) dislikes[articleId] = [];

            if (isLike) {
                if (!likes[articleId].includes(loggedInUser.username)) {
                    likes[articleId].push(loggedInUser.username);
                    dislikes[articleId] = dislikes[articleId].filter(username => username !== loggedInUser.username);
                } else {
                    likes[articleId] = likes[articleId].filter(username => username !== loggedInUser.username);
                }
            } else {
                if (!dislikes[articleId].includes(loggedInUser.username)) {
                    dislikes[articleId].push(loggedInUser.username);
                    likes[articleId] = likes[articleId].filter(username => username !== loggedInUser.username);
                } else {
                    dislikes[articleId] = dislikes[articleId].filter(username => username !== loggedInUser.username);
                }
            }

            localStorage.setItem("likes", JSON.stringify(likes));
            localStorage.setItem("dislikes", JSON.stringify(dislikes));
            updateLikeCounts(articleId);
        } else {
            alert("You must be logged in to like or dislike posts.");
        }
    }

    // Update like and dislike counts
    function updateLikeCounts(articleId) {
        const likeCount = likes[articleId] ? likes[articleId].length : 0;
        const dislikeCount = dislikes[articleId] ? dislikes[articleId].length : 0;

        document.querySelector(`.like-count[data-article-id="${articleId}"]`).textContent = likeCount;
        document.querySelector(`.dislike-count[data-article-id="${articleId}"]`).textContent = dislikeCount;
    }

    // Add event listeners to like and dislike buttons
    function initializeLikeButtons() {
        document.querySelectorAll(".like-btn").forEach(button => {
            button.addEventListener("click", function() {
                const articleId = this.getAttribute("data-article-id");
                handleLikeDislike(articleId, true);
            });
        });

        document.querySelectorAll(".dislike-btn").forEach(button => {
            button.addEventListener("click", function() {
                const articleId = this.getAttribute("data-article-id");
                handleLikeDislike(articleId, false);
            });
        });
    }

    // News post functionality
    newPostForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("post-title").value;
        const content = document.getElementById("post-content").value;

        const postId = Date.now().toString();
        news.push({ id: postId, title, content, author: loggedInUser.username });
        localStorage.setItem("news", JSON.stringify(news));
        displayNewsPosts();
        newPostForm.reset();
    });

    // Display news posts
    function displayNewsPosts() {
        newsPosts.innerHTML = "";
        news.forEach(post => {
            const postElement = document.createElement("div");
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <p>By: ${post.author}</p>
                <button class="like-btn" data-article-id="${post.id}">Like (<span class="like-count" data-article-id="${post.id}">0</span>)</button>
                <button class="dislike-btn" data-article-id="${post.id}">Dislike (<span class="dislike-count" data-article-id="${post.id}">0</span>)</button>
                ${loggedInUser && loggedInUser.username === "admin1" ? `
                    <button class="edit-post" data-post-id="${post.id}">Edit</button>
                    <button class="delete-post" data-post-id="${post.id}">Delete</button>
                ` : ""}
            `;
            newsPosts.appendChild(postElement);
        });

        initializeLikeButtons();
        addEditDeleteEventListeners();
    }

    // Add event listeners to edit and delete buttons
    function addEditDeleteEventListeners() {
        document.querySelectorAll(".edit-post").forEach(button => {
            button.addEventListener("click", function() {
                const postId = this.getAttribute("data-post-id");
                const post = news.find(post => post.id === postId);
                if (post) {
                    const newTitle = prompt("Edit Title", post.title);
                    const newContent = prompt("Edit Content", post.content);
                    if (newTitle !== null && newContent !== null) {
                        post.title = newTitle;
                        post.content = newContent;
                        localStorage.setItem("news", JSON.stringify(news));
                        displayNewsPosts();
                    }
                }
            });
        });

        document.querySelectorAll(".delete-post").forEach(button => {
            button.addEventListener("click", function() {
                const postId = this.getAttribute("data-post-id");
                if (confirm("Are you sure you want to delete this post?")) {
                    news = news.filter(post => post.id !== postId);
                    localStorage.setItem("news", JSON.stringify(news));
                    displayNewsPosts();
                }
            });
        });
    }

    // Reset Chat
    resetChatBtn.addEventListener("click", function() {
        if (loggedInUser && loggedInUser.username === "admin1") {
            if (confirm("Are you sure you want to reset the chat?")) {
                chatHistory = [];
                localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
                chatMessages.innerHTML = ""; // Clear chat messages
            }
        } else {
            alert("Only admin can reset the chat.");
        }
    });

    // Send Chat Message
    sendChat.addEventListener("click", function() {
        const messageText = chatInput.value.trim();
        if (messageText !== "") {
            const message = {
                username: loggedInUser.username,
                text: messageText,
                timestamp: new Date().toLocaleString()
            };
            chatHistory.push(message);
            localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
            displayChatMessages();
            chatInput.value = "";
        }
    });

    // File Input Change
    fileInput.addEventListener("change", function(event) {
        const files = event.target.files;
        if (files.length > 0) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const message = {
                        username: loggedInUser.username,
                        text: `<a href="${e.target.result}" download="${file.name}">${file.name}</a>`,
                        timestamp: new Date().toLocaleString()
                    };
                    chatHistory.push(message);
                    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
                    displayChatMessages();
                };
                reader.readAsDataURL(file);
            });
        }
    });

    // Display chat messages
    function displayChatMessages() {
        chatMessages.innerHTML = chatHistory.map(message => `
            <p><strong>${message.username}:</strong> ${message.text} <small>${message.timestamp}</small></p>
        `).join("");
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Initialize like and dislike counts
    function initializeLikeCounts() {
        document.querySelectorAll(".like-count").forEach(span => {
            const articleId = span.getAttribute("data-article-id");
            updateLikeCounts(articleId);
        });
    }

    // Initialize
    displayNewsPosts();
    initializeLikeCounts();
    displayChatMessages();
});
