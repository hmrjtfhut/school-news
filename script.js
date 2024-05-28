document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");
    const registerForm = document.getElementById("register-form");
    const registerSuccess = document.getElementById("register-success");
    const likeButtons = document.querySelectorAll(".like-btn");
    const dislikeButtons = document.querySelectorAll(".dislike-btn");
    const viewLikesButtons = document.querySelectorAll(".view-likes");
    const viewDislikesButtons = document.querySelectorAll(".view-dislikes");
    const commentButtons = document.querySelectorAll(".comment-btn");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let likes = JSON.parse(localStorage.getItem("likes")) || {};
    let dislikes = JSON.parse(localStorage.getItem("dislikes")) || {};

    // Function to hide all sections
    function hideAllSections() {
        sections.forEach(section => {
            section.classList.remove("active");
        });
    }

    // Function to show a section
    function showSection(sectionId) {
        hideAllSections();
        document.querySelector(sectionId).classList.add("active");
    }

    // Add event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute("href");
            showSection(sectionId);
        });
    });

    // Register form submit event
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("register-username").value;
        const password = document.getElementById("register-password").value;

        if (users.some(user => user.username === username)) {
            alert("Username already taken.");
        } else {
            users.push({ username, password });
            localStorage.setItem("users", JSON.stringify(users));
            registerSuccess.style.display = "block";
        }
    });

    // Login form submit event
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            loggedInUser = user;
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            alert("Login successful!");
            showSection("#home");
        } else {
            loginError.style.display = "block";
        }
    });

    // Logout functionality
    function logout() {
        loggedInUser = null;
        localStorage.removeItem("loggedInUser");
        alert("Logged out successfully!");
        showSection("#login");
    }

    // Like functionality
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

    // Dislike functionality
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

    // View likes functionality
    viewLikesButtons.forEach(button => {
        button.addEventListener("click", function() {
            const articleId = this.getAttribute("data-article-id");
            const likeList = document.querySelector(`.like-list[data-article-id="${articleId}"]`);
            if (likeList.style.display === "none" || likeList.style.display === "") {
                likeList.innerHTML = likes[articleId].join(", ");
                likeList.style.display = "block";
            } else {
                likeList.style.display = "none";
            }
        });
    });

    // View dislikes functionality
    viewDislikesButtons.forEach(button => {
        button.addEventListener("click", function() {
            const articleId = this.getAttribute("data-article-id");
            const dislikeList = document.querySelector(`.dislike-list[data-article-id="${articleId}"]`);
            if (dislikeList.style.display === "none" || dislikeList.style.display === "") {
                dislikeList.innerHTML = dislikes[articleId].join(", ");
                dislikeList.style.display = "block";
            } else {
                dislikeList.style.display = "none";
            }
        });
    });

    // Comment button functionality
    commentButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (loggedInUser) {
                const comment = prompt("Enter your comment:");
                if (comment) {
                    alert("Comment submitted!");
                }
            } else {
                alert("You need to be logged in to comment.");
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

    // Initialize the app
    function initialize() {
        if (loggedInUser) {
            alert(`Welcome back, ${loggedInUser.username}!`);
            showSection("#home");
        } else {
            showSection("#login");
        }
        initializeLikeCounts();
    }

    initialize();
});
