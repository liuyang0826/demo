import { Element } from "../Element";
import { mixin } from "../helpers";
import { DomEventFul } from "../DomEventFul";
import { addMove } from "../handler/moveRect";
import { rootState } from "../Root";
import { addDrawLine } from "../handler/drawLine";

export class Rect extends Element {
  constructor (opts) {
    super(opts);
    DomEventFul.call(this);
    this.lines = [];
    this._$eventFns = [];
    this._$eventWrapperFns = [];
  }

  get type () {
    return "rect";
  }

  default () {
    this.shape = {
      x: 0,
      y: 0,
      width: 200,
      height: 100
    };
    this.style = {
      position: "absolute;",
      "box-sizing": "border-box;",
      border: "1px solid #000;",
    };
  }

  render () {
    const div = document.createElement("div");
    const shape = this.shape;
    const style = this.style;
    div.style.cssText =
    `left: 0;top:0;transform: translate3d(${shape.x}px, ${shape.y}px, 0);width: ${shape.width}px;height: ${shape.height}px;` + Object.keys(style)
    .map(key => {
      return key + ":" + style[key];
    })
    .join("");
    this.el = div;
  }

  addToRoot (root) {
    root.el.appendChild(this.el);
    this._$root = root;
    switch (root.state) {
      case rootState.move:
        this.startMove();
        break;
      case rootState.drawLine:
        this.startDrawLine();
        break;
    }
  }

  removeFromRoot (root) {
    root.el.removeChild(this.el);
    this.removeListener();
  }

  setShape (shape) {
    super.setShape(shape);
    this.el.style.transform = `translate3d(${shape.x}px, ${shape.y}px, 0)`;
  }

  // 跟随鼠标
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

  removeListener () {
    this.endMove();
    this.endDrawLine();
  }

  // 开始移动
  startMove () {
    this.endMove = addMove(this);
  }

  endMove () {}

  // 开始画线
  startDrawLine () {
    this.endDrawLine = addDrawLine(this);
  }

  endDrawLine () {}
}

mixin(Rect, DomEventFul);
