import { uid } from "./helpers";

export function makeRectModel (x, y) {
  return {
    id: uid(),
    type: "rect",
    shape: {
      x: ~~x,
      y: ~~y,
      width: 200,
      height: 100
    },
    lines: []
  };
}

// 画圆形
export function makeCircleModel (x, y) {
  return {
    type: "circle",
    shape: {
      cx: x,
      cy: y,
      r: 25
    },
    lines: []
  };
}

// 画线
export function makeLineModel (point) {
  return {
    id: uid(),
    type: "line",
    shape: {
      points: point ? [point] : []
    },
    style: {
      lineWidth: 1,
      stroke: "#000",
      text: "",
      fontSize: 16,
      textFill: "#999"
    },
    lines: [],
    // animate: false
  };
}
