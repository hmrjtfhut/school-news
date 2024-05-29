<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WLS School News</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>WLS School News</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#news">News</a></li>
                <li><a href="#events">Events</a></li>
                <li><a href="#chat">Chat Room</a></li>
                <li class="right"><a href="#login">Login</a></li>
                <li class="right"><a href="#register">Register</a></li>
            </ul>
        </nav>
    </header>

    <section id="home" class="active">
        <h2>Welcome to WLS School News</h2>
        <p>This is the home page.</p>
    </section>

    <section id="news">
        <h2>News</h2>
        <form id="new-post-form" style="display: none;">
            <label for="post-title">Title:</label>
            <input type="text" id="post-title" required>
            <label for="post-content">Content:</label>
            <textarea id="post-content" required></textarea>
            <button type="submit">Create Post</button>
        </form>
        <div id="news-posts">
            <!-- News posts will be appended here -->
        </div>
    </section>

    <section id="events">
        <h2>Events</h2>
        <article class="event-item">
            <h3>Event 1</h3>
            <p>This is the first event.</p>
        </article>
        <article class="event-item">
            <h3>Event 2</h3>
            <p>This is the second event.</p>
        </article>
    </section>

    <section id="chat">
        <h2>Chat Room</h2>
        <div id="chat-messages"></div>
        <input type="text" id="chat-input" placeholder="Type a message...">
        <input type="file" id="file-input" style="display: none;">
        <button id="send-chat">Send</button>
        <button id="upload-file">Upload File</button>
        <button id="reset-chat-btn">Reset Chat</button>
    </section>

    <section id="login">
        <h2>Login</h2>
        <form id="login-form">
            <label for="login-username">Username:</label>
            <input type="text" id="login-username" required>
            <label for="login-password">Password:</label>
            <input type="password" id="login-password" required>
            <button type="submit">Login</button>
        </form>
        <p id="login-error" style="display: none; color: red;">Invalid username or password.</p>
    </section>

    <section id="register">
        <h2>Register</h2>
        <form id="register-form">
            <label for="register-username">Username:</label>
            <input type="text" id="register-username" required>
            <label for="register-email">Email:</label>
            <input type="email" id="register-email" required>
            <label for="register-password">Password:</label>
            <input type="password" id="register-password" required>
            <button type="submit">Register</button>
        </form>
        <p id="register-success" style="display: none; color: green;">Registration successful!</p>
        <p id="register-error" style="display: none; color: red;">Email already in use.</p>
    </section>

    <!-- Edit Post Modal -->
    <div id="edit-post-modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Edit Post</h2>
            <form id="edit-post-form">
                <label for="edit-post-title">Title:</label>
                <input type="text" id="edit-post-title" required>
                <label for="edit-post-content">Content:</label>
                <textarea id="edit-post-content" required></textarea>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
