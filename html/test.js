process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const axios = require("axios");
const fs = require("fs");
function run (pageNum) {
  axios.get("http://34nvnv.com/list/3-" + pageNum + ".html")
  .then((res) => {
    fs.appendFileSync("test.txt", pageNum + ": " + res.data.match(/<div class="video-title">[\w\W]+?<\/a>/g).map((item) => {
      return item.match(/l">[\w\W]+?<\/a>/g)[0]
    }).join(" ") + "\r")
  });
}
for (let i = 10; i < 16; i++) {
  (function (i) {
    setTimeout(() => {
      for (let j = 1; j <= 50; j++) {
        run(i * 50 + j)
      }
    }, i * 1000)
  })(i)
}
