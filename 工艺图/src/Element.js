import { guid } from "./helpers";

/**
 * @description 所有元素的抽象类
 **/

export class Element {
  constructor (opts) {
    this.id = guid()
    this.default();
    for (var name in opts) {
      if (opts.hasOwnProperty(name) && name !== "shape" && name !== "style") {
        this[name] = opts[name];
      }
    }
    this.shape = {
      ...this.shape,
      ...opts.shape
    }
    this.style = {
      ...this.style,
      ...opts.style
    }
    this.render();
  }

  default () {
    this.shape = {};
    this.style = {};
  }

  // Interface
  render () {}

  // Interface
  addToRoot (root) {}

  // Interface
  removeFromRoot (root) {}

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
