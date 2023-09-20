function getListTemplate(posts, post) {
    return `<div class="the-post-div">
<span>${post.name}</span>
<li>
<p>
${post.post} 
</p>
<div class="the-post__the-buttons">
  <form action="/edit" method="post" class="edit-form">
    <input type="hidden" name="postIndex" value="${posts.indexOf(post)}">
    <button type="submit" class="edit-button">Edit</button>
  </form>
  <form action="/delete-selected" method="post" class="delete-selected-form">
    <input type="hidden" name="postIndex" value="${posts.indexOf(post)}">
    <button type="submit" class="delete-selected-button">Delete</button>
  </form>
</div>
</li>
</div>`}

function layout(htmlContent) {
    return /*html*/ `
    <!doctype html>
    <head>
        <title>SummerButterfly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/style.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Inter:wght@300&family=Montserrat&family=Pacifico&family=Roboto&display=swap" rel="stylesheet">
        <link rel="icon" type="image/png" href="public/favicon.png">
    </head>
  
    <body>
    <header>
        <h1>Summer Butterfly</h1>
    </header>

    <main>
        ${htmlContent}
    </main>

    <footer>
        <a href="https://www.flaticon.com/free-icons/easter" title="easter icons">Easter icons created by amoghdesign - Flaticon</a>
    </footer>
        </body>
    </html>
    `;
}

function htmlNormal(list) {
    return `
      <section class="section-input-form">
        <form method="POST">
        <p>
          <label for="name">Username</label>
          <input name="name">
        </p>
        <p>
          <label for="post">Post</label>
          <textarea name="post"  rows = '5' cols = '33'></textarea>
        </p>
        <button class="input_form__post-button">Post</button>
        </form>

      </section>  
      
      <section class="section-posts">
      <form action="/posts" method="get" >
        <button class="show-posts-only-button" type="submit" >Show Posts Only</button>
      </form>

        <ul>
          ${list.join("")}
        </ul>
      </section>  
`}

function htmlPosts(list) {
    return ` <section class="section-posts">
<form action="/" method="get" >
  <button class="make-new-posts-button" type="submit" >Make New Posts</button>
</form>

  <ul>
    ${list.join("")}
  </ul>
</section> `}

module.exports = { getListTemplate, layout, htmlNormal, htmlPosts }