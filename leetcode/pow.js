/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  let res = 1
  let i = Math.abs(n);
  while (i > 0) {
    if (i % 2 === 1) {
      res *= x
    }
    x *= x;
    i = ~~(i / 2)
  }
  return n < 0 ? 1 / res : res
}

console.log(myPow(2, -2))
