const server = require("./server.js");

const port = process.env.PORT || "8080";
server.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
