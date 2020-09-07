const rand = require("./rand");

function uid() {
  let randNum = rand.randInt(100000, 900000);
  return randNum.toString(16);
}

module.exports = uid;