document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");
    const registerForm = document.getElementById("register-form");
    const registerSuccess = document.getElementById("register-success");
    const likeButtons = document.querySelectorAll(".like-btn");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let likes = JSON.parse(localStorage.getItem("likes")) || {};

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

    // Show home section by default
    showSection("#home");

    // Registration functionality
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("register-username").value;
        const password = document.getElementById("register-password").value;

        const userExists = users.some(user => user.username === username);
        if (!userExists) {
            users.push({ username, password });
            localStorage.setItem("users", JSON.stringify(users));
            registerSuccess.style.display = "block";
        } else {
            alert("Username already exists. Please choose a different username.");
        }
    });

    // Login functionality
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
                if (!likes[articleId].includes(loggedInUser.username)) {
                    likes[articleId].push(loggedInUser.username);
                    localStorage.setItem("likes", JSON.stringify(likes));
                    const likeCount = this.querySelector(".like-count");
                    let count = parseInt(likeCount.textContent);
                    likeCount.textContent = count + 1;
                } else {
                    alert("You have already liked this post.");
                }
            } else {
                alert("You need to be logged in to like this post.");
            }
        });
    });

    // Initialize like counts
    function initializeLikeCounts() {
        likeButtons.forEach(button => {
            const articleId = button.getAttribute("data-article-id");
            const likeCount = button.querySelector(".like-count");
            likeCount.textContent = (likes[articleId] && likes[articleId].length) || 0;
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
