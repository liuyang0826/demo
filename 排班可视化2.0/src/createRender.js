import { Group, Line, Rect, Text } from "./zrender";

export function createRender (
{
  zr,
  dataList,
  config: { splitTime, rectHeight, width, height, padding, lineSpacePX, lineDotWidth, iconSize, advanceSpaceTime },
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

  // 渲染计划
  function renderPlans () {
    dataList.forEach((item, xIndex) => {
      item.planList.forEach((plan, yIndex) => {
        renderPlan(plan, xIndex, yIndex);
      });
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
        stroke: "red",
        lineWidth: 2,
      }
    });
    plan.rectView = rect;
    planRectGroup.add(rect);

    const text = new Text({
      position: [shape.x, shape.y],
      style: {
        text: plan.name,
        textLineHeight: 2,
        fontSize: 12,
        textFill: "blue"
      },
      zlevel: 1,
    });
    planRectGroup.add(text);
  }

  // 渲染关系线
  function renderConcatLines () {
    dataList.forEach((item) => {
      item.planList.forEach((plan) => {
        renderConcatLine(plan);
      });
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

    let start = makeRectStartPoint(startRect);
    let target = makeRectTargetPoint(endRect);

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

    // 移动起点
    addDragEventListener(
    leftRect,
    (e) => {
      line.setShape({
        x1: e.offsetX - planGroup.position[0] + dragOffset.x,
        y1: e.offsetY - planGroup.position[1] + dragOffset.y,
        x2: target.x,
        y2: target.y,
      });
    },
    (targetRect) => {
      plan.concatId = null;
      plan.lineRightView = null;
      plan.lineRightRectView = null;
      plan = targetRect.data;
      plan.concatId = targetPlan.id;
      const targetRectBoundingRect = targetRect.getBoundingRect();
      start = makeRectStartPoint(targetRectBoundingRect);
      line.setShape({
        x1: start.x,
        y1: start.y
      });
      leftRect.setShape({
        x: start.x - dotOffset,
        y: start.y - dotOffset
      });
      plan.lineRightView = line;
      plan.lineRightRectView = leftRect;
    }
    );
    // 移动终点
    addDragEventListener(
    rightRect,
    (e) => {
      line.setShape({
        x2: e.offsetX - planGroup.position[0],
        y2: e.offsetY - planGroup.position[1],
      });
    },
    (targetRect) => {
      plan.concatId = targetRect.data.id;
      targetPlan.lineLeftView = null;
      targetPlan.lineLeftRectView = null;
      const targetRectBoundingRect = targetRect.getBoundingRect();
      target = makeRectTargetPoint(targetRectBoundingRect);
      line.setShape({
        x2: target.x,
        y2: target.y,
      });
      rightRect.setShape({
        x: target.x - dotOffset,
        y: target.y - dotOffset
      });
      targetRect.data.lineLeftView = line;
      targetRect.data.lineLeftRectView = rightRect;
      targetPlan = targetRect.data;
    });

    // 鼠标偏移量
    const dragOffset = { x: 0, y: 0 };

    function addDragEventListener (rect, dragEventHandler, dropEventHandler) {
      rect.on("dragstart", (e) => {
        const getBoundingRect = leftRect.getBoundingRect();
        dragOffset.x = getBoundingRect.x - e.offsetX + dotOffset;
        dragOffset.y = getBoundingRect.y - e.offsetY + dotOffset;
      })
      .on("drag", (e) => {
        dragEventHandler(e);
      })
      .on("dragend", (e) => {
        const targetRect = planRectGroup.children().find((child) => {
          return child.getBoundingRect().contain(e.offsetX - planGroup.position[0], e.offsetY - planGroup.position[1]);
        });
        resetTransform(rect);
        if (targetRect) {
          dropEventHandler(targetRect);
        } else {
          // 没有目标回到初始位置
          line.setShape({
            x1: start.x,
            y1: start.y,
            x2: target.x,
            y2: target.y,
          });
        }
        dragOffset.x = 0;
        dragOffset.y = 0;
      });
    }

    plan.lineRightRectView = leftRect;
    plan.lineRightView = line;
    targetPlan.lineLeftRectView = rightRect;
    targetPlan.lineLeftView = line;
  }

  function resetTransform (element) {
    element.transform = [1, 0, 0, 1, 0, 0];
    element.invTransform = [1, -0, -0, 1, -0, 1];
    element.decomposeTransform();
  }

  function makeRectStartPoint (rect) {
    return { x: rect.x + rect.width, y: rect.y + rectHeight / 2 };
  }

  function makeRectTargetPoint (rect) {
    return { x: rect.x, y: rect.y + rectHeight / 2 };
  }

  function render () {
    renderStatic();
    renderPlans();
    renderConcatLines();
  }

  return {
    render
  };
}
