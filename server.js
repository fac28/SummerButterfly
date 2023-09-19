const express = require("express");

const server = express();

function sanitize(string) {
  return string.replace(/</g, "&lt;");
}
const posts = [];

server.get("/", (req, res) => {
  const list = posts.map((posts) => {
    return `<li>
    <div style="border-style:solid; border-width:0.5px">
      <span>${posts.name}</span>
      <p>${posts.post}</p> 
      <button>Edit</button>
      <button>Delete</button>
    </div>
    </li>`;
  });

  const html = `
    <!doctype html>
      <head>
        <title>SummerButterfly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
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
            <ul style="list-style-type:none">
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

module.exports = server;
