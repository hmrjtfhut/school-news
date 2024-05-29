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
    const newsPostsContainer = document.getElementById("news-posts");
    const editPostModal = document.getElementById("edit-post-modal");
    const modalCloseBtn = editPostModal.querySelector(".close");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    let news = JSON.parse(localStorage.getItem("news")) || [];

    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove("active");
        });
        document.querySelector(sectionId).classList.add("active");
    }

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

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("register-username").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

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

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        const validUser = users.find(user => user.username === username && user.password === password);

        if (validUser) {
            loginError.style.display = "none";
            loggedInUser = validUser;
            localStorage.setItem("loggedInUser", JSON.stringify(validUser));
            alert("Login successful!");
            showSection("#home");
        } else {
            loginError.style.display = "block";
        }
    });

    function renderNewsPosts() {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        newsPostsContainer.innerHTML = "";

        posts.forEach((post, index) => {
            const postElement = document.createElement("article");
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                ${loggedInUser && loggedInUser.username === "admin1" ? `
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
                ` : ''}
            `;
            newsPostsContainer.appendChild(postElement);
        });

        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", handleEditPost);
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", handleDeletePost);
        });
    }

    function handleEditPost(event) {
        const index = event.target.getAttribute("data-index");
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        const post = posts[index];

        document.getElementById("edit-post-title").value = post.title;
        document.getElementById("edit-post-content").value = post.content;

        editPostModal.style.display = "block";

        const editPostForm = document.getElementById("edit-post-form");
        editPostForm.onsubmit = function(event) {
            event.preventDefault();

            post.title = document.getElementById("edit-post-title").value;
            post.content = document.getElementById("edit-post-content").value;
            posts[index] = post;
            localStorage.setItem("posts", JSON.stringify(posts));

            editPostModal.style.display = "none";
            renderNewsPosts();
        };
    }

    function handleDeletePost(event) {
        const index = event.target.getAttribute("data-index");
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        renderNewsPosts();
    }

    newPostForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("post-title").value;
        const content = document.getElementById("post-content").value;

        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.push({ title, content });
        localStorage.setItem("posts", JSON.stringify(posts));

        newPostForm.reset();
        renderNewsPosts();
    });

    function renderChatMessages() {
        chatMessages.innerHTML = "";
        chatHistory.forEach(message => {
            const messageElement = document.createElement("div");
            messageElement.classList.add("message");
            messageElement.innerHTML = `<b>${message.username}:</b> ${message.content}`;
            chatMessages.appendChild(messageElement);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendChat.addEventListener("click", function() {
        const message = chatInput.value.trim();
        if (message === "") return;

        chatHistory.push({ username: loggedInUser.username, content: message });
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
        chatInput.value = "";

        renderChatMessages();
    });

    chatInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendChat.click();
        }
    });

    renderNewsPosts();
    renderChatMessages();

    modalCloseBtn.addEventListener("click", function() {
        editPostModal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === editPostModal) {
            editPostModal.style.display = "none";
        }
    });

    setInterval(renderChatMessages, 100);
});
