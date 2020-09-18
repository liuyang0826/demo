// 时间分割线
import { config } from "../config";
import { ms2px } from "../utils";
import { Line, Rect } from "../zrender";

export function timeLineRender (group) {
  const curX = ~~((config.splitTime - config.startTime) * ms2px()) + 0.5;
  const line = new Line({
    shape: {
      x1: curX,
      y1: 0,
      x2: curX,
      y2: config.height
    },
    style: {
      stroke: "#999",
      lineWidth: 1,
      lineDash: [10, 6]
    },
    zlevel: 0,
    cursor: "e-resize"
    // silent: true
  });
  const rect = new Rect({
    shape: {
      x: curX,
      y: 0,
      width: config.width - curX,
      height: config.height
    },
    zlevel: 0,
    style: {
      fill: "rgba(255, 0, 0, 0.05)"
    },
    silent: true
  });
  group.add(line);
  group.add(rect);

  return { modal: rect, repaint };

  function repaint () {
    const curX = ~~((config.splitTime - config.startTime) * ms2px()) + 0.5;
    line.setShape({
      x1: curX,
      x2: curX
    });
    rect.setShape({
      x: curX,
      width: config.width - curX - group.position[0],
    });
  }
}
