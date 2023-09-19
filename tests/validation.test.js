const test = require("node:test");
const assert = require("node:assert");
const { request } = require("./helpers.js");

test("POST without username re-renders page with error", async () => {
  const { status, body } = await request("/", {
    method: "POST",
    body: "name=&post=hello",
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
  assert.equal(status, 400);
  assert.match(body, /<form/i, "Page should include the form");
  assert.match(
    body,
    /please enter your Username/i,
    `Expected HTML to include "please enter your Username", but received:\n${body}`
  );
});
