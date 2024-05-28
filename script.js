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
});
