import { getMountedApps, navigateToUrl } from "single-spa";

export function runDefaultMountEffects(defaultAppLink) {

  window.addEventListener("single-spa:no-app-change", () => {
    const mountedApps = getMountedApps();
    if (!mountedApps.length) {
      navigateToUrl(defaultAppLink);
    }
  }, { once: true });

}
