import { registerMicroApps, start, navigateToUrl } from "./core";
import "./assets/reset.css";
import "./assets/icon/iconfont.css";
import microAppManifest, { appPathMap } from "./manifest";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 简单配置
NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

// 注册程序只允许执行一次

function main() {
  if (window.isRunRegister) return;
  window.isRunRegister = true;

  // 所有应用都共享的方法
  window.qTouch = (function() {
    return {
      navigateToUrl: function(url) {
        navigateToUrl(process.env.BASE_URL + url);
      },
      appPathMap: appPathMap,
      basePath: process.env.BASE_URL + "",
      getBaseTypeByCode: function (code) {
        let baseTypeCodeMapStr = localStorage.getItem("baseTypeCodeMap");
        if (baseTypeCodeMapStr) {
          let baseTypeCodeMap = JSON.parse(baseTypeCodeMapStr);
          if (baseTypeCodeMap) {
            return baseTypeCodeMap[code] || false;
          }
        }
        return false;
      },
      loading: {
        start: function () {
          NProgress.start();
        },
        done: function () {
          NProgress.done();
        }
      }
    };
  })();

  // 应用注册中心 通过路由分发子应用
  registerMicroApps(microAppManifest, {
    beforeLoad: [
      async (app) => {
        console.log("after beforeLoad", app);
        qTouch.loading.start();
      }
    ],
    beforeMount: [
      async (app) => {
        qTouch.loading.done();
        if (app.props) {
          // 设置网页title
          if (app.props.title) {
            document.title = app.props.title;
          }
        }
      }
    ],
    afterUnmount: [
      async (app) => {
        console.log("after unload", app);
      }
    ]
  });

  start();
}

main();
