export function init (root, { width, height, padding }) {
  const staticCanvas = document.createElement("canvas");
  root.appendChild(staticCanvas);
  const canvas = document.createElement("canvas");
  root.appendChild(canvas);
  const offCanvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const offCtx = offCanvas.getContext("2d");
  const staticCtx = staticCanvas.getContext("2d");
  staticCanvas.width = width;
  staticCanvas.height = height;
  offCanvas.width = canvas.width = width - padding.left - padding.right;
  offCanvas.height = canvas.height = height;
  canvas.style.left = padding.left + "px";
  // canvas.style.top = padding.top + "px";
  // canvas.style.width = canvas.width + "px";
  // canvas.style.height = canvas.height + "px";
  return {
    ctx,
    offCanvas,
    offCtx,
    staticCtx
  };
}
