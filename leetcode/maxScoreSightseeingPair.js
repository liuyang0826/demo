// 给定正整数数组 A，A[i] 表示第 i 个观光景点的评分，并且两个景点 i 和 j 之间的距离为 j - i。
//
// 一对景点（i < j）组成的观光组合的得分为（A[i] + A[j] + i - j）：景点的评分之和减去它们两者之间的距离。
//
// 返回一对观光景点能取得的最高分。

/**
 * @param {number[]} A
 * @return {number}
 */
var maxScoreSightseeingPair = function (A) {
  let max = -Infinity;
  let a = A[0];
  for (let i = 1; i < A.length; i++) {
    max = Math.max(max, a + A[i] - i);
    a = Math.max(a, A[i] + i);
  }
  return max;
};
maxScoreSightseeingPair([8, 1, 5, 2, 6]);
