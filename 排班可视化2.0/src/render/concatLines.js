import { makeRectStartPoint, makeRectTargetPoint } from "../utils";
import { config } from "../config";
import { Line, Rect, Polyline } from "../zrender";

export function concatLinesRender (data, group, id2plan) {
  const updates = [];
  const centerMap = {};
  const rectHeightHalf = config.rectHeight / 2;

  const concatLines = [];
  data.forEach((item) => {
    let current = item.head;
    while (current) {
      const target = id2plan[current.concatId];
      if (
      target
      && target !== current
      && current.endTime > target.startTime
      ) {
        concatLines.push(current);
      }
      current = current.next;
    }
  });
  const xIndexMap = {};
  concatLines.forEach((item) => {
    let xIndex;
    if (item.xIndex <= id2plan[item.concatId].xIndex) {
      xIndex = item.xIndex;
    } else {
      xIndex = item.xIndex - 1;
    }
    if (xIndexMap[xIndex]) {
      xIndexMap[xIndex]++;
    } else {
      xIndexMap[xIndex] = 1;
    }
  });
  for (let key in xIndexMap) {
    if (xIndexMap.hasOwnProperty(key)) {
      xIndexMap[key] = (config.lineSpacePX - config.rectHeight) / (xIndexMap[key] + 1);
    }
  }

  function getCenter (plan, y) {
    let center;
    let currentSpace;
    if (plan.xIndex <= id2plan[plan.concatId].xIndex) {
      currentSpace = xIndexMap[plan.xIndex];
      center = y + rectHeightHalf + currentSpace;
    } else {
      currentSpace = xIndexMap[plan.xIndex - 1];
      center = y + rectHeightHalf - config.lineSpacePX + currentSpace;
    }

    function next () {
      if (centerMap[center]) {
        center += currentSpace;
        next();
      }
    }

    next();

    centerMap[center] = center;
    return center;
  }

  concatLines.forEach((item) => {
    const update = renderConcatLine(item);
    updates.push(update);
  });

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
    // group.add(line);

    // todo 折线
    let center = getCenter(plan, start.y);
    const polyline = new Polyline({
      shape: {
        points: [[start.x, start.y], [start.x, center], [target.x, center], [target.x, target.y]],
      },
      style: {
        stroke: "green",
        lineWidth: 2,
        // lineDash: [10, 6],
      },
      zlevel: 0,
      silent: true
    });
    group.add(polyline);

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

  return function update () {
    updates.forEach((update) => {
      update && update();
    });
  };
}
