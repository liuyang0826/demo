import { makeRectStartPoint, makeRectTargetPoint, resetTransform } from "../utils";
import { config } from "../config";

export function createDragLineHandler (data, id2plan, updateCenterStore, updateConcatLines, updateConcatLine) {
  data.forEach((item) => {
    let targetPlan = id2plan[item.concatId];
    targetPlan && addEventListener(item, targetPlan);
  });

  function addEventListener (plan, targetPlan) {
    const leftRect = plan.lineRightRectView;
    const rightRect = targetPlan.lineLeftRectView;
    const polyline = plan.lineRightView;
    const shape = polyline.shape;
    const planGroup = polyline.parent;
    const planRectGroup = plan.rectView.parent;
    // 端点
    const dotOffset = config.lineDotWidth / 2;
    // 移动起点
    addDragEventListener(
    leftRect,
    (e) => {
      polyline.setShape({
        points: [
          [
            e.offsetX - planGroup.position[0] + dragOffset.x + planGroup.position[0],
            e.offsetY - planGroup.position[1] + dragOffset.y
          ], shape.points[3] || shape.points[1]
        ]
      });
    },
    (targetRect) => {
      const remove = plan;
      plan.concatId = null;
      plan.lineRightView = null;
      plan.lineRightRectView = null;

      plan = targetRect.data;
      plan.concatId = targetPlan.id;
      plan.lineRightView = polyline;
      polyline.leftData = plan;
      plan.lineRightRectView = leftRect;

      const start = makeRectStartPoint(targetRect.shape);
      leftRect.setShape({
        x: start.x - dotOffset,
        y: start.y - dotOffset
      });
      updateCenterStore({ add: plan, remove });
      updateConcatLines();
    }
    );
    // 移动终点
    addDragEventListener(
    rightRect,
    (e) => {
      polyline.setShape({
        points: [
          shape.points[0],
          [
            e.offsetX - planGroup.position[0] + dragOffset.x + planGroup.position[0],
            e.offsetY - planGroup.position[1] + dragOffset.y
          ]
        ]
      });
    },
    (targetRect) => {
      plan.concatId = targetRect.data.id;
      targetPlan.lineLeftView = null;
      targetPlan.lineLeftRectView = null;

      targetRect.data.lineLeftView = polyline;
      polyline.rightData = targetRect.data;

      targetRect.data.lineLeftRectView = rightRect;
      targetPlan = targetRect.data;

      const target = makeRectTargetPoint(targetRect.shape);
      rightRect.setShape({
        x: target.x - dotOffset,
        y: target.y - dotOffset
      });
      updateCenterStore();
      updateConcatLines();
    });

    // 鼠标偏移量
    const dragOffset = { x: 0, y: 0 };

    function addDragEventListener (rect, dragEventHandler, dropEventHandler) {
      rect.on("dragstart", (e) => {
        e.cancelBubble = true;
        rect.zlevel = 1;
        polyline.zlevel = 1;
        const getBoundingRect = rect.getBoundingRect();
        dragOffset.x = getBoundingRect.x - e.offsetX + dotOffset;
        dragOffset.y = getBoundingRect.y - e.offsetY + dotOffset;
      })
      .on("drag", (e) => {
        e.cancelBubble = true;
        dragEventHandler(e);
      })
      .on("dragend", (e) => {
        e.cancelBubble = true;
        rect.zlevel = 0;
        polyline.zlevel = 0;
        const position = planRectGroup.parent.position;
        const targetRect = planRectGroup.children().find((child) => {
          if (child.getBoundingRect().contain(e.offsetX - position[0], e.offsetY - position[1])) {
            return true;
          }
        });
        resetTransform(rect, rect.parent.position[0]);
        if (targetRect) {
          dropEventHandler(targetRect);
        } else {
          updateConcatLine(plan)
        }
      });
    }
  }
}
