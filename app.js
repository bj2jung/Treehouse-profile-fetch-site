const router = require("./router.js");
const http = require("http");

//Problem: We need a simple way to look at a user's badge count and JS points from a web browser

//Solution: Use Node.js to perform the profile look ups and serve our template via HTTP

// Create a web server

const port = 3000;

const server = http.createServer((request, response) => {
  router.home(request, response);
  router.user(request, response);
});

server.listen(port, () => {
  console.log(`Server running at http://${port}/`);
});
