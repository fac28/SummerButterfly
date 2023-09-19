const express = require("express");

const server = express();

const staticHandler = express.static("public");

server.use(staticHandler);
function sanitize(string) {
  return string.replace(/</g, "&lt;");
}

let postIdCounter = 1;
const posts = [];

server.get("/", (req, res) => {
  const list = posts.map((post) => {
    return `<div><li>
    <p>
    ${post.post} 
    </p>
    </li>
    <form action="/edit" method="post" class="edit-form">
      <input type="hidden" name="postIndex" value="${posts.indexOf(post)}">
      <button type="submit" class="edit-button">Edit</button>
    </form>
    <form action="/delete" method="post" class="delete-form">
      <input type="hidden" name="postIndex" value="${posts.indexOf(post)}">
      <button type="submit" class="delete-button">Delete</button>
    </form>
    <span>${post.name}</span>
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

            <form  method="POST"  action="/del">
              <button>Delete Last</button>
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
  const name = sanitize(req.body.name);
  const post = sanitize(req.body.post);
  posts.push({ name, post });
  res.redirect("/");
});

// The following code is being worked on for Validaltion:
// server.post("/", express.urlencoded({ extended: false }), (req, res) => {
//   const name = sanitize(req.body.name);
//   const post = sanitize(req.body.post);
//   const errors = {};
//   if (!name) {
//     errors.name = "Please enter your username";
//   }
//   if (!post) {
//     errors.post = "Please enter a post";
//   }
//   if (Object.keys(errors).length) {
//     const body = home(posts, errors, req.body);
//     res.status(400).send(body);
//   } else {
//     posts.push({ name, post });
//     res.redirect("/");
//   }
// });

server.post("/del", express.urlencoded({ extended: false }), (req, res) => {
  posts.pop();
  res.redirect("/");
});

server.post("/delete", express.urlencoded({ extended: false }), (req, res) => {
  const postIndex = parseInt(req.body.postIndex, 10); // Parse the index as an integer
  if (!isNaN(postIndex) && postIndex >= 0 && postIndex < posts.length) {
    // Check if the index is valid
    posts.splice(postIndex, 1); // Remove the post at the specified index
  }
  res.redirect("/");
});

module.exports = server;
