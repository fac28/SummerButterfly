const express = require("express");

const server = express();

const staticHandler = express.static("public");

server.use(staticHandler);

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

server.post("/", express.urlencoded({ extended: false }), (req, res) => {
  const name = req.body.name;
  const post = req.body.post;
  posts.push({ name, post });
  res.redirect("/");
});

module.exports = server;
