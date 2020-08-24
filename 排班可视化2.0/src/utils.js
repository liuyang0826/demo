import { config } from "./config";

export function makeMap (list, fn) {
  const map = {};
  list.forEach((item, index) => {
    fn(map, item, index);
  });
  return map;
}
// 重置元素的位移偏移量
export function resetTransform (element, offset = 0) {
  element.transform = [1, 0, 0, 1, offset, 0];
  element.invTransform = [1, -0, -0, 1, -offset, -0];
  element.decomposeTransform();
}
export function makeRectStartPoint (rect, rectHeight, offset = 0) {
  return { x: rect.x + rect.width + offset, y: rect.y + rectHeight / 2 };
}

export function makeRectTargetPoint (rect, rectHeight) {
  return { x: rect.x, y: rect.y + rectHeight / 2 };
}

export function ms2px () {
  return config.width / config.dateRangeMS * config.scale;
}

export function makeShapeByPlan (plan, xIndex, offset = 0) {
  const _ms2px = ms2px();
  const startTime = plan.startTime;
  const endTime = plan.endTime;
  const rect = {
    x: (startTime - config.startTime) * _ms2px - offset,
    y: xIndex * config.lineSpacePX + config.padding.top - config.rectHeight / 2,
    width: ~~((endTime - startTime) * _ms2px),
    height: config.rectHeight,
    r: [2, 2, 2, 2]
  };
  return rect;
}
