import { Element } from "../Element";
import { Polyline } from "zrender";
import { lineAutoBreak, lineVertexFollow, lineVertexNextFollow } from "../handler/moveRect";

export class Line extends Element {
  constructor (opts) {
    super(opts);
  }

  get type () {
    return "line";
  }

  default () {
    this.shape = {
      points: [[0, 0]]
    };
    this.style = {
      lineWidth: 1,
      stroke: "#000",
      text: "",
      fontSize: 16,
      textFill: "#999"
    };
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

  removeFromRoot (root) {
    root.zr.remove(this.el);
  }

  setShape (shape) {
    super.setShape(shape);
    this.el.setShape(shape);
  }

  on (type, fn) {
    this.el.on("type", fn);
  }

  off (type, fn) {
    this.el.off("type", fn);
  }

  follow (offset) {
    const points = this.shape.points;

    lineVertexFollow(this, offset);

    if (points.length > 2) {
      lineVertexNextFollow(this);
    } else {
      lineAutoBreak(this);
    }

    this.el.setShape({
      points: points
    });
  }
}
