import { config } from "../config";

export function initBackgroundContainer (root) {
  const container = document.createElement("div");
  container.style.cssText = "position: absolute;left: 0;top: 0;width: 100%;height: 100%";
  root.appendChild(container);
  return container;
}

export function initContentContainer (root) {
  const padding = config.padding;
  const container = document.createElement("div");
  config.width = root.offsetWidth - padding.left - padding.right;
  config.height = root.offsetHeight;
  container.style.cssText = `position: absolute;left: ${padding.left}px;top: 0;width: ${config.width}px;height: ${root.offsetHeight}px;`;
  root.appendChild(container);
  return container;
}
