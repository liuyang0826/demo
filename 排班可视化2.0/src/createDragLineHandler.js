import { makeRectStartPoint, makeRectTargetPoint, resetTransform } from "./utils";

export function createDragLineHandler (
{
  dataList,
  config: { rectHeight, padding, lineSpacePX, lineDotWidth, advanceSpaceTime },
  utils: { makeShapeByPlan },
  store: { getStartTime, ms2px, getScale, getPlanById },
}
) {
  dataList.forEach((item) => {
    let current = item.head;
    while (current) {
      let targetPlan = getPlanById(current.concatId);
      targetPlan && addEventListener(current, targetPlan);
      current = current.next;
    }
  });

  function addEventListener (plan, targetPlan) {
    const leftRect = plan.lineRightRectView;
    const rightRect = targetPlan.lineLeftRectView;
    const line = plan.lineRightView;
    const shape = line.shape;
    let start = { x: shape.x1, y: shape.y1 };
    let target = { x: shape.x2, y: shape.y2 };
    const planGroup = line.parent.parent;
    const planRectGroup = plan.rectView.parent;
    // 端点
    const dotOffset = lineDotWidth / 2;
    // 移动起点
    addDragEventListener(
    leftRect,
    (e) => {
      line.setShape({
        x1: e.offsetX - planGroup.position[0] + dragOffset.x,
        y1: e.offsetY - planGroup.position[1] + dragOffset.y,
      });
    },
    (targetRect) => {
      plan.concatId = null;
      plan.lineRightView = null;
      plan.lineRightRectView = null;
      start = makeRectStartPoint(targetRect.shape, rectHeight);
      line.setShape({
        x1: start.x,
        y1: start.y
      });
      leftRect.setShape({
        x: start.x - dotOffset,
        y: start.y - dotOffset
      });
      plan = targetRect.data;
      plan.concatId = targetPlan.id;
      plan.lineRightView = line;
      plan.lineRightRectView = leftRect;
    }
    );
    // 移动终点
    addDragEventListener(
    rightRect,
    (e) => {
      line.setShape({
        x2: e.offsetX - planGroup.position[0] + dragOffset.x,
        y2: e.offsetY - planGroup.position[1] + dragOffset.y,
      });
    },
    (targetRect) => {
      plan.concatId = targetRect.data.id;
      targetPlan.lineLeftView = null;
      targetPlan.lineLeftRectView = null;
      target = makeRectTargetPoint(targetRect.shape, rectHeight);
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
        const getBoundingRect = rect.getBoundingRect();
        dragOffset.x = getBoundingRect.x - e.offsetX + dotOffset;
        dragOffset.y = getBoundingRect.y - e.offsetY + dotOffset;
      })
      .on("drag", (e) => {
        dragEventHandler(e);
      })
      .on("dragend", (e) => {
        const position = planRectGroup.parent.position;
        const targetRect = planRectGroup.children().find((child) => {
          return child.getBoundingRect().contain(e.offsetX - position[0], e.offsetY - position[1]);
        });
        resetTransform(rect);
        if (targetRect) {
          dropEventHandler(targetRect);
        } else {
          // 没有目标回到初始位置
          start = makeRectStartPoint(line.leftData.rectView.shape, rectHeight);
          target = makeRectTargetPoint(line.rightData.rectView.shape, rectHeight);
          line.setShape({
            x1: start.x,
            y1: start.y,
            x2: target.x,
            y2: target.y,
          });
        }
      });
    }
  }
}
