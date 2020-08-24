import { makeShapeByPlan, ms2px, resetTransform } from "../utils";
import { config } from "../config";

export function createDragPlanHandler (data) {
  data.forEach((item, xIndex) => {
    let current = item.head;
    while (current) {
      addEventListener(current, xIndex);
      current = current.next;
    }
  });

  function addEventListener (plan, xIndex) {
    // 鼠标偏移量
    const dragOffset = { x: 0, y: 0 };
    plan.rectView
    .on("dragstart", (e) => {
      planDragstartHandler(e, plan, dragOffset);
      e.cancelBubble = true
    })
    .on("drag", (e) => {
      planDragHandler(e, plan, dragOffset);
      e.cancelBubble = true
    })
    .on("dragend", (e) => {
      xIndex = planDragendHandler(e, plan, dragOffset, xIndex);
      e.cancelBubble = true
    });
  }

  function planDragstartHandler (e, plan, dragOffset) {
    const rect = plan.rectView;
    dragOffset.x = e.offsetX - rect.shape.x;
    dragOffset.y = e.offsetY - rect.shape.y;
    console.log(plan.textView);
  }

  function planDragHandler (e, plan, dragOffset) {
    const rect = plan.rectView;
    rect.zlevel = 99;
    // 连接线跟随
    movePlanAttachedLine(rect.data, { x: e.offsetX - dragOffset.x, y: e.offsetY - dragOffset.y }, 99);
  }

  function planDragendHandler (e, plan, dragOffset, xIndex) {
    const rect = plan.rectView;
    rect.zlevel = 1;
    const _ms2px = ms2px();
    const { xIndex: newXIndex, prev } = getInsertInfoByPoint({ x: e.offsetX - dragOffset.x, y: e.offsetY }, _ms2px);
    resetTransform(rect, plan.rectView.parent.parent.position[0]);
    plan.startTime = (e.offsetX - dragOffset.x) / _ms2px + config.startTime;
    plan.endTime = plan.startTime + rect.shape.width / _ms2px;
    const newShape = makeShapeByPlan(plan, newXIndex);
    rect.setShape(newShape);
    movePlanAttachedLine(rect.data, newShape, 1);
    let oldPrev = plan.prev || plan.next;

    // 双向链表操作
    if (newXIndex === xIndex) { // 本行内移动
      if (prev) {
        if (prev !== plan) {
          if (plan.prev) {
            console.log(1);
            plan.prev.next = plan.next;
            plan.next.prev = plan.prev;
            plan.next = prev.next;
            prev.next.prev = plan;
            prev.next = plan;
            plan.prev = prev;
          } else {
            console.log(2);
            const last = plan.next.next;
            plan.next.prev = null;
            plan.next.next = plan;
            plan.prev = plan.next;
            plan.next = last;
            last.prev = plan;
          }
        }
      } else { // 跨行移动
        if (plan.prev) {
          console.log(3);
          plan.prev.next = plan.next;
          plan.next.prev = plan.prev;
          plan.prev = null;
          plan.next = data[newXIndex].head;
          plan.next.prev = plan;
          data[newXIndex].head = plan;
        }
      }
    } else {
      if (plan.prev) {
        console.log(4);
        plan.prev.next = plan.next;
        plan.next.prev = plan.prev;
      } else {
        console.log(5);
        plan.next.prev = null;
        data[xIndex].head = plan.next;
      }
      if (prev) {
        console.log(6);
        plan.next = prev.next;
        prev.next.prev = plan;
        prev.next = plan;
        plan.prev = prev;
      } else {
        console.log(7);
        plan.prev = null;
        plan.next = data[newXIndex].head;
        plan.next.prev = plan;
        data[newXIndex].head = plan;
      }
    }

    advanceTime(newXIndex, plan.prev || plan, true);
    advanceTime(xIndex, oldPrev, false);

    plan.xIndex = newXIndex;

    return newXIndex;
  }

  function getInsertInfoByPoint ({ x, y }, _ms2px) {
    let xIndex = ~~((y - config.padding.top + config.lineSpacePX / 2) / config.lineSpacePX);
    if (xIndex >= data.length) {
      xIndex = data.length - 1;
    }

    let current = data[xIndex].head;

    while (current) {
      const rect = current.rectView.shape;
      if (x <= rect.x + rect.width + config.advanceSpaceTime * _ms2px) {
        if (x < rect.x) {
          current = current.prev;
        }
        break;
      }
      current = current.next;
    }

    return { xIndex, prev: current };
  }

  // 顺移时间 flag true -> 后移 false -> 前移
  function advanceTime (xIndex, prev, flag) {
    let current = prev.next;
    while (current) {
      if (flag) {
        if (current.startTime - current.prev.endTime >= config.advanceSpaceTime) {
          break;
        }
        const advance = (current.prev.endTime - current.startTime) + config.advanceSpaceTime;
        current.startTime += advance;
        current.endTime += advance;
      } else {
        const advance = (current.startTime - current.prev.endTime) - config.advanceSpaceTime;
        current.startTime -= advance;
        current.endTime -= advance;
      }

      const newShape = makeShapeByPlan(current, xIndex);
      current.rectView.setShape(newShape);
      movePlanAttachedLine(current, newShape, 1);
      if (current === current.next) {
        throw Error();
      }
      current = current.next;
    }
  }

  // 联动关系线
  function movePlanAttachedLine (plan, { x, y }, zlevel) {
    if (plan.lineRightRectView) {
      plan.lineRightRectView.zlevel = zlevel;
      plan.lineRightView.zlevel = zlevel;
      moveLineLeft(plan.lineRightRectView, plan.lineRightView, {
        x: x + plan.rectView.shape.width,
        y: y + config.rectHeight / 2
      });
    }
    if (plan.lineLeftRectView) {
      plan.lineLeftRectView.zlevel = zlevel;
      plan.lineLeftView.zlevel = zlevel;
      moveLineRight(plan.lineLeftRectView, plan.lineLeftView, {
        x: x,
        y: y + config.rectHeight / 2
      });
    }
  }

  function moveLineLeft (rightRect, line, start) {
    line.setShape({
      x1: start.x,
      y1: start.y
    });
    rightRect.setShape({
      x: start.x - config.lineDotWidth / 2,
      y: start.y - config.lineDotWidth / 2
    });
  }

  function moveLineRight (leftRect, line, end) {
    line.setShape({
      x2: end.x,
      y2: end.y
    });
    leftRect.setShape({
      x: end.x - config.lineDotWidth / 2,
      y: end.y - config.lineDotWidth / 2
    });
  }
}
