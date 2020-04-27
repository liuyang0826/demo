import { injectShare } from "./share";
import { register } from "./register";
import { start } from "./core";
import "./assets/icon/iconfont.css";
import "./assets/reset.css";
import "../theme/index.css";
import "../element-ui/index.scss";
// 注册程序只允许执行一次

async function main () {
  if (window.isRunRegister) return;
  window.isRunRegister = true;

  const { manifest, appPathMap, accessTokenKey } = (await window.System.import("/register/config/config.js?v=" + Date.now())).default;

  // 所有应用都共享的方法
  injectShare({ appPathMap, accessTokenKey });

  // 应用注册中心 通过路由分发子应用
  register({ manifest });

  start();
}

main();
