export function defaults (target, source, overlay) {
  for (var key in source) {
    if (source.hasOwnProperty(key)
    && (overlay ? source[key] != null : target[key] == null)
    ) {
      target[key] = source[key];
    }
  }
  return target;
}

export function mixin (target, source, overlay) {
  target = "prototype" in target ? target.prototype : target;
  source = "prototype" in source ? source.prototype : source;

  defaults(target, source, overlay);
}

export function guid () {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
    v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function lastItem (list, index = 1) {
  return list[list.length - index];
}
