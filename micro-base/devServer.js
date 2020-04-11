const express = require("express");
const proxy = require("http-proxy-middleware");
const path = require("path");
const config = require("./script/config");

const ip = "127.0.0.1";
const port = 83;

const app = express();

// 静态资源代理 开发环境必须添加，生产如果是独立部署就需要添加对应的代理
// app.use("/microApp", proxy("http://127.0.0.1:80"));
app.use("/test", proxy("http://127.0.0.1:8080"));

// 接口代理
const api = "http://10.88.0.219:8081"; // 开发
// const api = "http://10.76.34.45:8081"; // 曾剑飞

app.use("/api", proxy(api));
app.use("/admin", proxy(api));
app.use("/open", proxy(api));

// 开发环境配置
// 处理静态资源
app.use("/register", express.static(path.join(config.outputDir, "register")));
app.use("/microApp", express.static(path.join(config.outputDir, "microApp")));

// 处理history state
app.all("*", function (req, res) {
  res.sendFile(path.join(process.cwd(), config.outputDir, "index.html"));
});

// 启动服务
app.listen(port, ip, () => {
  console.log(`\nApp running at: http://${ip}:${port}`);
});
