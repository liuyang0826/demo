import { init } from "zrender";
import { mixin } from "./helpers";
import { EventFulDOM } from "./event/EventFulDOM";
import { endRectMove, startRectMove } from "./handler/rectMove";
import { endDrawLine, startDrawLine } from "./handler/drawLine";
import { endRectResize, startRectResize } from "./handler/rectResize";

export const rootState = {
  off: 1,
  rectMove: 2,
  rectResize: 3,
  drawLine: 4,
};

export const platforms = {
  dom: 1,
  zr: 2
};

export class Root {
  constructor (opts) {
    EventFulDOM.call(this);
    for (var name in opts) {
      if (opts.hasOwnProperty(name)) {
        this[name] = opts[name];
      }
    }
    const el = opts.el
    el.style.position = "absolute";
    this.el = el;
    this.zr = init(el);
    this.elements = [];
    this.elementMap = {};
    this.root = this;
    this.state = rootState.rectMove;
    // 画连接线
    this.curDrawLine = null;
    this.curDrawLineStartRect = null;
    this.isNewPoint = false;
    // 缩放
    this.curResizeElement = null;
  }

  add (element) {
    switch (element.platform) {
      case platforms.dom:
        this.el.appendChild(element.el);
        break;
      case platforms.zr:
        this.zr.add(element.el);
        break;
    }
    element.addToRoot(this);
    this.elements.push(element);
    this.elementMap[element.id] = element;
  }

  remove (element) {
    switch (element.platform) {
      case platforms.dom:
        this.el.removeChild(element.el);
        break;
      case platforms.zr:
        this.zr.remove(element.el);
        break;
    }
    element.removeFromRoot(this);
    const idx = this.elements.findIndex(d => d === element);
    if (idx !== -1) {
      this.elements.splice(idx, 1);
      delete this.elementMap[element.id];
    }
  }

  clearHandler () {
    this.endDrawLine();
    this.endRectMove();
    this.endRectResize();
  }

  // 移动方块
  startRectMove () {
    this.clearHandler();
    startRectMove(this);
  }

  endRectMove () {
    endRectMove(this);
  }

  // 画线
  startDrawLine () {
    this.clearHandler();
    startDrawLine(this);
  }

  endDrawLine () {
    endDrawLine(this);
  }

  // 缩放
  startRectResize () {
    this.clearHandler();
    startRectResize(this);
  }

  endRectResize () {
    endRectResize(this);
  }
}

mixin(Root, EventFulDOM);
