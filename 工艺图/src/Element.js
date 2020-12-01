import { guid } from "./helpers";
import { Contextmenu } from "./Contextmenu";

export const types = {
  rect: 1,
  line: 2,
  rectVertex: 3
};

/**
 * @description 所有元素的抽象类
 **/

export class Element {
  constructor (opts) {
    this.id = guid();
    this.init();
    for (var name in opts) {
      if (opts.hasOwnProperty(name) && name !== "shape" && name !== "style") {
        this[name] = opts[name];
      }
    }
    this.shape = {
      ...this.shape,
      ...opts.shape
    };
    this.style = {
      ...this.style,
      ...opts.style
    };
    this.render();
  }

  init () {
    this.shape = {};
    this.style = {};
  }

  // Interface
  render () {}

  // Interface
  addToRoot (root) {
    this.root = root;
    Contextmenu.call(this);
  }

  // Interface
  removeFromRoot (root) {
    this.root = null;
    this.offContextmenu();
  }

  // Interface
  follow (offset) {}

  // Interface
  setShape (shape) {
    this.shape = {
      ...this.shape,
      ...shape,
    };
  }
}
