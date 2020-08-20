export function createEventHandler (
{
  root,
  render: { render, renderPlan, renderConcatLine },
  ctx,
  config: { padding, scaleSpeed, lineSpacePX, advanceSpaceTime, lineDotWidth, rectHeight },
  utils: { makeRectByPlan },
  store: { getScale, setScale, setStartTime, getStartTime, makeId2Rect, getRectById, getPlanById, setRectAtId, ms2px, getDataList, getConcatList, updateConcat, setTranslateX, getTranslateX },
  history: { pushHistory, rollback },
  beforeMove
}
) {
  const teardownListeners = installListener();

  function installListener () {
    root.addEventListener("click", handleClick);
    root.addEventListener("mousewheel", handleMousewheel);
    root.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeydown);
    return function teardownListeners () {
      root.removeEventListener("click", handleClick);
      root.removeEventListener("mousewheel", handleMousewheel);
      root.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeydown);
    };
  }

  function handleClick (e) {
    const { getRectByPoint } = this;
    // console.log(getRectByPoint({ x: e.clientX, y: e.clientY }));
  }

  function handleMousewheel (e) {
    const { x } = eventToCanvasPoint(e);
    const _ms2px = ms2px();
    setScale(getScale() + scaleSpeed * (e.wheelDelta > 0 ? 1 : -1));
    getScale() <= 0 && setScale(0.01);
    setStartTime(getStartTime() + x * (1 / _ms2px - 1 / ms2px()));
    makeId2Rect();
    render({ forceUpdate: true });
  }

  function handleKeydown (e) {
    if (e.ctrlKey && e.code === "KeyZ") {
      rollback();
    }
  }

  let curMovingLine = null;
  let curMovingRect = null;
  let curTranslate = null;

  function handleMouseDown (e) {
    const point = eventToCanvasPoint(e);
    curMovingLine = makeCurMovingLineByPoint(point);
    curMovingRect = makeCurMovingRectByPoint(point);
    curTranslate = makeCurTranslateByPoint(point);
    document.addEventListener("mousemove", handleMousemove);
    document.addEventListener("mouseup", handleMouseup);
  }

  function handleMousemove (e) {
    if (!(curMovingRect || curTranslate || curMovingLine)) return;
    translateByEvent(e);
    render({
      afterRender: () => {
        moveLineByEvent(e);
        moveRectByEvent(e);
      },
      forceUpdate: !curMovingRect || !curMovingLine
    });
  }

  function handleMouseup (e) {
    document.removeEventListener("mousemove", handleMousemove);
    document.removeEventListener("mouseup", handleMouseup);
    if (insertRectByEvent(e) || changeConcatLine(e)) {
      render({ forceUpdate: true })
    }
  }

  // 移动方块
  function makeCurMovingRectByPoint ({ x, y }) {
    if (curMovingLine) return;
    const rectInfo = getRectInfoByPoint({ x, y });
    if (rectInfo && (!beforeMove || beforeMove(getPlanById(rectInfo.id)))) {
      const curRect = getRectById(rectInfo.id);
      return {
        ...rectInfo,
        offsetX: x - curRect.x,
        offsetY: y - curRect.y
      };
    }
  }

  function getRectInfoByPoint ({ x, y }) {
    const dataList = getDataList();
    let index = ~~((y - padding.top + lineSpacePX / 2) / lineSpacePX);
    if (index < dataList.length) {
      const planList = dataList[index].planList;
      const first = planList[0];
      if (first) {
        const rect = getRectById(first.id);
        if (y >= rect.y && y <= rect.y + rect.h) {
          for (let yIndex = planList.length - 1; yIndex >= 0; yIndex--) {
            const rectBoundary = getRectById(planList[yIndex].id);
            if (x <= rectBoundary.x + rectBoundary.w && x >= rectBoundary.x) {
              return {
                xIndex: index,
                yIndex: yIndex,
                id: planList[yIndex].id
              };
            }
          }
        }
      }
    }
  }

  function moveRectByEvent (e) {
    if (!curMovingRect) return;
    const curRectId = curMovingRect.id;
    const rect = { ...getRectById(curRectId) };
    const { x, y } = eventToCanvasPoint(e);
    rect.x = x - curMovingRect.offsetX;
    rect.y = y - curMovingRect.offsetY;
    // console.log(makeRectByPlan(getPlanById(curRectId)));
    renderPlan(ctx, rect, getPlanById(curRectId));
  }

  function insertRectByEvent (e) {
    if (!curMovingRect) return;
    const dataList = getDataList();

    const insertInfo = getInsertInfoByEvent(e);
    const { xIndex, yIndex, isOverlay } = insertInfo;

    const plan = getPlanById(curMovingRect.id);
    const { x } = eventToCanvasPoint(e);

    const snapshot = { ...plan };
    const _ms2px = ms2px(getScale());
    plan.startTime = (x - curMovingRect.offsetX) / _ms2px + getStartTime();
    plan.endTime = plan.startTime + getRectById(curMovingRect.id).w / _ms2px;
    setRectAtId(curMovingRect.id, makeRectByPlan(plan, xIndex, getStartTime(), ms2px()));
    dataList[curMovingRect.xIndex].planList.splice(curMovingRect.yIndex, 1);
    let insertYIndex = yIndex;
    let advanceYIndex = yIndex;
    let fromYIndex = curMovingRect.yIndex;
    // 本行内移动
    if (xIndex === curMovingRect.xIndex) {
      if (yIndex > curMovingRect.yIndex) {
        insertYIndex--;
        const curIndexNext = curMovingRect.yIndex + 1;
        if ((yIndex === curIndexNext && !isOverlay) || yIndex > curIndexNext) {
          advanceYIndex--;
        }
      } else if (yIndex < curMovingRect.yIndex) {
        fromYIndex++;
      }
    }
    if (isOverlay && advanceYIndex > 0) {
      advanceYIndex--;
    }
    dataList[xIndex].planList.splice(insertYIndex, 0, plan);
    const changeToRight = advanceTime(xIndex, advanceYIndex, true);
    const changeToLeft = advanceTime(curMovingRect.xIndex, curMovingRect.yIndex, false);

    pushHistory({
      type: "move",
      detail: changeToRight.concat(changeToLeft).concat({
        from: { xIndex: curMovingRect.xIndex, yIndex: fromYIndex, snapshot },
        to: { xIndex: xIndex, yIndex: yIndex }
      })
    });
    curMovingRect = null;
    return true;
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

        setRectAtId(rightPlan.id, makeRectByPlan(rightPlan, xIndex, getStartTime(), ms2px()));

        rightYIndex++;
        leftPlan = rightPlan;
      }
    } else {
      if (yIndex === 0) {
        yIndex = 1
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

        setRectAtId(rightPlan.id, makeRectByPlan(rightPlan, xIndex, getStartTime(), ms2px()));

        rightYIndex++;
        leftPlan = rightPlan;
      }
    }
    return changeList;
  }

  function getInsertInfoByEvent (e) {
    const dataList = getDataList();
    let { x, y } = eventToCanvasPoint(e);
    x -= curMovingRect.offsetX;
    let xIndex = ~~((y - padding.top + lineSpacePX / 2) / lineSpacePX);
    if (xIndex >= dataList.length) {
      xIndex = dataList.length - 1;
    }
    const planList = dataList[xIndex].planList;
    let isOverlay = false;
    let yIndex = 0;
    const _ms2px = ms2px();
    for (; yIndex < planList.length; yIndex++) {
      const rect = getRectById(planList[yIndex].id);
      if (x <= rect.x + rect.w + advanceSpaceTime * _ms2px) {
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

  // 移动关系线
  function makeCurMovingLineByPoint ({ x, y }) {
    const lineInfo = getLineInfoByPoint({ x, y });
    if (lineInfo) {
      return lineInfo;
    }
  }

  function moveLineByEvent (e) {
    if (!curMovingLine) return;
    if (curMovingLine.end) {
      renderConcatLine(ctx, eventToCanvasPoint(e), curMovingLine.point, "red");
    } else {
      renderConcatLine(ctx, curMovingLine.point, eventToCanvasPoint(e), "red");
    }
  }

  function getLineInfoByPoint ({ x, y }) {
    const dotOffset = lineDotWidth / 2;
    const concatList = getConcatList();
    for (let i = 0; i < concatList.length; i++) {
      const item = concatList[i];
      const startRect = getRectById(item.id);
      const start = {
        x: startRect.x + startRect.w - dotOffset,
        y: startRect.y + rectHeight / 2 - dotOffset,
        w: lineDotWidth,
        h: lineDotWidth
      };

      const endRect = getRectById(item.concatId);
      const end = {
        x: endRect.x - dotOffset, y: endRect.y + rectHeight / 2 - dotOffset, w: lineDotWidth, h: lineDotWidth
      };

      // 移起点
      if (isInReact(start)) {
        return {
          id: item.id,
          endId: item.concatId,
          point: {
            x: endRect.x,
            y: endRect.y + rectHeight / 2
          }
        };
      }
      // 移终点
      if (isInReact(end)) {
        return {
          id: item.concatId,
          startId: item.id,
          point: {
            x: startRect.x + startRect.w,
            y: startRect.y + rectHeight / 2
          },
        };
      }
    }

    function isInReact (rect) {
      if (x > rect.x && x < rect.x + rect.w && y > rect.y && y < rect.y + rect.h) {
        return true;
      }
    }
  }

  function changeConcatLine (e) {
    if (!curMovingLine) return;
    const target = getRectInfoByPoint(eventToCanvasPoint(e));
    if (!target) return true;
    const targetId = target.id;
    if (getPlanById(targetId).concatId) return true;
    if (curMovingLine.endId) {
      delete getPlanById(curMovingLine.id).concatId;
      const targetPlan = getPlanById(targetId);
      targetPlan.concatId = curMovingLine.endId;
      updateConcat(curMovingLine.id, targetPlan);
    } else {
      getPlanById(curMovingLine.startId).concatId = targetId;
    }

    pushHistory({
      type: "moveLine",
      detail: curMovingLine.endId ? {
        type: "changeStart",
        from: curMovingLine.id,
        to: targetId,
        concatId: curMovingLine.endId
      } : {
        type: "changeEnd",
        from: curMovingLine.id,
        concatId: curMovingLine.startId
      }
    });
    curMovingLine = null;
    return true;
  }

  // 平移
  function makeCurTranslateByPoint ({ x, y }) {
    if (curMovingLine || curMovingRect) return;
    return { x, y };
  }

  function translateByEvent (e) {
    if (!curTranslate) return;
    const { x } = eventToCanvasPoint(e);
    setStartTime(getStartTime() + (curTranslate.x - x) / ms2px());
    makeId2Rect();
    // setTranslateX(getTranslateX() - (curTranslate.x - x));
    curTranslate.x = x;
  }

  function eventToCanvasPoint (e) {
    return {
      x: e.clientX - padding.left,
      y: e.clientY
    };
  }

  return {
    teardownListeners
  };
}
