// 给两个整数数组 A 和 B ，返回两个数组中公共的、长度最长的子数组的长度。

/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var findLength = function (A, B) {
  let short = A;
  let long = B;
  if (A.length >= B.length) {
    short = B;
    long = A;
  }
  if (!short.length) {
    return 0
  }
  let subStart = 0;
  let subEnd = 1;
  let maxLength = 1;
  while (subStart < short.length) {
    let curSubArr = short.slice(subStart, subEnd);
    for (let i = 0; i < long.length; i++) {
      if (long[i] === curSubArr[0]) {

      }
    }
  }
};
