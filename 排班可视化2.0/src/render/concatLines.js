import { makeRectStartPoint, makeRectTargetPoint } from "../utils";
import { config } from "../config";
import { Line, Rect } from "../zrender";

export function concatLinesRender (data, group, id2plan) {
  const updates = [];

  data.forEach((item) => {
    let current = item.head;
    while (current) {
      const update = renderConcatLine(current);
      updates.push(update);
      current = current.next;
    }
  });

  return function update () {
    updates.forEach((update) => {
      update && update();
    });
  };

  function renderConcatLine (plan) {
    let targetPlan = id2plan[plan.concatId];
    if (!targetPlan) {
      return;
    }
    const endTime = plan.endTime;
    const concatStartTime = targetPlan.startTime;
    if (endTime > concatStartTime) {
      // return;
    }
    const startRect = plan.rectView.shape;
    const endRect = targetPlan.rectView.shape;

    let start = makeRectStartPoint(startRect, config.rectHeight);
    let target = makeRectTargetPoint(endRect, config.rectHeight);

    const lineStyle = {
      stroke: "red",
      lineWidth: 2,
      lineDash: [10, 6]
    };
    // 线
    const line = new Line({
      shape: {
        x1: start.x,
        y1: start.y,
        x2: target.x,
        y2: target.y,
      },
      style: lineStyle,
      zlevel: 0,
      silent: true
    });
    group.add(line);

    // 端点
    const dotOffset = config.lineDotWidth / 2;
    const leftRect = new Rect({
      shape: {
        x: start.x - dotOffset,
        y: start.y - dotOffset,
        width: config.lineDotWidth,
        height: config.lineDotWidth
      },
      style: {
        fill: "red"
      },
      zlevel: 0,
      draggable: true
    });
    group.add(leftRect);
    const rightRect = new Rect({
      shape: {
        x: target.x - dotOffset,
        y: target.y - dotOffset,
        width: config.lineDotWidth,
        height: config.lineDotWidth
      },
      style: {
        fill: "red"
      },
      zlevel: 0,
      draggable: true
    });
    group.add(rightRect);

    // 双向关系
    plan.lineRightRectView = leftRect;
    leftRect.data = plan;

    plan.lineRightView = line;
    line.leftData = plan;

    targetPlan.lineLeftRectView = rightRect;
    rightRect.data = targetPlan;

    targetPlan.lineLeftView = line;
    line.rightData = targetPlan;

    return function update () {
      const startRect = plan.rectView.shape;
      const endRect = targetPlan.rectView.shape;

      let start = makeRectStartPoint(startRect, config.rectHeight);
      let target = makeRectTargetPoint(endRect, config.rectHeight);
      line.setShape({
        x1: start.x,
        y1: start.y,
        x2: target.x,
        y2: target.y,
      });
      leftRect.setShape({
        x: start.x - dotOffset,
        y: start.y - dotOffset,
      });
      rightRect.setShape({
        x: target.x - dotOffset,
        y: target.y - dotOffset,
      });
    };
  }
}
