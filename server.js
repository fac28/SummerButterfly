const express = require("express");

const server = express();


const posts = [];

server.get("/", (req, res) => {
  const list = posts.map((posts) => {
    return `<li>${posts.name} | ${posts.post} </li>`;
  });
  const html = `
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
    <ul>
      ${list.join("")}
    </ul>
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
