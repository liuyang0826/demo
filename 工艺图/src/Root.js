import { init } from "zrender";
import { mixin } from "./helpers";
import { DomEventFul } from "./DomEventFul";
import { endRectMove, startRectMove } from "./handler/moveRect";
import { endDrawLine, startDrawLine } from "./handler/drawLine";

export const rootState = {
  off: 0,
  move: 1,
  drawLine: 2,
};

export class Root {
  constructor (el) {
    DomEventFul.call(this);
    el.style.position = "absolute";
    this.el = el;
    this.zr = init(el);
    this._$root = this;
    this.elements = [];
    this.elementMap = {};
    this.state = rootState.drawLine;
    // 画连接线
    this.curDrawLine = null;
    this.curDrawLineStartRect = null;
    this.isNewPoint = false;
  }

  add (element) {
    element.addToRoot(this);
    this.elements.push(element);
    this.elementMap[element.id] = element;
  }

  remove (element) {
    element.removeFromRoot(this);
    const idx = this.elements.findIndex(d => d === element);
    if (idx !== -1) {
      this.elements.splice(idx, 1);
      delete this.elementMap[element.id];
    }
  }

  startRectMove () {
    this.endDrawLine();
    startRectMove(this);
  }

  endRectMove () {
    endRectMove(this);
  }

  startDrawLine () {
    this.endRectMove();
    startDrawLine(this);
  }

  endDrawLine () {
    endDrawLine(this);
  }
}

mixin(Root, DomEventFul);
