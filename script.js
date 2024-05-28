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
            registerSuccess.style.display =
