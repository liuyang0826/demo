import { rootState } from "../Root";
import { lastItem } from "../helpers";
import { types } from "../Element";

export function startRectMove (root) {
  if (root.state === rootState.rectMove) return;
  root.state = rootState.rectMove;
  root.elements.forEach((element) => {
    element.type === types.rect && element.startMove();
  });
}

export function endRectMove (root) {
  if (root.state !== rootState.rectMove) return;
  root.state = rootState.off;
  root.elements.forEach((element) => {
    element.type === types.rect && element.endMove();
  });
}

export function addRectMove (rect) {
  const root = rect.root;
  rect.on("mousedown", mousedown);

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
      rect.follow(offset);
      prevEvent = e;
    }

    function mouseup () {
      root.off("mousemove", mousemove);
      root.off("mouseup", mouseup);
    }
  }

  return () => {
    rect.off("mousedown", mousedown);
  };
}

// 线顶点跟随拖动
export function lineVertexFollow (line, offset) {
  if (line.isFollowStart) {
    const first = line.shape.points[0];
    first[0] += offset.x;
    first[1] += offset.y;
  } else {
    const last = lastItem(line.shape.points);
    last[0] += offset.x;
    last[1] += offset.y;
  }
}

// 与端点相连的点跟随
export function lineVertexNextFollow (line) {
  const points = line.shape.points;
  if (line.isFollowStart) {
    const point = points[1];
    const first = points[0];
    if (line.isStartVertical) {
      point[0] = first[0];
    } else {
      point[1] = first[1];
    }
  } else {
    const point = points[points.length - 2];
    const last = points[points.length - 1];
    if (line.isEndVertical) {
      point[0] = last[0];
    } else {
      point[1] = last[1];
    }
  }
}

// 线自动转折
export function lineAutoBreak (line) {
  const points = line.shape.points;

  if (line.isStartVertical || line.isEndVertical) {
    if (points[0][0] !== points[1][0]) {
      let halfY = (points[1][1] - points[0][1]) / 2;
      points.splice(
      1,
      0,
      [points[0][0], ~~(points[0][1] + halfY) + 0.5],
      [points[1][0], ~~(points[0][1] + halfY) + 0.5]
      );
    }
  } else {
    if (points[0][1] !== points[1][1]) {
      let halfX = ~~((points[1][0] - points[0][0]) / 2);
      points.splice(
      1,
      0,
      [~~(points[0][0] + halfX) + 0.5, points[0][1]],
      [~~(points[0][0] + halfX) + 0.5, points[1][1]]
      );
    }
  }
}
