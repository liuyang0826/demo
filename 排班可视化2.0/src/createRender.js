import { Group, Line, Rect, Text } from "./zrender";

export function createRender (
{
  zr,
  config: { splitTime, rectHeight, width, height, padding, lineSpacePX, lineDotWidth, iconSize, advanceSpaceTime },
  utils: { makeShapeByPlan },
  store: { getDataList, getConcatList, getPlanById, getStartTime, ms2px, getScale },
}
) {
  const staticGroup = new Group();
  zr.add(staticGroup);

  function renderStatic () {
    getDataList().forEach((item, index) => {
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
    getDataList().forEach((item, xIndex) => {
      item.planList.forEach((plan, yIndex) => {
        renderPlan(plan, xIndex, yIndex);
      });
    });
  }

  function renderPlan (plan, xIndex, yIndex) {
    const dataList = getDataList();
    const _ms2px = ms2px(getScale());
    const shape = makeShapeByPlan(plan, xIndex, getStartTime(), _ms2px);
    const rect = new Rect({
      shape: shape,
      draggable: true,
      zlevel: 1,
      data: plan,
      style: {
        stroke: "red",
        lineWidth: 4,
      }
    });
    plan.rectView = rect;
    planRectGroup.add(rect);
    // 鼠标偏移量
    const dragOffset = { x: 0, y: 0 };
    rect.on("dragstart", (e) => {
      const getBoundingRect = rect.getBoundingRect();
      dragOffset.x = e.offsetX - getBoundingRect.x;
      dragOffset.y = e.offsetY - getBoundingRect.y;
    }).on("drag", (e) => {
      moveLineLeft(rect.data.lineRightRectView, rect.data.lineRightView, {
        x: e.offsetX - dragOffset.x + rect.getBoundingRect().width,
        y: e.offsetY - dragOffset.y + rectHeight / 2
      });
      moveLineRight(rect.data.lineLeftRectView, rect.data.lineLeftView, {
        x: e.offsetX - dragOffset.x,
        y: e.offsetY - dragOffset.y + rectHeight / 2
      });
    })
    .on("dragend", (e) => {
      const { xIndex: newX, yIndex: newY, isOverlay } = getInsertInfoByEvent(e);
      resetTransform(rect);
      plan.startTime = (e.offsetX - dragOffset.x) / _ms2px + getStartTime();
      plan.endTime = plan.startTime + shape.width / _ms2px;
      const newShape = makeShapeByPlan(plan, newX, getStartTime(), _ms2px);
      rect.setShape(newShape);
      moveLineLeft(rect.data.lineRightRectView, rect.data.lineRightView, {
        x: newShape.x + rect.getBoundingRect().width,
        y: newShape.y + rectHeight / 2
      });
      moveLineRight(rect.data.lineLeftRectView, rect.data.lineLeftView, {
        x: newShape.x,
        y: newShape.y + rectHeight / 2
      });

      dataList[xIndex].planList.splice(yIndex, 1);
      let insertYIndex = newY;
      let advanceYIndex = newY;
      let fromYIndex = yIndex;
      // 本行内移动
      if (newX === xIndex) {
        if (newY > yIndex) {
          insertYIndex--;
          const curIndexNext = yIndex + 1;
          if ((newY === curIndexNext && !isOverlay) || newY > curIndexNext) {
            advanceYIndex--;
          }
        } else if (newY < yIndex) {
          fromYIndex++;
        }
      }
      if (isOverlay && advanceYIndex > 0) {
        advanceYIndex--;
      }
      dataList[newX].planList.splice(insertYIndex, 0, plan);

      const changeToRight = advanceTime(newX, advanceYIndex, true);
      const changeToLeft = advanceTime(xIndex, yIndex, false);

      xIndex = newX;
      yIndex = newY;
    });

    function getInsertInfoByEvent (e) {
      let x = e.offsetX;
      let y = e.offsetY;
      x -= dragOffset.x;
      let xIndex = ~~((y - padding.top + lineSpacePX / 2) / lineSpacePX);
      if (xIndex >= dataList.length) {
        xIndex = dataList.length - 1;
      }
      const planList = dataList[xIndex].planList;
      let isOverlay = false;
      let yIndex = 0;
      for (; yIndex < planList.length; yIndex++) {
        const rect = planList[yIndex].rectView.getBoundingRect();
        if (x <= rect.x + rect.width + advanceSpaceTime * _ms2px) {
          isOverlay = true;
          if (x < rect.x) {
            yIndex--;
            isOverlay = false;
          }
          break;
        }
      }
      return { xIndex, yIndex: yIndex + 1, isOverlay };
    }
  }

  // 顺移时间 flag true -> 后移 false -> 前移
  function advanceTime (xIndex, yIndex, flag) {
    const changeList = [];
    const planList = getDataList()[xIndex].planList;
    const space = advanceSpaceTime;
    if (flag) {
      let leftPlan = planList[yIndex];
      let rightYIndex = yIndex + 1;
      while (rightYIndex < planList.length) {
        const rightPlan = planList[rightYIndex];
        if (rightPlan.startTime - leftPlan.endTime >= space) {
          break;
        }
        const snapshot = { ...rightPlan };
        const advance = (leftPlan.endTime - rightPlan.startTime) + space;
        rightPlan.startTime += advance;
        rightPlan.endTime += advance;

        changeList.push({
          from: { xIndex: xIndex, yIndex: rightYIndex, snapshot },
          to: { xIndex: xIndex, yIndex: rightYIndex + 1 }
        });

        const newShape = makeShapeByPlan(rightPlan, xIndex, getStartTime(), ms2px());
        rightPlan.rectView.setShape(newShape);

        moveLineLeft(rightPlan.lineRightRectView, rightPlan.lineRightView, {
          x: newShape.x + rightPlan.rectView.getBoundingRect().width,
          y: newShape.y + rectHeight / 2
        });
        moveLineRight(rightPlan.lineLeftRectView, rightPlan.lineLeftView, {
          x: newShape.x,
          y: newShape.y + rectHeight / 2
        });

        rightYIndex++;
        leftPlan = rightPlan;
      }
    } else {
      if (yIndex === 0) {
        yIndex = 1;
      }
      let leftPlan = planList[yIndex - 1];
      let rightYIndex = yIndex;
      while (rightYIndex < planList.length) {
        const rightPlan = planList[rightYIndex];
        const snapshot = { ...rightPlan };
        const advance = (rightPlan.startTime - leftPlan.endTime) - space;
        rightPlan.startTime -= advance;
        rightPlan.endTime -= advance;

        changeList.push({
          from: { xIndex: xIndex, yIndex: rightYIndex, snapshot },
          to: { xIndex: xIndex, yIndex: rightYIndex + 1 }
        });

        const newShape = makeShapeByPlan(rightPlan, xIndex, getStartTime(), ms2px());
        rightPlan.rectView.setShape(newShape);
        moveLineLeft(rightPlan.lineRightRectView, rightPlan.lineRightView, {
          x: newShape.x + rightPlan.rectView.getBoundingRect().width,
          y: newShape.y + rectHeight / 2
        });
        moveLineRight(rightPlan.lineLeftRectView, rightPlan.lineLeftView, {
          x: newShape.x,
          y: newShape.y + rectHeight / 2
        });

        rightYIndex++;
        leftPlan = rightPlan;
      }
    }
    return changeList;
  }

  // 渲染关系线
  function renderConcatLines () {
    getConcatList().forEach((plan) => {
      renderConcatLine(plan);
    });
  }

  function renderConcatLine (plan) {
    let targetPlan = getPlanById(plan.concatId);
    if (!targetPlan) {
      console.error(JSON.stringify(plan));
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

  function moveLineLeft (rightRect, line, start) {
    if (!rightRect) {
      return;
    }
    line.setShape({
      x1: start.x,
      y1: start.y
    });
    rightRect.setShape({
      x: start.x - lineDotWidth / 2,
      y: start.y - lineDotWidth / 2
    });
  }

  function moveLineRight (leftRect, line, end) {
    if (!leftRect) {
      return;
    }
    line.setShape({
      x2: end.x,
      y2: end.y
    });
    leftRect.setShape({
      x: end.x - lineDotWidth / 2,
      y: end.y - lineDotWidth / 2
    });
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
