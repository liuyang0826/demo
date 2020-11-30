export function DomEventFul() {
  this._$eventFns = [];
  this._$eventWrapperFns = [];
}

DomEventFul.prototype = {
  constructor: DomEventFul,
  on (type, fn) {
    const rootEl = this._$root.el
    const wrapperFn = (e) => {
      fn({ offsetX: e.clientX - rootEl.offsetLeft, offsetY: e.clientY - rootEl.offsetTop });
    };
    this._$eventFns.push(fn);
    this._$eventWrapperFns.push(wrapperFn);
    this.el.addEventListener(type, wrapperFn);
  },

  off (type, fn) {
    const idx = this._$eventFns.findIndex(d => d === fn);
    if (idx !== -1) {
      const wrapperFn = this._$eventWrapperFns[idx]
      this._$eventFns.splice(idx, 1);
      this._$eventWrapperFns.splice(idx, 1);
      this.el.removeEventListener(type, wrapperFn);
    }
  }
}
