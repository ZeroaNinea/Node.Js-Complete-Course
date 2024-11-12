const names = require("./4-names");
const sayHi = require("./5-utils");
const data = require("./6-alternative-flavor");
require("./7-mind-grenade");

console.log(data);
console.log(names);
console.log(sayHi);

sayHi("Susan");
sayHi(names.john);
sayHi(names.peter);
