/**
 * @description 所有元素的抽象类
 **/

export class Element {
  constructor (opts) {
    this.shape = {}
    this.style = {}
    for (var name in opts) {
      if (opts.hasOwnProperty(name)) {
        this[name] = opts[name];
      }
    }
    this.render();
  }

  // Interface
  render () {}

  // Interface
  addToRoot() {}

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
