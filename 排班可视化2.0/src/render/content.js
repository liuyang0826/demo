import { Group, Line, Rect, Text } from "../zrender";
import { config } from "../config";
import { makeRectStartPoint, makeRectTargetPoint, makeShapeByPlan, ms2px } from "../utils";

export function contentRender (zr, data, id2plan) {

  const planGroup = new Group({
    draggable: "horizontal"
  });
  const planRectGroup = new Group(); // 计划块分组
  const planLineGroup = new Group(); // 连接线分组

  planGroup.add(planRectGroup);
  planGroup.add(planLineGroup);
  zr.add(planGroup);

  renderPlans();
  renderConcatLines();
  renderSplitLine();

  // 渲染计划
  function renderPlans () {
    data.forEach((item, xIndex) => {
      let current = item.head;
      while (current) {
        renderPlan(current, xIndex);
        current = current.next;
      }
    });
  }

  function renderPlan (plan, xIndex) {
    const shape = makeShapeByPlan(plan, xIndex);
    const rect = new Rect({
      shape: shape,
      draggable: true,
      zlevel: 1,
      data: plan,
      style: {
        text: plan.name,
        stroke: "red",
        lineWidth: 2,
        fontSize: 12,
        textFill: "red",
        // fill: plan.startTime < config.splitTime ? "#ccc" : "orange",
        fill: "#fff"
      }
    });
    plan.rectView = rect;
    planRectGroup.add(rect);
  }

  // 渲染关系线
  function renderConcatLines () {
    data.forEach((item) => {
      let current = item.head;
      while (current) {
        renderConcatLine(current);
        current = current.next;
      }
    });
  }

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
    const startRect = plan.rectView.getBoundingRect();
    const endRect = targetPlan.rectView.getBoundingRect();

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
      zlevel: 2,
      silent: true
    });
    planLineGroup.add(line);

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
      zlevel: 2,
      draggable: true
    });
    planLineGroup.add(leftRect);
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
      zlevel: 2,
      draggable: true
    });
    planLineGroup.add(rightRect);

    // 双向关系
    plan.lineRightRectView = leftRect;
    leftRect.data = plan;

    plan.lineRightView = line;
    line.leftData = plan;

    targetPlan.lineLeftRectView = rightRect;
    rightRect.data = targetPlan;

    targetPlan.lineLeftView = line;
    line.rightData = targetPlan;
  }

  // 时间分割线
  function renderSplitLine () {
    const curX = ~~((config.splitTime - config.startTime) * ms2px()) + 0.5;
    const rect = new Rect({
      shape: {
        x: curX,
        y: 0,
        width: config.width - curX,
        height: config.height
      },
      style: {
        fill: "rgba(255, 0, 0, 0.1)"
      },
      silent: true
    });
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
      zlevel: 1,
      silent: true
    });
    planRectGroup.add(line);
    planRectGroup.add(rect);
  }
}
