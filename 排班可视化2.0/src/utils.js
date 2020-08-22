export function makeMap (list, fn) {
  const map = {};
  list.forEach((item, index) => {
    fn(map, item, index);
  });
  return map;
}
// 重置元素的位移偏移量
export function resetTransform (element) {
  element.transform = [1, 0, 0, 1, 0, 0];
  element.invTransform = [1, -0, -0, 1, -0, 1];
  element.decomposeTransform();
}
export function makeRectStartPoint (rect, rectHeight) {
  return { x: rect.x + rect.width, y: rect.y + rectHeight / 2 };
}

export function makeRectTargetPoint (rect, rectHeight) {
  return { x: rect.x, y: rect.y + rectHeight / 2 };
}
