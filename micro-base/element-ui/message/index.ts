import { Message } from "element-ui";
import "./override.scss";

import { Vue as _Vue } from "vue/types/vue";

let isInstalled = false;

export const message = Message;

export default {
  install: function(Vue: typeof _Vue) {
    Vue.prototype.$message = Message;
    if (!isInstalled) {
      isInstalled = true;
      // 页面切换时关闭所有message否则会关闭掉
      window.addEventListener("single-spa:app-change", function() {
        (Message as any).closeAll();
      });
    }
  }
};
