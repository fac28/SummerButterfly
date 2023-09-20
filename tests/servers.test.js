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

test("home route responds to POST requests", async () => {
  const app = server.listen(8080);
  const response = await fetch("http://localhost:8080", {
    method: "POST",
    body: "name=summerButterfly",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
  app.close();

  // assert.equal(response.status, 302);
  const body = await response.text();
  assert.match(body, /summerButterfly/);

  // Check if res.redirect has been called with the correct argument
  // expect(response.redirect).toHaveBeenCalledWith("/");
});
