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

    const { name, entry, activeRule, props = {} } = app;

    registerApplication(name,

      async ({ name: appName }) => {

        const { importScripts, getExternalStyleSheets } = await importEntry(entry);

        if (beforeLoad.length) {
          await Promise.all(beforeLoad.map(hook => hook(app)));
        }

        // 获取 模块/应用 导出的 lifecycle hooks
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
            mount,
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
            }
          ]
        };
      },
      activeRule,
      props
    );
  });
}

export * from "./effects";
export { navigateToUrl } from "single-spa";

export function start() {
  startSpa();
  prefetchAfterFirstMounted(microApps);
}
