const http = require("http");
const url = require("url");

const server = http.createServer();

const responses = [];
const sendResponses = () => {
  responses.forEach((res) => {
    res.end(JSON.stringify({
      time: 123,
      delay: 5000,
      data: "hi"
    }));
  });

  responses.length = 0;
}

server.on("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const pathname = url.parse(req.url).pathname;
  switch(pathname) {
    case "/ping":
      res.end("pong");
      break;
    case "/data":
      responses.push(res);
      break;
    case "/respond":
      sendResponses();
      res.end();
      break;
  }
});

server.listen(1234);