import { Rect } from "../Rect";
import { platforms } from "../../Root";
import { eachObj, mixin } from "../../helpers";
import { EventFulDOM } from "../../event/EventFulDOM";
import { RectVertexDOM } from "./RectVertexDOM";

export class RectDOM extends Rect {
  constructor (opts) {
    super(opts);
    this.platform = platforms.dom;
    EventFulDOM.call(this);
  }

  init () {
    super.init();
    this.style = {
      position: "absolute",
      left: "0px",
      top: "0px",
      "box-sizing": "border-box",
      border: "1px solid #000",
    };
  }

  render () {
    super.render();
    const div = document.createElement("div");
    const shape = this.shape;
    const style = this.style;
    eachObj(style, (value, key) => {
      div.style[key] = value;
    })
    div.style.transform = `translate3d(${shape.x}px, ${shape.y}px, 0)`;
    div.style.width = `${shape.width}px`;
    div.style.height = `${shape.height}px`;
    div.style.background = `url(${this.image}) center/100% 100%`;
    this.el = div;
  }

  setShape (shape) {
    super.setShape(shape);
    this.el.style.transform =
    `translate3d(${this.shape.x + (this.shape.width < 0
    ? this.shape.width
    : 0)}px, ${this.shape.y + (this.shape.height < 0 ? this.shape.height : 0)}px, 0)`;
    this.el.style.width = `${Math.abs(this.shape.width)}px`;
    this.el.style.height = `${Math.abs(this.shape.height)}px`;
  }

  makeVertex (opts) {
    super.makeVertex(opts);
    return new RectVertexDOM(opts);
  }

  setImage (image) {
    super.setImage(image);
    this.el.style.background = `url(${this.image}) center/100% 100%`;
  }
}

mixin(RectDOM, EventFulDOM);
