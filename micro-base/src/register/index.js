import { registerMicroApps } from "../core";

export function register ({ manifest }) {
  registerMicroApps(manifest, {
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
}
