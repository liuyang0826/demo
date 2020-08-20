// 线
function drawLine (ctx, pointList, { color = "#000", width = 2, lineJoin = "round", isDash = false } = {}) {
  if (pointList.length < 2) {
    return;
  }
  ctx.beginPath();
  ctx.setLineDash(isDash ? [10, 6] : []);
  const start = pointList[0];
  ctx.moveTo(start[0], start[1]);
  for (let i = 1; i < pointList.length; i++) {
    const cur = pointList[i];
    ctx.lineTo(cur[0], cur[1]);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineJoin = lineJoin;
  ctx.stroke();
}

// 矩形
function drawRect (ctx, { x, y, w, h }, {
  borderColor = "#999",
  borderWidth = 1,
  color = "#ccc",
  borderTop = true,
  borderRight = true,
  borderBottom = true,
  borderLeft = true,
  fill = true
} = {}) {
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = borderWidth;
  // ctx.lineJoin = "round";
  x = Math.round(x);
  y = Math.round(y);
  w = Math.round(w);
  // 解决线模糊问题
  if (borderWidth % 2) {
    x += 0.5;
    y += 0.5;
  }
  ctx.fillStyle = color;
  ctx.strokeRect(x, y, w, h);
  const offset = borderWidth / 2;
  let xOffset = -offset;
  if (borderLeft) {
    xOffset = offset;
  }
  let wOffset = -borderWidth;
  if (!borderLeft && !borderRight) {
    wOffset = borderWidth;
  } else if (!borderLeft || !borderRight) {
    wOffset = 0;
  }

  let yOffset = -offset;
  if (borderTop) {
    yOffset = offset;
  }
  let hOffset = -borderWidth;
  if (!borderTop && !borderBottom) {
    hOffset = borderWidth;
  } else if (!borderTop || !borderBottom) {
    hOffset = 0;
  }

  ctx.fillRect(x + xOffset, y + yOffset, w + wOffset, h + hOffset);
}

// 文字
function drawText (ctx, { text, x, y }, { color = "#333" } = {}) {
  ctx.beginPath();
  ctx.font = "14px bold PingFang-SC-Bold";
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

// 图标
function drawIcon (ctx, icon, { x, y, w, h, size }) {
  let width = 0;
  let height = 0;
  if (icon.width > icon.height) {
    width = size;
    height = (icon.height * size) / icon.width;
  } else {
    height = size;
    width = (icon.width * size) / icon.height;
  }

  ctx.drawImage(icon, 0, 0, icon.width, icon.height, x, y, width, height);
}

// 裁减矩形区域 溢出隐藏
function clipRect (ctx, { x, y, w, h }, execute) {
  ctx.save();
  ctx.rect(x, y, w, h);
  ctx.clip();
  execute();
  ctx.restore();
}

export function createRender (
{
  ctx,
  offCtx,
  offCanvas,
  staticCtx,
  config: { splitTime, rectHeight, width, height, padding, lineSpacePX, lineDotWidth, iconSize },
  utils: {},
  store: { getDataList, getConcatList, getPlanById, getRectById, getStartTime, ms2px, getTranslateX },
  icons
}
) {

  function render ({ afterRender, forceUpdate = false, init = false } = {}) {
    requestAnimationFrame(() => {
      if (init) {
        staticCtx.clearRect(0, 0, width, height);
        renderLines();
      }
      ctx.clearRect(0, 0, width, height);
      if (forceUpdate) {
        offCtx.clearRect(0, 0, width, height);
        renderPlans();
        renderConcatLines();
        renderSplitLine();
      }
      renderOffCanvas();
      afterRender && afterRender();
    });
  }

  function renderOffCanvas () {
    ctx.drawImage(offCanvas, getTranslateX(), 0, width - padding.left - padding.right, height);
  }

  function renderLines () {
    getDataList().forEach((item, i) => {
      let curY = i * lineSpacePX + padding.top;
      drawLine(staticCtx, [[padding.left, curY], [width - padding.right, curY]], { width: 64, color: "#eee" });
      drawText(staticCtx, { text: item.name, x: 50, y: curY });
    });
  }

  function renderPlans () {
    getDataList().forEach((item) => {
      item.planList.forEach((item) => {
        renderPlan(offCtx, getRectById(item.id), item);
      });
    });
  }

  function renderPlan (ctx, { x, y, w, h, subRectList }, item) {
    const startTime = item.startTime;
    const endTime = item.endTime;
    // 时间线分割
    if (startTime <= splitTime && splitTime <= endTime) {
      let leftRectBoundary = {
        x: x,
        y: y,
        w: (splitTime - startTime) * ms2px(),
        h: rectHeight,
      };
      drawRect(ctx, leftRectBoundary, {
        borderRight: false
      });
      drawRect(ctx, {
        x: x + leftRectBoundary.w,
        y: y,
        w: w - (splitTime - startTime) * ms2px(),
        h: rectHeight,
      }, {
        borderLeft: false,
        color: "orange"
      });
    } else if (startTime < splitTime) {
      drawRect(ctx, { x, y, w, h });
    } else {
      drawRect(ctx, { x, y, w, h }, {
        color: "orange"
      });
    }

    // 子任务
    subRectList.forEach((rect, index) => {
      // drawRect(ctx, rect, { fill: false, borderLeft: index !== 0, borderRight: false });
    });

    // 任务图标
    item.icon && drawIcon(ctx, icons[item.icon], { x, y, w, h, size: iconSize });

    // 任务名称
    item.name && drawText(ctx, {
      text: item.name,
      x: x + w / 2,
      y: y + h / 2,
    });
  }

  // 渲染关系线
  function renderConcatLines () {
    getConcatList().forEach((item) => {
      let targetPlan = getPlanById(item.concatId);
      if (!targetPlan) {
        console.error(JSON.stringify(item));
        return;
      }
      const endTime = item.endTime;
      const concatStartTime = targetPlan.startTime;
      if (endTime > concatStartTime) {
        // return;
      }
      let startRect = getRectById(item.id);
      let endRect = getRectById(targetPlan.id);
      renderConcatLine(offCtx, { x: startRect.x + startRect.w, y: startRect.y + rectHeight / 2 }, {
        x: endRect.x,
        y: endRect.y + rectHeight / 2
      }, endTime > splitTime || concatStartTime > splitTime ? "#f00" : "#999");
    });
  }

  function renderConcatLine (ctx, start, target, color) {
    drawLine(ctx, [
      [start.x, start.y],
      [target.x, target.y]
    ], {
      isDash: true,
      color: color
    });
    const dotOffset = lineDotWidth / 2;
    drawRect(ctx, {
      x: start.x - dotOffset,
      y: start.y - dotOffset,
      w: lineDotWidth,
      h: lineDotWidth
    }, { color: "green", borderColor: "green" });
    drawRect(ctx, { x: target.x - dotOffset, y: target.y - dotOffset, w: lineDotWidth, h: lineDotWidth }, {
      color: "green",
      borderColor: "green"
    });
  }

  // 时间分割线
  function renderSplitLine () {
    const curX = (splitTime - getStartTime()) * ms2px();
    drawLine(offCtx, [[curX, 0], [curX, height]], { color: "#999", isDash: true });
  }

  return {
    render,
    renderPlan,
    renderConcatLine
  };
}
