const Koa = require("koa");
const WebSocket = require("ws");

const app = new Koa();
const ws = new WebSocket.Server({ port: 8888 });
const wsPool = {};

ws.on("connection", (ws, req) => {
  const id = req.connection.remoteAddress;
  if (!id) return;

  console.log("server connection", id);

  wsPool[id] = ws;

  ws.on("message", msg => {
    console.log("server receive msg：", msg);
    Object.values(wsPool).forEach((item) => {
      if (item !== ws) {
        item.send(msg)
      }
    })
  });

  ws.on("close", () => {
    delete wsPool[id];
    console.log("close", id);
  });
});

function parseParams (url) {
  const queryStr = /[^?]*\?([^?#]*).*/.exec(url);
  const params = {};
  if (!queryStr) {
    return params;
  }
  queryStr[1].split("&").forEach((pair) => {
    const [key, value] = pair.split("=");
    params[key] = value;
  });
  return params;
}

app.listen(3000, () => {
  console.log("App running at: http://127.0.0.1:3000");
});
