const express = require("express");

const server = express();

const staticHandler = express.static("public");

server.use(staticHandler);
function sanitize(string) {
  return string.replace(/</g, "&lt;");
}
const posts = [];

server.get("/", (req, res) => {
  const list = posts.map((posts) => {
    return `<div><li>
    <p>
    ${posts.post} 
    </p>
    </li>
    <button>Edit</button>
    <button>Delete</button>
    <span>${posts.name}</span>
    </div>`;
  });

  const html = `
    <!doctype html>
      <head>
        <title>SummerButterfly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/style.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Inter:wght@300&family=Montserrat&family=Pacifico&family=Roboto&display=swap" rel="stylesheet">
        </head>

      <body>

        <header>
          <h1>Summer Butterfly</h1>
        </header>

        <main>
          <section id="section-form">
            <form method="POST">
            <p>
              <label for="name">Username</label>
              <input name="name">
            </p>
            <p>
              <label for="post">Post</label>
              <textarea name="post"  rows = '5' cols = '33'></textarea>
            </p>
            <button>Post</button>
            </form>
          </section>  

          <section id="section-posts">
            <ul>
              ${list.join("")}
            </ul>
          </section>  
        </main>

        <footer>

        </footer>
      </body>
    </html>
    `;
  res.send(html);
});

// server.post("/", express.urlencoded({ extended: false }), (req, res) => {
//   const name = sanitize(req.body.name);
//   const post = sanitize(req.body.post);
//   posts.push({ name, post });
//   res.redirect("/");
// });

server.post("/", express.urlencoded({ extended: false }), (req, res) => {
  const nickname = req.body.nickname;
  const message = req.body.message;
  const errors = {};
  if (!nickname) {
    errors.nickname = "Please enter your nickname";
  }
  if (!message) {
    errors.message = "Please enter a message";
  }
  if (Object.keys(errors).length) {
    const body = home(posts, errors, req.body);
    res.status(400).send(body);
  } else {
    const created = Date.now();
    posts.push({ nickname, message, created });
    res.redirect("/");
  }
});

module.exports = server;
