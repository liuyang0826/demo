import { Element, types } from "../Element";
import { Polyline } from "zrender";
import { lineAutoBreak, lineVertexFollow, lineVertexNextFollow } from "../handler/rectMove";
import { EventFulZR } from "../event/EventFulZR";
import { mixin } from "../helpers";

export class Line extends Element {
  constructor (opts) {
    super(opts);
    this.type = types.line;
    EventFulZR.call(this);
  }

  init () {
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
    super.render();
    this.el = new Polyline({
      shape: this.shape,
      style: this.style
    });
  }

  addToRoot (root) {
    super.addToRoot(root);
    root.zr.add(this.el);
  }

  removeFromRoot (root) {
    super.removeFromRoot(root);
    root.zr.remove(this.el);
  }

  setShape (shape) {
    super.setShape(shape);
    this.el.setShape(this.shape);
  }

  follow (offset) {
    const points = this.shape.points;

    lineVertexFollow(this, offset);

    if (points.length > 2) {
      lineVertexNextFollow(this);
    } else {
      lineAutoBreak(this);
    }

    this.setShape({
      points: points
    });
  }

}

mixin(Line, EventFulZR);
