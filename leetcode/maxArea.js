// 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。
// 在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。
// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
//
// 说明：你不能倾斜容器，且 n 的值至少为 2。

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let max = 0;
  for (let i = 0; i < height.length - 1; i++) {
    for (let j = 1; j < height.length; j++) {
      max = Math.max(Math.min(height[i], height[j]) * (j - i), max);
    }
  }
  return max;
};

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea1 = function (height) {
  let i = 0, j = height.length - 1, max = 0;
  while (i < j) {
    const left = height[i], right = height[j];
    max = Math.max(Math.min(height[i], height[j]) * (j - i), max);
    if (left < right) {
      i++
    } else {
      j--;
    }
  }
  return max;
};

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
console.log(maxArea1([1, 8, 6, 2, 5, 4, 8, 3, 7]));
