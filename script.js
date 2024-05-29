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
                <p>By ${post.author}</p>
                ${loggedInUser && loggedInUser.username === "admin1" ? `
                <button class="edit-btn" data-id="${post.id}">Edit</button>
                <button class="delete-btn" data-id="${post.id}">Delete</button>
                ` : ''}
            `;
            newsPosts.appendChild(article);
        });

        // Add event listeners to edit and delete buttons if admin
        if (loggedInUser && loggedInUser.username === "admin1") {
            const editButtons = document.querySelectorAll(".edit-btn");
            const deleteButtons = document.querySelectorAll(".delete-btn");

            editButtons.forEach(button => {
                button.addEventListener("click", handleEditPost);
            });

            deleteButtons.forEach(button => {
                button.addEventListener("click", handleDeletePost);
            });
        }
    }

    // Handle edit post
    function handleEditPost(event) {
        const postId = parseInt(event.target.getAttribute("data-id"));
        const post = news.find(post => post.id === postId);
        if (post) {
            const title = prompt("Edit title:", post.title);
            const content = prompt("Edit content:", post.content);
            if (title !== null && content !== null) {
                post.title = title;
                post.content = content;
                localStorage.setItem("news", JSON.stringify(news));
                renderNewsPosts();
            }
        }
    }

    // Handle delete post
    function handleDeletePost(event) {
        const postId = parseInt(event.target.getAttribute("data-id"));
        news = news.filter(post => post.id !== postId);
        localStorage.setItem("news", JSON.stringify(news));
        renderNewsPosts();
    }

    // Render chat messages
    function renderChatMessages() {
        chatMessages.innerHTML = "";
        chatHistory.forEach(message => {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("chat-message");
            messageDiv.textContent = `${message.author}: ${message.content}`;
            chatMessages.appendChild(messageDiv);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send chat message
    sendChat.addEventListener("click", function() {
        const message = chatInput.value.trim();
        if (message) {
            const newMessage = {
                author: loggedInUser.username,
                content: message
            };
            chatHistory.push(newMessage);
            localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
            chatInput.value = "";
            renderChatMessages();
            sendBotResponse(message);
        }
    });

    // AI Chatbot response (simulated)
    async function sendBotResponse(userMessage) {
        const botResponse = await fetchBotResponse(userMessage);

        const botMessage = {
            author: "Bot",
            content: botResponse
        };

        chatHistory.push(botMessage);
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
        renderChatMessages();
    }

    // Simulated bot response
    async function fetchBotResponse(userMessage) {
        // Simulate a call to an AI chatbot like GPT-4
        const responses = {
            hello: "Hi there! How can I assist you today?",
            help: "Sure, I'm here to help. What do you need assistance with?",
            news: "You can check the latest news in the News section.",
            events: "Upcoming events are listed in the Events section.",
            default: "I'm not sure how to respond to that. Can you please rephrase?"
        };

        const keywords = Object.keys(responses);
        let botResponse = responses.default;

        for (const keyword of keywords) {
            if (userMessage.toLowerCase().includes(keyword)) {
                botResponse = responses[keyword];
                break;
            }
        }

        // Simulate a delay for real-time feel
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(botResponse);
            }, 1000);
        });
    }

    // Poll for new chat messages
    function pollChatMessages() {
        setInterval(() => {
            chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
            renderChatMessages();
        }, 1000);
    }

    // Handle file upload button click
    document.getElementById("upload-file").addEventListener("click", function() {
        fileInput.click();
    });

    // Handle file input change
    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newMessage = {
                    author: loggedInUser.username,
                    content: `File uploaded: ${file.name}`,
                    fileUrl: e.target.result
                };
                chatHistory.push(newMessage);
                localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
                renderChatMessages();
            };
            reader.readAsDataURL(file);
        }
    });

    // Reset chat (only admin)
    resetChatBtn.addEventListener("click", function() {
        if (loggedInUser && loggedInUser.username === "admin1") {
            chatHistory = [];
            localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
            renderChatMessages();
        }
    });

    // Initial render
    renderNewsPosts();
    renderChatMessages();
    pollChatMessages();
});
