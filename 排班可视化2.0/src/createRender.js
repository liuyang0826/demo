import { Group, Line, Rect, Text } from "./zrender";
import { makeRectStartPoint, makeRectTargetPoint } from "./utils";

export function createRender (
{
  zr,
  dataList,
  config: { splitTime, rectHeight, width, height, padding, lineSpacePX, lineDotWidth, iconSize },
  utils: { makeShapeByPlan },
  store: { getPlanById, getStartTime, ms2px, getScale },
}
) {
  const staticGroup = new Group();
  zr.add(staticGroup);

  function renderStatic () {
    dataList.forEach((item, index) => {
      let curY = ~~(index * lineSpacePX + padding.top);
      const line = new Line({
        shape: {
          x1: padding.left,
          y1: curY,
          x2: width - padding.right,
          y2: curY
        },
        style: {
          stroke: "#000",
          lineWidth: 2
        },
        zlevel: 0
      });
      staticGroup.add(line);

      const text = new Text({
        position: [50, curY],
        style: {
          text: item.name,
          textLineHeight: 2,
          fontSize: 12
        },
        zlevel: 0
      });
      staticGroup.add(text);
    });
  }

  const planGroup = new Group({
    draggable: "horizontal"
  });
  const planRectGroup = new Group(); // 计划块分组
  const planLineGroup = new Group(); // 连接线分组

  planGroup.add(planRectGroup);
  planGroup.add(planLineGroup);
  zr.add(planGroup);

  // 时间分割线
  function renderSplitLine () {
    const curX = (splitTime - getStartTime()) * ms2px();
    const line = new Line({
      shape: {
        x1: curX,
        y1: 0,
        x2: curX,
        y2: height
      },
      style: {
        stroke: "#999",
        lineWidth: 2,
        lineDash: [10, 6]
      },
      zlevel: 1
    });
    planRectGroup.add(line)
  }

  // 渲染计划
  function renderPlans () {
    dataList.forEach((item, xIndex) => {
      let current = item.head;
      while (current) {
        renderPlan(current, xIndex);
        current = current.next;
      }
    });
  }

  function renderPlan (plan, xIndex) {
    const _ms2px = ms2px(getScale());
    const shape = makeShapeByPlan(plan, xIndex, getStartTime(), _ms2px);
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
        fill: plan.startTime < splitTime ? "#ccc" : "orange"
      }
    });
    plan.rectView = rect;
    planRectGroup.add(rect);
  }

  // 渲染关系线
  function renderConcatLines () {
    dataList.forEach((item) => {
      let current = item.head;
      while (current) {
        renderConcatLine(current);
        current = current.next;
      }
    });
  }

  function renderConcatLine (plan) {
    let targetPlan = getPlanById(plan.concatId);
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

    let start = makeRectStartPoint(startRect, rectHeight);
    let target = makeRectTargetPoint(endRect, rectHeight);

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
    const dotOffset = lineDotWidth / 2;
    const leftRect = new Rect({
      shape: {
        x: start.x - dotOffset,
        y: start.y - dotOffset,
        width: lineDotWidth,
        height: lineDotWidth
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
        width: lineDotWidth,
        height: lineDotWidth
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

  function render () {
    renderStatic();
    renderPlans();
    renderConcatLines();
    renderSplitLine();
  }

  return {
    render
  };
}
