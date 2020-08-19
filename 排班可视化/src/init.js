export function init (root) {
  const canvas = document.createElement("canvas");
  root.appendChild(canvas);
  const offCanvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const offCtx = offCanvas.getContext("2d");
  const width = offCanvas.width = canvas.width = root.offsetWidth;
  const height = offCanvas.height = canvas.height = root.offsetHeight;
  return {
    ctx,
    offCanvas,
    offCtx,
    width,
    height
  };
}
