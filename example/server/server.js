const http = require("http");
const url = require("url");
const fs = require("fs");

const args = process.argv.slice(2);
const sendAudio = args.length > 0 && args[0] === "audio" ? true : false;

let audio;
if(sendAudio) {
  console.log("Audio mode set");
  audio = fs.readFileSync(`${__dirname}/../test.ogg`);
}

const port = 1234;
const server = http.createServer();

const responses = [];
const sendResponses = () => {
  responses.forEach((res) => {
    res.end(JSON.stringify({
      time: 123,
      delay: 5000,
      data: sendAudio ? Buffer.from(audio).toString("base64") : "hi"
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

server.listen(port, () => console.log(`Server listening at port ${port}`));