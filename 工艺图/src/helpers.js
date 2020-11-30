export function defaults(target, source, overlay) {
  for (var key in source) {
    if (source.hasOwnProperty(key)
    && (overlay ? source[key] != null : target[key] == null)
    ) {
      target[key] = source[key];
    }
  }
  return target;
}

export function mixin(target, source, overlay) {
  target = 'prototype' in target ? target.prototype : target;
  source = 'prototype' in source ? source.prototype : source;

  defaults(target, source, overlay);
}

let id = 1;
export function uid () {
  return id++;
}

export function lastItem(list, index = 1) {
  return list[list.length - index];
}
