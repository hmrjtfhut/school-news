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
    const fileInput = document.getElementById("file-input");
    const resetChatBtn = document.getElementById("reset-chat-btn");

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

    // Handle new post creation
    newPostForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("post-title").value;
        const content = document.getElementById("post-content").value;

        const newPost = {
            id: Date.now(),
            title,
            content,
            author: loggedInUser.username
        };

        news.push(newPost);
        localStorage.setItem("news", JSON.stringify(news));
        renderNewsPosts();
        newPostForm.reset();
    });

    // Render news posts
    function renderNewsPosts() {
        newsPosts.innerHTML = "";
        news.forEach(post => {
            const article = document.createElement("article");
            article.classList.add("news-item");
            article.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <p>By: ${post.author}</p>
                ${loggedInUser && loggedInUser.username === post.author ? `
                <button class="edit-btn" data-id="${post.id}">Edit</button>
                <button class="delete-btn" data-id="${post.id}">Delete</button>
                ` : ""}
            `;
            newsPosts.appendChild(article);
        });

        // Add event listeners to edit and delete buttons
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", handleEditPost);
        });
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", handleDeletePost);
        });
    }

    // Handle post edit
    function handleEditPost(event) {
        const postId = event.target.getAttribute("data-id");
        const post = news.find(p => p.id === parseInt(postId));
        if (post) {
            document.getElementById("edit-post-title").value = post.title;
            document.getElementById("edit-post-content").value = post.content;
            document.getElementById("edit-post-modal").style.display = "block";
            document.getElementById("edit-post-form").onsubmit = function(e) {
                e.preventDefault();
                post.title = document.getElementById("edit-post-title").value;
                post.content = document.getElementById("edit-post-content").value;
                localStorage.setItem("news", JSON.stringify(news));
                renderNewsPosts();
                document.getElementById("edit-post-modal").style.display = "none";
            };
        }
    }

    // Handle post delete
    function handleDeletePost(event) {
        const postId = event.target.getAttribute("data-id");
        news = news.filter(p => p.id !== parseInt(postId));
        localStorage.setItem("news", JSON.stringify(news));
        renderNewsPosts();
    }

    // Chat functionality
    sendChat.addEventListener("click", function() {
        const message = chatInput.value.trim();
        if (message) {
            chatHistory.push({ username: loggedInUser.username, message });
            localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
            renderChatMessages();
            chatInput.value = "";
        }
    });

    // Render chat messages
    function renderChatMessages() {
        chatMessages.innerHTML = "";
        chatHistory.forEach(chat => {
            const chatMessage = document.createElement("div");
            chatMessage.innerHTML = `<strong>${chat.username}:</strong> ${chat.message}`;
            chatMessages.appendChild(chatMessage);
        });
    }

    // Handle file upload
    document.getElementById("upload-file").addEventListener("click", function() {
        fileInput.click();
    });

    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const fileUrl = e.target.result;
                if (file.type.startsWith("image/")) {
                    chatHistory.push({ username: loggedInUser.username, message: `<img src="${fileUrl}" alt="uploaded image" style="max-width: 100%;">` });
                } else if (file.type === "audio/mpeg") {
                    chatHistory.push({ username: loggedInUser.username, message: `<audio controls><source src="${fileUrl}" type="audio/mpeg"></audio>` });
                }
                localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
                renderChatMessages();
            };
            reader.readAsDataURL(file);
        }
    });

    // Reset chat history
    resetChatBtn.addEventListener("click", function() {
        chatHistory = [];
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
        renderChatMessages();
    });

    // Modal functionality
    const modal = document.getElementById("edit-post-modal");
    const closeModal = document.getElementsByClassName("close")[0];

    closeModal.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Initialize app
    renderNewsPosts();
    renderChatMessages();
    showSection("#home");
});
