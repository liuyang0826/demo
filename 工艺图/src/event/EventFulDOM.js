export function EventFulDOM () {
  this.eventFns = [];
  this.eventWrapperFns = [];
}

EventFulDOM.prototype = {
  constructor: EventFulDOM,
  on (type, fn) {
    const rootEl = this.root.el;
    const wrapperFn = (event) => {
      fn({ offsetX: event.clientX - rootEl.offsetLeft, offsetY: event.clientY - rootEl.offsetTop, event });
    };
    this.eventFns.push(fn);
    this.eventWrapperFns.push(wrapperFn);
    this.el.addEventListener(type, wrapperFn);
  },

  off (type, fn) {
    const idx = this.eventFns.findIndex(d => d === fn);
    if (idx !== -1) {
      const wrapperFn = this.eventWrapperFns[idx];
      this.eventFns.splice(idx, 1);
      this.eventWrapperFns.splice(idx, 1);
      this.el.removeEventListener(type, wrapperFn);
    }
  }
};
