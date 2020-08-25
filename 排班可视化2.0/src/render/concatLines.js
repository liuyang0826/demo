import { makeRectStartPoint, makeRectTargetPoint } from "../utils";
import { config } from "../config";
import { Line, Rect, Polyline } from "../zrender";

function makeCenter (concatPlans, id2plan) {
  let map = {};
  const rectHeightHalf = config.rectHeight / 2;
  transform();

  function transform () {
    map = {};
    concatPlans.forEach((item) => {
      let xIndex;
      if (item.xIndex <= id2plan[item.concatId].xIndex) {
        xIndex = item.xIndex;
      } else {
        xIndex = item.xIndex - 1;
      }
      if (map[xIndex]) {
        map[xIndex]++;
      } else {
        map[xIndex] = 1;
      }
    });
    for (let key in map) {
      if (map.hasOwnProperty(key)) {
        map[key] = (config.lineSpacePX - config.rectHeight) / (map[key] + 1);
      }
    }
  }

  let centerMap = {};
  let idCenterMap = {};

  function get (plan, y) {
    if (idCenterMap[plan.id]) {
      return idCenterMap[plan.id];
    }
    let center;
    let currentSpace;
    if (plan.xIndex <= id2plan[plan.concatId].xIndex) {
      currentSpace = map[plan.xIndex];
      center = y + rectHeightHalf + currentSpace;
    } else {
      currentSpace = map[plan.xIndex - 1];
      center = y + rectHeightHalf - config.lineSpacePX + currentSpace;
    }

    // 下一个位置
    !function next () {
      if (centerMap[center]) {
        center += currentSpace;
        next();
      }
    }();

    centerMap[center] = center;
    idCenterMap[plan.id] = center;
    return center;
  }

  function update ({ remove, add } = {}) {
    centerMap = {};
    idCenterMap = {};
    if (remove) {
      const index = concatPlans.findIndex(d => d.id === remove.id);
      if (index >= 0) {
        concatPlans.splice(index, 1);
      }
    }
    if (add) {
      concatPlans.push(add);
    }
    transform();
  }

  return {
    get,
    update
  };
}

export function concatLinesRender (data, group, id2plan) {
  const updates = [];

  const concatPlans = [];
  data.forEach((item) => {
    let current = item.head;
    while (current) {
      const target = id2plan[current.concatId];
      if (
      target
      && target !== current
      && current.endTime > target.startTime
      ) {
        concatPlans.push(current);
      }
      current = current.next;
    }
  });

  const { get: getCenter, update: updateCenter } = makeCenter(concatPlans, id2plan);

  concatPlans.forEach((item) => {
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

    let start = makeRectStartPoint(startRect);
    let target = makeRectTargetPoint(endRect);

    // 折线
    let center = getCenter(plan, start.y);
    const polyline = new Polyline({
      shape: {
        points: [[start.x, start.y], [start.x, center], [target.x, center], [target.x, target.y]]
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

    plan.lineRightView = polyline;
    polyline.leftData = plan;

    targetPlan.lineLeftRectView = rightRect;
    rightRect.data = targetPlan;

    targetPlan.lineLeftView = polyline;
    polyline.rightData = targetPlan;

    return function update () {
      const startRect = polyline.leftData.rectView.shape;
      const endRect = polyline.rightData.rectView.shape;

      let start = makeRectStartPoint(startRect);
      let target = makeRectTargetPoint(endRect);
      center = getCenter(polyline.leftData, start.y);
      polyline.setShape({
        points: [[start.x, start.y], [start.x, center], [target.x, center], [target.x, target.y]]
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

  function update () {
    updates.forEach((update) => {
      update();
    });
  }

  function updateConcatLines () {
    concatPlans.forEach((plan) => {
      updateConcatLine(plan);
    });
  }

  function updateConcatLine (plan) {
    const targetPlan = id2plan[plan.concatId];
    const startRect = plan.rectView.shape;
    const endRect = targetPlan.rectView.shape;
    const start = makeRectStartPoint(startRect);
    const target = makeRectTargetPoint(endRect);
    const center = getCenter(plan, start.y);
    plan.lineRightView.setShape({
      points: [[start.x, start.y], [start.x, center], [target.x, center], [target.x, target.y]]
    });
  }

  return {
    concatPlans,
    update,
    updateConcatLines,
    updateConcatLine,
    updateCenterStore: updateCenter
  };
}
