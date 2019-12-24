const http = require("http");

const server = http.createServer();

server.on("request", (_req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end("pong");
});

server.listen(1234);