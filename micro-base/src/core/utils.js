const asyncTag = "[object AsyncFunction]";
const funcTag = "[object Function]";
const genTag = "[object GeneratorFunction]";
const nullTag = "[object Null]";
const proxyTag = "[object Proxy]";
const undefinedTag = "[object Undefined]";

export async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function isConstructable(fn) {
  const constructableFunctionRegex = /^function\b\s[A-Z].*/;
  const classRegex = /^class\b/;

  // 有 prototype 并且 prototype 上有定义一系列非 constructor 属性，则可以认为是一个构造函数
  return fn.prototype
    && Object.getOwnPropertyNames(fn.prototype).filter(k => k !== "constructor").length
    || constructableFunctionRegex.test(fn.toString())
    || classRegex.test(fn.toString());
}

function isObject(value) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return Object.prototype.toString.call(value);
}

export function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns "object" for typed arrays and other constructors.
  const tag = baseGetTag(value);
  return tag === funcTag || tag === genTag || tag === asyncTag || tag === proxyTag;
}

export function noop() {
  // No operation performed.
}
