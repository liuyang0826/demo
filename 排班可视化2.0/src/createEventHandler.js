export function createEventHandler (
{
  dataList,
  config: { splitTime, rectHeight, width, height, padding, lineSpacePX, lineDotWidth, iconSize, advanceSpaceTime },
  utils: { makeShapeByPlan },
  store: { getPlanById, getStartTime, ms2px, getScale },
}
) {
  dataList.forEach((item, xIndex) => {
    item.planList.forEach((plan, yIndex) => {
      addEventListener(plan, xIndex, yIndex);
    });
  });

  function addEventListener (plan, xIndex) {
    const rect = plan.rectView;
    // 鼠标偏移量
    const dragOffset = { x: 0, y: 0 };

    rect
    .on("dragstart", (e) => {
      planDragstartHandler(e, rect, dragOffset);
    })
    .on("drag", (e) => {
      planDragHandler(e, rect, dragOffset);
    })
    .on("dragend", (e) => {
      planDragendHandler(e, rect, dragOffset);
    });

    function planDragstartHandler (e, rect, dragOffset) {
      dragOffset.x = e.offsetX - rect.shape.x;
      dragOffset.y = e.offsetY - rect.shape.y;
    }

    function planDragHandler (e, rect, dragOffset) {
      moveLineLeft(rect.data.lineRightRectView, rect.data.lineRightView, {
        x: e.offsetX - dragOffset.x + rect.shape.width,
        y: e.offsetY - dragOffset.y + rectHeight / 2
      });
      moveLineRight(rect.data.lineLeftRectView, rect.data.lineLeftView, {
        x: e.offsetX - dragOffset.x,
        y: e.offsetY - dragOffset.y + rectHeight / 2
      });
    }

    function planDragendHandler (e, rect, dragOffset) {
      const _ms2px = ms2px(getScale());
      const { xIndex: newX, prev } = getInsertInfoByEvent(e, _ms2px);
      resetTransform(rect);
      plan.startTime = (e.offsetX - dragOffset.x) / _ms2px + getStartTime();
      plan.endTime = plan.startTime + rect.shape.width / _ms2px;
      const newShape = makeShapeByPlan(plan, newX, getStartTime(), _ms2px);
      rect.setShape(newShape);
      moveLineLeft(rect.data.lineRightRectView, rect.data.lineRightView, {
        x: newShape.x + rect.shape.width,
        y: newShape.y + rectHeight / 2
      });
      moveLineRight(rect.data.lineLeftRectView, rect.data.lineLeftView, {
        x: newShape.x,
        y: newShape.y + rectHeight / 2
      });
      let oldPrev = plan.prev || plan.next;

      // 双向链表操作
      if (newX === xIndex) { // 本行内移动
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
            plan.next = dataList[newX].planList[0];
            plan.next.prev = plan;
            dataList[newX].planList[0] = plan;
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
          dataList[xIndex].planList[0] = plan.next;
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
          plan.next = dataList[newX].planList[0];
          plan.next.prev = plan;
          dataList[newX].planList[0] = plan;
        }
      }

      const changeToRight = advanceTime(newX, plan.prev || plan, true);
      const changeToLeft = advanceTime(xIndex, oldPrev, false);

      xIndex = newX;
    }

    function getInsertInfoByEvent (e, _ms2px) {
      let x = e.offsetX;
      let y = e.offsetY;
      x -= dragOffset.x;
      let xIndex = ~~((y - padding.top + lineSpacePX / 2) / lineSpacePX);
      if (xIndex >= dataList.length) {
        xIndex = dataList.length - 1;
      }

      let current = dataList[xIndex].planList[0];

      while (current) {
        const rect = current.rectView.shape;
        if (x <= rect.x + rect.width + advanceSpaceTime * _ms2px) {
          if (x < rect.x) {
            current = current.prev;
          }
          break;
        }
        current = current.next;
      }

      return { xIndex, prev: current };
    }
  }

  // 顺移时间 flag true -> 后移 false -> 前移
  function advanceTime (xIndex, prev, flag) {
    const space = advanceSpaceTime;
    if (flag) {
      let current = prev.next;
      while (current) {
        if (current.startTime - current.prev.endTime >= space) {
          break;
        }
        const advance = (current.prev.endTime - current.startTime) + space;
        current.startTime += advance;
        current.endTime += advance;

        const newShape = makeShapeByPlan(current, xIndex, getStartTime(), ms2px());
        current.rectView.setShape(newShape);

        moveLineLeft(current.lineRightRectView, current.lineRightView, {
          x: newShape.x + current.rectView.shape.width,
          y: newShape.y + rectHeight / 2
        });
        moveLineRight(current.lineLeftRectView, current.lineLeftView, {
          x: newShape.x,
          y: newShape.y + rectHeight / 2
        });
        if (current === current.next) {
          throw Error()
        }
        current = current.next;
      }
    } else {
      let current = prev.next;
      while (current) {
        const advance = (current.startTime - current.prev.endTime) - space;
        current.startTime -= advance;
        current.endTime -= advance;

        const newShape = makeShapeByPlan(current, xIndex, getStartTime(), ms2px());
        current.rectView.setShape(newShape);
        moveLineLeft(current.lineRightRectView, current.lineRightView, {
          x: newShape.x + current.rectView.shape.width,
          y: newShape.y + rectHeight / 2
        });
        moveLineRight(current.lineLeftRectView, current.lineLeftView, {
          x: newShape.x,
          y: newShape.y + rectHeight / 2
        });
        if (current === current.next) {
          throw Error()
        }
        current = current.next;
      }
    }
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
}
