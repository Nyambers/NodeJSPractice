const fs = require("fs");

let buffer = Buffer.alloc(10);

console.log(fs.readFileSync("foo.txt"))

console.log(fs.readFileSync("foo.txt").toString("utf8"))