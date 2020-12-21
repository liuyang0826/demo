import { rootState } from "../Root";
import { types } from "../Element";
import { makeRectVertexes } from "../helpers";

export function startRectResize (root) {
  if (root.state === rootState.rectResize) return;
  root.state = rootState.rectResize;
  root.elements.forEach((element) => {
    element.type === types.rect && element.startResize();
  });
}

export function endRectResize (root) {
  if (root.state !== rootState.rectResize) return;
  root.state = rootState.off;
  root.elements.forEach((element) => {
    element.type === types.rect && element.endResize();
  });
}

export function addRectResize (rect) {
  rect.on("click", click);

  function click () {
    if (rect.vertexes.length) return;
    rect.addVertexes();
  }

  return () => {
    rect.off("click", click);
  };
}

export function addVertexResize (vertex) {
  const root = vertex.root;
  vertex.on("mousedown", mousedown);

  let prevEvent;

  function mousedown (e) {
    if (e.event.button !== 0) return;
    prevEvent = e;
    root.on("mousemove", mousemove);
    root.on("mouseup", mouseup);

    function mousemove (e) {
      const offset = {
        x: e.offsetX - prevEvent.offsetX,
        y: e.offsetY - prevEvent.offsetY,
      };
      vertex.follow(offset);
      prevEvent = e;
    }

    function mouseup () {
      root.off("mousemove", mousemove);
      root.off("mouseup", mouseup);
    }
  }

  return () => {
    root.off("mousedown", mousedown);
  };
}

export function elementFollowResize (element, vertex, offset) {
  [
    resizeRectLT,
    resizeRectT,
    resizeRectRT,
    resizeRectR,
    resizeRectRB,
    resizeRectB,
    resizeRectLB,
    resizeRectL,
  ][vertex.index](element, offset);
}

export function vertexFollowElement (element) {
  let circleArr = makeRectVertexes(element);
  circleArr.forEach((point, index) => {
    element.vertexes[index].setShape({
      cx: point[0],
      cy: point[1]
    });
  });
}

export function lineFollowElement (element, vertex, offset) {
  [
    lineFollowLT,
    lineFollowT,
    lineFollowRT,
    lineFollowR,
    lineFollowRB,
    lineFollowB,
    lineFollowLB,
    lineFollowL,
  ][vertex.index](element, offset);
}

// 左上
function resizeRectLT (rect, offset) {
  const shape = rect.shape;
  shape.x += offset.x;
  shape.y += offset.y;
  shape.width -= offset.x;
  shape.height -= offset.y;
}

// 上
function resizeRectT (rect, offset) {
  const shape = rect.shape;
  shape.y += offset.y;
  shape.height -= offset.y;
}

// 右上
function resizeRectRT (rect, offset) {
  const shape = rect.shape;
  // shape.x -= offset.x;
  shape.width += offset.x;
  shape.y += offset.y;
  shape.height -= offset.y;
}

// 右
function resizeRectR (rect, offset) {
  const shape = rect.shape;
  // shape.x -= offset.x;
  shape.width += offset.x;
}

// 右下
function resizeRectRB (rect, offset) {
  const shape = rect.shape;
  // shape.x -= offset.x;
  shape.width += offset.x;
  shape.height += offset.y;
}

// 下
function resizeRectB (rect, offset) {
  const shape = rect.shape;
  // shape.y -= offset.y;
  shape.height += offset.y;
}

// 左下
function resizeRectLB (rect, offset) {
  const shape = rect.shape;
  shape.x += offset.x;
  shape.width -= offset.x;
  shape.height += offset.y;
}

// 左
function resizeRectL (rect, offset) {
  const shape = rect.shape;
  shape.x += offset.x;
  shape.width -= offset.x;
}

// 左上
function lineFollowLT (rect, offset) {
  const elementMap = rect.root.elementMap;
  rect.lines.forEach(item => {
    const line = elementMap[item.id];
    line.isFollowStart = item.isStart;
    const points = line.shape.points;
    const point = item.isStart ? points[0] : points[points.length - 1];
    if (line.isStartVertical || line.isEndVertical) {
      line.follow({
        x: (point[0] < rect.shape.x || point[0] > rect.shape.x + rect.shape.width) ? offset.x : 0,
        y: item.isBottom ? 0 : offset.y
      });
    } else {
      line.follow({
        x: item.isRight ? 0 : offset.x,
        y: (point[1] < rect.shape.y || point[1] > rect.shape.y + rect.shape.height) ? offset.y : 0
      });
    }
  });
}

// 上
function lineFollowT (rect, offset) {
  const elementMap = rect.root.elementMap;
  rect.lines.forEach(item => {
    const line = elementMap[item.id];
    line.isFollowStart = item.isStart;
    if (line.isStartVertical || line.isEndVertical) {
      line.follow({
        x: 0,
        y: item.isBottom ? 0 : offset.y
      });
    } else {
      const points = line.shape.points;
      const point = item.isStart ? points[0] : points[points.length - 1];
      line.follow({
        x: 0,
        y: (point[1] < rect.shape.y || point[1] > rect.shape.y + rect.shape.height) ? offset.y : 0
      });
    }
  });
}

// 右上
function lineFollowRT (rect, offset) {
  const elementMap = rect.root.elementMap;
  rect.lines.forEach(item => {
    const line = elementMap[item.id];
    line.isFollowStart = item.isStart;
    const points = line.shape.points;
    const point = item.isStart ? points[0] : points[points.length - 1];
    if (line.isStartVertical || line.isEndVertical) {
      line.follow({
        x: (point[0] < rect.shape.x || point[0] > rect.shape.x + rect.shape.width) ? offset.x : 0,
        y: item.isBottom ? 0 : offset.y
      });
    } else {
      line.follow({
        x: item.isRight ? offset.x : 0,
        y: (point[1] < rect.shape.y || point[1] > rect.shape.y + rect.shape.height) ? offset.y : 0
      });
    }
  });
}

// 右
function lineFollowR (rect, offset) {
  const elementMap = rect.root.elementMap;
  rect.lines.forEach(item => {
    const line = elementMap[item.id];
    line.isFollowStart = item.isStart;
    if (!line.isStartVertical && !line.isEndVertical) {
      line.follow({
        x: item.isRight ? offset.x : 0,
        y: 0
      });
    } else {
      const points = line.shape.points;
      const point = item.isStart ? points[0] : points[points.length - 1];
      line.follow({
        x: (point[0] < rect.shape.x || point[0] > rect.shape.x + rect.shape.width) ? offset.x : 0,
        y: 0
      });
    }
  });
}

// 右下
function lineFollowRB (rect, offset) {
  const elementMap = rect.root.elementMap;
  rect.lines.forEach(item => {
    const line = elementMap[item.id];
    line.isFollowStart = item.isStart;
    const points = line.shape.points;
    const point = item.isStart ? points[0] : points[points.length - 1];
    if (line.isStartVertical || line.isEndVertical) {
      line.follow({
        x: (point[0] < rect.shape.x || point[0] > rect.shape.x + rect.shape.width) ? offset.x : 0,
        y: item.isBottom ? offset.y : 0
      });
    } else {
      line.follow({
        x: item.isRight ? offset.x : 0,
        y: (point[1] < rect.shape.y || point[1] > rect.shape.y + rect.shape.height) ? offset.y : 0
      });
    }
  });
}

// 下
function lineFollowB (rect, offset) {
  const elementMap = rect.root.elementMap;
  rect.lines.forEach(item => {
    const line = elementMap[item.id];
    line.isFollowStart = item.isStart;
    if (line.isStartVertical || line.isEndVertical) {
      line.follow({
        x: 0,
        y: item.isBottom ? offset.y : 0
      });
    } else {
      const points = line.shape.points;
      const point = item.isStart ? points[0] : points[points.length - 1];
      line.follow({
        x: 0,
        y: (point[1] < rect.shape.y || point[1] > rect.shape.y + rect.shape.height) ? offset.y : 0
      });
    }
  });
}

// 左下
function lineFollowLB (rect, offset) {
  const elementMap = rect.root.elementMap;
  rect.lines.forEach(item => {
    const line = elementMap[item.id];
    line.isFollowStart = item.isStart;
    const points = line.shape.points;
    const point = item.isStart ? points[0] : points[points.length - 1];
    if (line.isStartVertical || line.isEndVertical) {
      line.follow({
        x: (point[0] < rect.shape.x || point[0] > rect.shape.x + rect.shape.width) ? offset.x : 0,
        y: item.isBottom ? offset.y : 0
      });
    } else {
      line.follow({
        x: item.isRight ? 0 : offset.x,
        y: (point[1] < rect.shape.y || point[1] > rect.shape.y + rect.shape.height) ? offset.y : 0
      });
    }
  });
}

// 左
function lineFollowL (rect, offset) {
  const elementMap = rect.root.elementMap;
  rect.lines.forEach(item => {
    const line = elementMap[item.id];
    line.isFollowStart = item.isStart;
    if (!line.isStartVertical && !line.isEndVertical) {
      line.follow({
        x: item.isRight ? 0 : offset.x,
        y: 0
      });
    } else {
      const points = line.shape.points;
      const point = item.isStart ? points[0] : points[points.length - 1];
      line.follow({
        x: (point[0] < rect.shape.x || point[0] > rect.shape.x + rect.shape.width) ? offset.x : 0,
        y: 0
      });
    }
  });
}
