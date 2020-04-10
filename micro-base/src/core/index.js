import { registerApplication, start as startSpa } from "single-spa";
import { importEntry } from "./import-html-entry";
import { prefetchAfterFirstMounted } from "./prefetch";
import { isFunction } from "./utils";

let microApps = [];

function toArray(array) {
  return Array.isArray(array) ? array : [array];
}

export function registerMicroApps(apps, lifeCycles) {

  const beforeLoad = toArray(lifeCycles.beforeLoad || []);
  const beforeMount = toArray(lifeCycles.beforeMount || []);
  const afterMount = toArray(lifeCycles.afterMount || []);
  const afterUnmount = toArray(lifeCycles.afterUnmount || []);
  microApps = [...microApps, ...apps];

  apps.forEach(app => {

    const { name, entry, /* render,*/ activeRule, props = {} } = app;

    registerApplication(name,

      async ({ name: appName }) => {

        // 获取入口 html 模板及脚本加载器
        const { /* template: appContent, */ importScripts, getExternalStyleSheets } = await importEntry(entry + "");
        // 第一次加载设置应用可见区域 dom 结构
        // 确保每次应用加载前容器 dom 结构已经设置完毕
        // render({ appContent, loading: true });

        if (beforeLoad.length) {
          await Promise.all(beforeLoad.map(hook => hook(app)));
        }

        // 获取 模块/应用 导出的 lifecycle hooks
        console.log(await importScripts());
        const { bootstrap: bootstrapApp, mount, unmount } = (await importScripts()).default;

        if (!isFunction(bootstrapApp) || !isFunction(mount) || !isFunction(unmount)) {
          throw new Error(`You need to export the functional lifecycles in ${appName} entry`);
        }

        return {
          bootstrap: [
            async () => {
              await getExternalStyleSheets();
            },
            bootstrapApp,
          ],
          mount: [
            async () => {
              if (beforeMount.length) {
                await Promise.all(beforeMount.map(hook => hook(app)));
              }
            },
            // 添加 mount hook, 确保每次应用加载前容器 dom 结构已经设置完毕
            // async () => render({ appContent, loading: true }),
            mount,
            // 应用 mount 完成后结束 loading
            // async () => render({ appContent, loading: false }),
            async () => {
              if (afterMount.length) {
                await Promise.all(afterMount.map(hook => hook(app)));
              }
            },
          ],
          unmount: [
            unmount,
            async () => {
              if (afterUnmount.length) {
                await Promise.all(afterUnmount.map(hook => hook(app)));
              }
            },
          ],
        };
      },

      activeRule,
      props,
    );
  });
}

export * from "./effects";
export { navigateToUrl } from "single-spa";

export function start(opts = {}) {

  const { prefetch = true } = opts;

  if (prefetch) {
    prefetchAfterFirstMounted(microApps);
  }

  startSpa();
}
