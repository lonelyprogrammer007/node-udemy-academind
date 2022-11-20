const http = require("http");

const server = http.createServer((req, res) => {
  console.log({ url: req.url, method: req.method, headers: req.headers });
  // process.exit();
});

server.listen(3000);
