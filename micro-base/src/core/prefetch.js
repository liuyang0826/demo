import { getMountedApps } from "single-spa";
import { importEntry } from "./import-html-entry";
import { noop } from "./utils";

/**
 * 预加载静态资源，不兼容 requestIdleCallback 的浏览器不做任何动作
 * @param entry
 */
export function prefetch(entry) {

  const requestIdleCallback = window.requestIdleCallback || noop;

  requestIdleCallback(async () => {
    const { getExternalStyleSheets, getPrefetchList } = await importEntry(entry);
    requestIdleCallback(getExternalStyleSheets);
    requestIdleCallback(getPrefetchList);
  });

}

export function prefetchAfterFirstMounted(apps) {

  window.addEventListener("single-spa:first-mount", () => {

    const mountedApps = getMountedApps();
    const notMountedApps = apps.filter(app => mountedApps.indexOf(app.name) === -1);

    if (process.env.NODE_ENV === "development") {
      console.log("prefetch starting...", notMountedApps);
    }

    notMountedApps.forEach(app => prefetch(app.entry));
  }, { once: true });

}
