import { init } from "zrender";
import { mixin } from "./helpers";
import { DomEventFul } from "./DomEventFul";
import { endRectMove, startMove } from "./handler/move";

export class Root {
  constructor (el) {
    DomEventFul.call(this);
    this.el = el;
    this.zr = init(el);
    this._$root = this;
    this.elements = [];
    this.elementMap = {};
  }

  add (el) {
    el.addToRoot(this);
    this.elements.push(el);
    this.elementMap[el.id] = el;
  }

  startMove () {
    startMove(this);
  }

  endRectMove () {
    endRectMove(this);
  }
}

mixin(Root, DomEventFul);
