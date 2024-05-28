document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

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

    // Simulated login functionality
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "password") {
            alert("Login successful!");
            showSection("#home");
        } else {
            loginError.style.display = "block";
        }
    });
});
