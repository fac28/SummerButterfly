const express = require("express");
const { getListTemplate, layout, htmlNormal, htmlPosts } = require("./templates.js");

const server = express();

const staticHandler = express.static("public");

server.use(staticHandler);
function sanitize(string) {
  return string.replace(/</g, "&lt;");
}


const posts = [];

server.get("/", (req, res) => {

  const list = posts.map((post) => {
    //validation must happen here with
    //post.name
    //post.post
    if (post.name.length != 0 && post.post.length != 0) {
      return getListTemplate(posts, post);
    }
  });

  const html = layout(htmlNormal(list));
  res.send(html);
});

server.post("/", express.urlencoded({ extended: false }), (req, res) => {
  const name = sanitize(req.body.name);
  const post = sanitize(req.body.post);
  posts.push({ name, post });
  res.redirect("/");
});






server.get("/posts", (req, res) => {
  const list = posts.map((post) => {
    if (post.name.length != 0 && post.post.length != 0) {
      return getListTemplate(posts, post);
    }
  });

  const html = layout(htmlPosts(list));
  res.send(html);
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

// server.post("/delete-last", express.urlencoded({ extended: false }), (req, res) => {
//   posts.pop();
//   res.redirect("/");
// });

server.post("/delete-selected", express.urlencoded({ extended: false }), (req, res) => {
  const postIndex = parseInt(req.body.postIndex, 10); // Parse the index as an integer
  if (!isNaN(postIndex) && postIndex >= 0 && postIndex < posts.length) {
    // Check if the index is valid
    posts.splice(postIndex, 1); // Remove the post at the specified index
  }
  res.redirect("/");
});
//hi from Shaughn
module.exports = server;
// hi from Shaughn