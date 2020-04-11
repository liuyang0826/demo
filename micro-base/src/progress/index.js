import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 简单配置
NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

export const loading = {
  start: function () {
    NProgress.start();
  },
  done: function () {
    NProgress.done();
  }
};
