document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");
    const registerForm = document.getElementById("register-form");
    const registerSuccess = document.getElementById("register-success");
    const likeButtons = document.querySelectorAll(".like-btn");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loggedInUser = null;

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
            alert("Login successful!");
            showSection("#home");
        } else {
            loginError.style.display = "block";
        }
    });

    // Like functionality
    likeButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (loggedInUser) {
                const likeCount = this.querySelector(".like-count");
                let count = parseInt(likeCount.textContent);
                likeCount.textContent = count + 1;
            } else {
                alert("You need to be logged in to like this post.");
            }
        });
    });
});
