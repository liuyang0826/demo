export function makeMap (list, fn) {
  const map = {};
  list.forEach((item, index) => {
    fn(map, item, index)
  });
  return map;
}
