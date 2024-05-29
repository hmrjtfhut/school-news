document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendChat = document.getElementById("send-chat");
    const newPostForm = document.getElementById("new-post-form");
    const newsPostsContainer = document.getElementById("news-posts");
    const editPostModal = document.getElementById("edit-post-modal");
    const modalCloseBtn = editPostModal.querySelector(".close");

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    let news = JSON.parse(localStorage.getItem("news")) || [];

    const users = [
        { username: "admin1", password: "lol" },
        { username: "user1", password: "12345678" },
        { username: "user2", password: "12345678" },
        { username: "user3", password: "12345678" },
        { username: "user4", password: "12345678" },
        { username: "user5", password: "12345678" },
        { username: "user6", password: "12345678" },
        { username: "user7", password: "12345678" },
        { username: "user8", password: "12345678" },
        { username: "user9", password: "12345678" },
        { username: "user10", password: "12345678" }
    ];

    function switchSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove("active");
            if (section.id === sectionId) {
                section.classList.add("active");
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetSection = link.getAttribute("href").substring(1);
            switchSection(targetSection);
        });
    });

    if (loggedInUser) {
        if (loggedInUser.username === "admin1") {
            newPostForm.style.display = "block";
        }
    } else {
        switchSection("login");
    }

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            loggedInUser = user;
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            switchSection("home");
            if (user.username === "admin1") {
                newPostForm.style.display = "block";
            }
        } else {
            loginError.style.display = "block";
        }
    });

    function renderNewsPosts() {
        newsPostsContainer.innerHTML = "";
        news.forEach((post, index) => {
            const postElement = document.createElement("article");
            postElement.classList.add("news-item");
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <button class="like">👍 ${post.likes || 0}</button>
                <button class="dislike">👎 ${post.dislikes || 0}</button>
            `;

            const likeBtn = postElement.querySelector(".like");
            const dislikeBtn = postElement.querySelector(".dislike");

            likeBtn.addEventListener("click", function() {
                post.likes = (post.likes || 0) + 1;
                localStorage.setItem("news", JSON.stringify(news));
                renderNewsPosts();
            });

            dislikeBtn.addEventListener("click", function() {
                post.dislikes = (post.dislikes || 0) + 1;
                localStorage.setItem("news", JSON.stringify(news));
                renderNewsPosts();
            });

            if (loggedInUser && loggedInUser.username === "admin1") {
                const editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.addEventListener("click", function() {
                    openEditModal(index);
                });

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.addEventListener("click", function() {
                    deletePost(index);
                });

                postElement.appendChild(editBtn);
                postElement.appendChild(deleteBtn);
            }

            newsPostsContainer.appendChild(postElement);
        });
    }

    function openEditModal(index) {
        const post = news[index];
        document.getElementById("edit-post-title").value = post.title;
        document.getElementById("edit-post-content").value = post.content;
        document.getElementById("edit-post-form").onsubmit = function(event) {
            event.preventDefault();
            editPost(index);
        };
        editPostModal.style.display = "block";
    }

    function editPost(index) {
        const title = document.getElementById("edit-post-title").value;
        const content = document.getElementById("edit-post-content").value;
        news[index] = { ...news[index], title, content };
        localStorage.setItem("news", JSON.stringify(news));
        editPostModal.style.display = "none";
        renderNewsPosts();
    }

    function deletePost(index) {
        news.splice(index, 1);
        localStorage.setItem("news", JSON.stringify(news));
        renderNewsPosts();
    }

    newPostForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("post-title").value;
        const content = document.getElementById("post-content").value;

        news.push({ title, content, likes: 0, dislikes: 0 });
        localStorage.setItem("news", JSON.stringify(news));

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

    setInterval(renderChatMessages, 1000);
});
