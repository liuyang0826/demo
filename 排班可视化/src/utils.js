export function makeMap (list, fn) {
  const map = {};
  list.forEach((item, index) => {
    fn(map, item, index);
  });
  return map;
}

export function loadIcon (src) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}
