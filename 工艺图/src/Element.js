/**
 * @description 所有元素的抽象类
 **/
import { uid } from "./helpers";

export class Element {
  constructor (opts) {
    this.shape = {}
    this.style = {}
    for (var name in opts) {
      if (opts.hasOwnProperty(name)) {
        this[name] = opts[name];
      }
    }
    console.log(opts.id);
    this.id = opts.id || uid();
    this.render();
  }

  // Interface
  render () {}

  // Interface
  addToRoot() {}

  // Interface
  follow (offset) {}

  // Interface
  setShape () {}
}
