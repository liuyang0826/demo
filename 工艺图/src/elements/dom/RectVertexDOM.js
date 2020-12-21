import { RectVertex } from "../RectVertex";
import { platforms } from "../../Root";
import { mixin } from "../../helpers";
import { EventFulDOM } from "../../event/EventFulDOM";

export class RectVertexDOM extends RectVertex {
  constructor (opts) {
    super(opts);
    EventFulDOM.call(this);
    this.platform = platforms.dom;
  }

  init () {
    super.init();
    this.style = {
      position: "absolute",
      left: "0px",
      top: "0px",
      "box-sizing": "border-box",
      "border-radius": "50%",
      cursor: "pointer",
      border: "1px solid #000",
      background: "#fff"
    };
  }

  render () {
    super.render();
    const div = document.createElement("div");
    const shape = this.shape;
    const style = this.style;
    div.style.cssText =
    `transform: translate3d(${shape.cx - shape.r}px, ${shape.cy - shape.r}px, 0);width: ${shape.r * 2}px;height: ${shape.r * 2}px;` + Object.keys(style)
    .map(key => {
      return key + ":" + style[key] + ";";
    })
    .join("");
    this.el = div;
  }

  setShape (shape) {
    super.setShape(shape);
    this.el.style.transform = `translate3d(${this.shape.cx - this.shape.r}px, ${this.shape.cy - this.shape.r}px, 0)`;
  }
}

mixin(RectVertexDOM, EventFulDOM);
