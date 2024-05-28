document.addEventListener("DOMContentLoaded", function() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const news = JSON.parse(localStorage.getItem("news")) || [];
    const newsPosts = document.getElementById("news-posts");
    const editPostModal = document.getElementById("edit-post-modal");
    const editPostForm = document.getElementById("edit-post-form");
    const editPostTitle = document.getElementById("edit-post-title");
    const editPostContent = document.getElementById("edit-post-content");

    function displayNewsPosts() {
        newsPosts.innerHTML = news.map(post => `
            <article class="news-item" data-article-id="${post.id}">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <button class="like-btn" data-article-id="${post.id}">👍 <span class="like-count">${post.likes}</span></button>
                <button class="dislike-btn" data-article-id="${post.id}">👎 <span class="dislike-count">${post.dislikes}</span></button>
                ${loggedInUser && loggedInUser.username === "admin1" ? `
                    <button class="edit-btn" data-article-id="${post.id}">Edit</button>
                    <button class="delete-btn" data-article-id="${post.id}">Delete</button>
                ` : ""}
            </article>
        `).join("");

        // Re-add event listeners to new like and dislike buttons
        document.querySelectorAll(".like-btn").forEach(button => {
            button.addEventListener("click", function() {
                // Like functionality
            });
        });

        document.querySelectorAll(".dislike-btn").forEach(button => {
            button.addEventListener("click", function() {
                // Dislike functionality
            });
        });

        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", function() {
                const postId = this.getAttribute("data-article-id");
                const post = news.find(post => post.id == postId);
                editPostTitle.value = post.title;
                editPostContent.value = post.content;
                editPostModal.style.display = "block";

                editPostForm.addEventListener("submit", function(event) {
                    event.preventDefault();
                    post.title = editPostTitle.value;
                    post.content = editPostContent.value;
                    localStorage.setItem("news", JSON.stringify(news));
                    displayNewsPosts();
                    editPostModal.style.display = "none";
                });
            });
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function() {
                const postId = this.getAttribute("data-article-id");
                const index = news.findIndex(post => post.id == postId);
                news.splice(index, 1);
                localStorage.setItem("news", JSON.stringify(news));
                displayNewsPosts();
            });
        });
    }

    displayNewsPosts();

    // Modal close button
    const closeModal = document.querySelector(".close");
    closeModal.addEventListener("click", function() {
        editPostModal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", function(event) {
        if (event.target === editPostModal) {
            editPostModal.style.display = "none";
        }
    });

    // Add new post form submission
    const newPostForm = document.getElementById("new-post-form");
    newPostForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("post-title").value;
        const content = document.getElementById("post-content").value;
        const newPost = {
            id: Date.now(),
            title: title,
            content: content,
            likes: 0,
            dislikes: 0
        };
        news.unshift(newPost); // Add new post to the beginning of the array
        localStorage.setItem("news", JSON.stringify(news));
        displayNewsPosts();
        newPostForm.reset();
    });
});
