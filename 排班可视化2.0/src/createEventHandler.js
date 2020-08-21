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

  function addEventListener (plan, xIndex, yIndex) {
    const rect = plan.rectView;
    // 鼠标偏移量
    const dragOffset = { x: 0, y: 0 };

    rect
    .on("dragstart", (e) => {
      planDragstartHandler(e, rect, dragOffset)
    })
    .on("drag", (e) => {
      planDragHandler(e, rect, dragOffset)
    })
    .on("dragend", (e) => {
      planDragendHandler(e, rect, dragOffset)
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
      const { xIndex: newX, yIndex: newY, isOverlay } = getInsertInfoByEvent(e, _ms2px);
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
    }

    function getInsertInfoByEvent (e, _ms2px) {
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
        const rect = planList[yIndex].rectView.shape;
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
    const planList = dataList[xIndex].planList;
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
          x: newShape.x + rightPlan.rectView.shape.width,
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
          x: newShape.x + rightPlan.rectView.shape.width,
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
