<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WLS News</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>WLS News</h1>
        <nav>
            <ul>
                <li><a href="#posts" class="tab-link" data-tab="posts">Posts</a></li>
                <li><a href="#info" class="tab-link" data-tab="info">Info</a></li>
                <li><a href="#about" class="tab-link" data-tab="about">About</a></li>
                <li><a href="#games" class="tab-link" data-tab="games">Games</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section id="posts" class="tab-content active">
            <h2>Latest Posts</h2>
            <article>
                <h3>School Sports Day</h3>
                <p>Our annual sports day will be held on June 15th. All students are encouraged to participate.</p>
            </article>
            <article>
                <h3>Science Fair</h3>
                <p>The science fair will take place on June 22nd. Students can showcase their science projects.</p>
            </article>
            <article>
                <h3>Summer Vacation</h3>
                <p>Summer vacation starts on July 1st. School will resume on August 15th.</p>
            </article>
        </section>
        <section id="info" class="tab-content">
            <h2>Information</h2>
            <p>All the important information regarding our school and events can be found here.</p>
        </section>
        <section id="about" class="tab-content">
            <h2>About WLS News</h2>
            <p>WLS News is dedicated to bringing you the latest and most important news from our school.</p>
        </section>
        <section id="games" class="tab-content">
            <h2>Games</h2>
            <ul>
                <li><a href="#" onclick="openGame('https://artclass.site/service/hvtrs8%2F-aqsgtq.1kj0%2Cngt-224%3A%2Fknfez.jtol')">2048</a></li>
                <li><a href="#" onclick="openGame('https://artclass.site/service/hvtrs8%2F-aqsgtq.1kj0%2Cngt-a%2Fdcnae%2Fod-dipe%2Fald%2Fiae-ildgx%2Chvmn')">A Dance Of Fire And Ice</a></li>
            </ul>
            <iframe id="game-frame" style="width: 100%; height: 600px; border: none; display: none;"></iframe>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 WLS News. All rights reserved.</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
