export function EventFulZR () {}

EventFulZR.prototype = {
  on (type, fn) {
    this.el.on(type, fn);
  },

  off (type, fn) {
    this.el.off(type, fn);
  }
};
