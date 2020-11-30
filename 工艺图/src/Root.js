import { init } from "zrender";
import { mixin } from "./helpers";
import { DomEventFul } from "./DomEventFul";
import { endRectMove, startRectMove } from "./handler/move";
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
    this.curDrawLine = null;
    this.isNewPoint = false;
  }

  add (el) {
    el.addToRoot(this);
    this.elements.push(el);
    console.log(el.id);
    this.elementMap[el.id] = el;
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
