import { Element } from "../Element";
import { Polyline } from "zrender";
import { lastItem } from "../helpers";

export class Line extends Element {
  constructor (opts) {
    super(opts);
  }

  render () {
    this.el = new Polyline({
      shape: this.shape,
      style: this.style
    });
  }

  addToRoot (root) {
    root.zr.add(this.el);
  }

  setShape (shape) {
    super.setShape(shape);
    this.el.setShape(shape)
  }

  on (type, fn) {
    this.el.on("type", fn);
  }

  off (type, fn) {
    this.el.off("type", fn);
  }

  follow (offset) {
    const points = this.shape.points;

    lineVertexFollow(this, offset)

    if (points.length > 2) {
      lineVertexNextFollow(this);
    } else {
      lineAutoBreak(this);
    }

    this.el.setShape({
      points: points
    })
  }
}

// 线顶点跟随拖动
function lineVertexFollow(line, offset) {
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
function lineVertexNextFollow(line) {
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
function lineAutoBreak(line) {
  const points = line.shape.points;

  if (line.isStartVertical || line.isEndVertical) {
    if (points[0][0] !== points[1][0]) {
      let halfY = ~~((points[1][1] - points[0][1]) / 2);
      points.splice(
      1,
      0,
      [points[0][0], points[0][1] + halfY],
      [points[1][0], points[0][1] + halfY]
      );
    }
  } else {
    if (points[0][1] !== points[1][1]) {
      let halfX = ~~((points[1][0] - points[0][0]) / 2);
      points.splice(
      1,
      0,
      [points[0][0] + halfX, points[0][1]],
      [points[0][0] + halfX, points[1][1]]
      );
    }
  }
}
