import { Element } from "../Element";
import { mixin } from "../helpers";
import { DomEventFul } from "../DomEventFul";

export class Rect extends Element {
  constructor (opts) {
    super(opts);
    DomEventFul.call(this);
    this.type = "rect";
    this._$eventFns = [];
    this._$eventWrapperFns = [];
  }

  render () {
    const div = document.createElement("div");
    const shape = this.shape;
    const style = {
      ...{
        position: "absolute;",
        "box-sizing": "border-box;",
        "border": "1px solid #000;"
      },
      ...this.style
    };
    div.style.cssText =
    `left: 0; top: 0;transform: translate3d(${shape.x}px, ${shape.y}px, 0);width: ${shape.width}px;height: ${shape.height}px;` + Object.keys(style)
    .map(key => key + ":" + style[key])
    .join("");
    this.el = div;
  }

  addToRoot (root) {
    root.el.appendChild(this.el);
    this._$root = root;
  }

  setShape (shape) {
    this.shape = {
      ...this.shape,
      ...shape,
    };
    this.el.style.transform = `translate3d(${shape.x}px, ${shape.y}px, 0)`;
  }

  follow (offset) {
    this.shape.x += offset.x;
    this.shape.y += offset.y;
    this.el.style.transform = `translate3d(${this.shape.x}px, ${this.shape.y}px, 0)`;

    const elementMap = this._$root.elementMap;
    this.lines.forEach((item) => {
      const line = elementMap[item.id];
      line.isFollowStart = item.isStart;
      line.follow(offset);
    });
  }
}

mixin(Rect, DomEventFul);
