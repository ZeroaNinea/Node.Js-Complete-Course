"use strict";

const restify = require("restify");
const server = restify.createServer();

// function sleep(ms) {
//   const future = Date.now() + ms;
//   while (Date.now() < future);
// }

server.get("/", function (req, res, next) {
  // sleep(1)
  setTimeout(() => {
    res.send({});
    next();
  }, 1);
});

server.listen(3000);

process.on("SIGINT", function () {
  console.error("Caught SIGINT, shutting down.");
  server.close();
});
