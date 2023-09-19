function home(posts, errors = {}, values = {}) {
    const title = "All posts";
    const html = /*html*/ `
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
    return layout(title, content);
}

function postItem(post) {
    const date = new Date(post.created);
    const prettyDate = date.toLocaleString("en-GB");
    return `
      <li>
        <p>${sanitize(post.message)}</p>
        <p>—${sanitize(post.nickname)} | ${prettyDate}</p>
      </li>
    `;
}

function layout(title, content) {
    return /*html*/ `
      <!doctype html>
      <html>
        <head>
          <title>${title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;
}

module.exports = { home };
