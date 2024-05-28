document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const registerSuccess = document.getElementById("register-success");
    const registerError = document.getElementById("register-error");
    const loginError = document.getElementById("login-error");
    const likeButtons = document.querySelectorAll(".like-btn");
    const dislikeButtons = document.querySelectorAll(".dislike-btn");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendChat = document.getElementById("send-chat");
    const newPostForm = document.getElementById("new-post-form");
    const newsPosts = document.getElementById("news-posts");

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
    likeButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (loggedInUser) {
                const articleId = this.getAttribute("data-article-id");
                if (!likes[articleId]) {
                    likes[articleId] = [];
                }
                if (!dislikes[articleId]) {
                    dislikes[articleId] = [];
                }
                if (!likes[articleId].includes(loggedInUser.username)) {
                    likes[articleId].push(loggedInUser.username);
                    if (dislikes[articleId].includes(loggedInUser.username)) {
                        dislikes[articleId] = dislikes[articleId].filter(username => username !== loggedInUser.username);
                    }
                    localStorage.setItem("likes", JSON.stringify(likes));
                    localStorage.setItem("dislikes", JSON.stringify(dislikes));
                    updateLikeCounts(articleId);
                } else {
                    likes[articleId] = likes[articleId].filter(username => username !== loggedInUser.username);
                    localStorage.setItem("likes", JSON.stringify(likes));
                    updateLikeCounts(articleId);
                }
            } else {
                alert("You need to be logged in to like this post.");
            }
        });
    });

    dislikeButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (loggedInUser) {
                const articleId = this.getAttribute("data-article-id");
                if (!dislikes[articleId]) {
                    dislikes[articleId] = [];
                }
                if (!likes[articleId]) {
                    likes[articleId] = [];
                }
                if (!dislikes[articleId].includes(loggedInUser.username)) {
                    dislikes[articleId].push(loggedInUser.username);
                    if (likes[articleId].includes(loggedInUser.username)) {
                        likes[articleId] = likes[articleId].filter(username => username !== loggedInUser.username);
                    }
                    localStorage.setItem("dislikes", JSON.stringify(dislikes));
                    localStorage.setItem("likes", JSON.stringify(likes));
                    updateLikeCounts(articleId);
                } else {
                    dislikes[articleId] = dislikes[articleId].filter(username => username !== loggedInUser.username);
                    localStorage.setItem("dislikes", JSON.stringify(dislikes));
                    updateLikeCounts(articleId);
                }
            } else {
                alert("You need to be logged in to dislike this post.");
            }
        });
    });

    // Update like and dislike counts
    function updateLikeCounts(articleId) {
        const likeButton = document.querySelector(`.like-btn[data-article-id="${articleId}"]`);
        const dislikeButton = document.querySelector(`.dislike-btn[data-article-id="${articleId}"]`);
        const likeCount = likeButton.querySelector(".like-count");
        const dislikeCount = dislikeButton.querySelector(".dislike-count");
        likeCount.textContent = likes[articleId] ? likes[articleId].length : 0;
        dislikeCount.textContent = dislikes[articleId] ? dislikes[articleId].length : 0;
    }

    // Initialize like and dislike counts
    function initializeLikeCounts() {
        likeButtons.forEach(button => {
            const articleId = button.getAttribute("data-article-id");
            updateLikeCounts(articleId);
        });
    }

    // Chat functionality
    function displayChatMessages() {
        chatMessages.innerHTML = chatHistory.map(message => `<p><strong>${message.username}:</strong> ${message.text}</p>`).join("");
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendChat.addEventListener("click", function() {
        if (loggedInUser) {
            const messageText = chatInput.value;
            if (messageText.trim()) {
                chatHistory.push({ username: loggedInUser.username, text: messageText });
                localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
                chatInput.value = "";
                displayChatMessages();
            } else {
                alert("Message cannot be empty.");
            }
        } else {
            alert("You need to be logged in to send a message.");
        }
    });

    // Periodically update chat messages
    setInterval(function() {
        chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        displayChatMessages();
    }, 10000); // Update every 10 seconds

    // Admin post creation
    newPostForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("post-title").value;
        const content = document.getElementById("post-content").value;

        if (loggedInUser && loggedInUser.username === "admin1") {
            const newPost = {
                id: Date.now(),
                title: title,
                content: content,
                likes: 0,
                dislikes: 0
            };
            news.push(newPost);
            localStorage.setItem("news", JSON.stringify(news));
            displayNewsPosts();
            newPostForm.reset();
        } else {
            alert("Only the admin can create new posts.");
        }
    });

    function displayNewsPosts() {
        newsPosts.innerHTML = news.map(post => `
            <article class="news-item" data-article-id="${post.id}">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <button class="like-btn" data-article-id="${post.id}">👍 <span class="like-count">${post.likes}</span></button>
                <button class="dislike-btn" data-article-id="${post.id}">👎 <span class="dislike-count">${post.dislikes}</span></button>
            </article>
        `).join("");

        // Re-add event listeners to new like and dislike buttons
        document.querySelectorAll(".like-btn").forEach(button => {
            button.addEventListener("click", function() {
                const articleId = this.getAttribute("data-article-id");
                if (loggedInUser) {
                    if (!likes[articleId]) {
                        likes[articleId] = [];
                    }
                    if (!dislikes[articleId]) {
                        dislikes[articleId] = [];
                    }
                    if (!likes[articleId].includes(loggedInUser.username)) {
                        likes[articleId].push(loggedInUser.username);
                        if (dislikes[articleId].includes(loggedInUser.username)) {
                            dislikes[articleId] = dislikes[articleId].filter(username => username !== loggedInUser.username);
                        }
                        localStorage.setItem("likes", JSON.stringify(likes));
                        localStorage.setItem("dislikes", JSON.stringify(dislikes));
                        updateLikeCounts(articleId);
                    } else {
                        likes[articleId] = likes[articleId].filter(username => username !== loggedInUser.username);
                        localStorage.setItem("likes", JSON.stringify(likes));
                        updateLikeCounts(articleId);
                    }
                } else {
                    alert("You need to be logged in to like this post.");
                }
            });
        });

        document.querySelectorAll(".dislike-btn").forEach(button => {
            button.addEventListener("click", function() {
                const articleId = this.getAttribute("data-article-id");
                if (loggedInUser) {
                    if (!dislikes[articleId]) {
                        dislikes[articleId] = [];
                    }
                    if (!likes[articleId]) {
                        likes[articleId] = [];
                    }
                    if (!dislikes[articleId].includes(loggedInUser.username)) {
                        dislikes[articleId].push(loggedInUser.username);
                        if (likes[articleId].includes(loggedInUser.username)) {
                            likes[articleId] = likes[articleId].filter(username => username !== loggedInUser.username);
                        }
                        localStorage.setItem("dislikes", JSON.stringify(dislikes));
                        localStorage.setItem("likes", JSON.stringify(likes));
                        updateLikeCounts(articleId);
                    } else {
                        dislikes[articleId] = dislikes[articleId].filter(username => username !== loggedInUser.username);
                        localStorage.setItem("dislikes", JSON.stringify(dislikes));
                        updateLikeCounts(articleId);
                    }
                } else {
                    alert("You need to be logged in to dislike this post.");
                }
            });
        });
    }

    displayNewsPosts();
    initializeLikeCounts();
    displayChatMessages();
});
