const Koa = require("koa");
const WebSocket = require("ws");

const app = new Koa();
const ws = new WebSocket.Server({ port: 8888 });

ws.on("connection", (ws, req) => {
  console.log("server connection", req.url);

  ws.on("message", msg => {
    console.log("server receive msg：", msg);
    ws.send(msg);
  });

  ws.on("close", () => {
    console.log("close");
  });
});

function parseParams (url) {
  const parts = url.substr(2).split("&");
}

app.listen(3000, () => {
  console.log("App running at: http://127.0.0.1:3000");
});
