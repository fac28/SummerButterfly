const test = require("node:test");
const assert = require("node:assert");
const server = require("../server");

test("home route returns expected page", async () => {
  const app = server.listen(8080);
  const response = await fetch("http://localhost:8080");
  app.close();

  assert.equal(response.status, 200);
  const body = await response.text();

  assert.match(body, /Show Posts Only/);
});

test("posts route returns posts page", async () => {
  const app = server.listen(8080);
  const response = await fetch("http://localhost:8080/posts");
  app.close();

  assert.equal(response.status, 200);
  const body = await response.text();
  assert.match(body, /Make New Post/);
});
