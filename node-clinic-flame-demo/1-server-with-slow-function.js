"use strict";

const express = require("express");

const app = express();
const payload = initPayload();

app.get("/", (req, res) => {
  res.send(payload());
});

app.listen(3000, () => console.log("Server is running on port: 3000..."));

// function initPayload(idSize = 20) {
//   if (idSize < 6) throw Error("idSize must be greater than 5");
//   return function payload() {
//     let chars = "";
//     let n = idSize;
//     const date = Date.now();
//     const radix = 36;
//     n *= n * idSize;
//     while (n--) {
//       const num = date + n;
//       chars += num.toString(radix).toUpperCase();
//     }
//     const id = chars.slice(-idSize);
//     return { date, id };
//   };
// }

function initPayload(idSize = 20) {
  if (idSize < 6) throw Error("idSize must be greater than 5");
  const max = 2147483647;
  var count = 0;
  return function payload() {
    count = (count + 1) % max;
    const date = Date.now();
    const chars = count.toString(36).toUpperCase();
    const id = "0".repeat(idSize - chars.length) + chars;
    return { date, id };
  };
}
