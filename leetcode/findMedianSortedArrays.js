// 给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
//
// 请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
//
// 你可以假设 nums1 和 nums2 不会同时为空。

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let totalLen = nums1.length + nums2.length;
  let center = Math.floor(totalLen / 2) - 1;
  if (totalLen % 2) {
    center++;
  }
  let left;
  let leftIndex = 0;
  let right;
  let rightIndex = 0;

  while ((leftIndex < nums1.length || rightIndex < nums2.length) && (left === undefined || right === undefined)) {

    if (nums1[leftIndex] < nums2[rightIndex]) {
      if (leftIndex < nums1.length) {
        move(true, leftIndex, rightIndex);
        leftIndex++;
      } else {
        move(false, leftIndex, rightIndex);
        rightIndex++;
      }
    } else {
      if (rightIndex < nums2.length) {
        move(false, leftIndex, rightIndex);
        rightIndex++;
      } else {
        move(true, leftIndex, rightIndex);
        leftIndex++;
      }
    }
  }

  function move (isLeft) {
    let current = leftIndex + rightIndex;
    if (current === center) {
      left = isLeft ? nums1[leftIndex] : nums2[rightIndex];
      if (totalLen % 2) {
        right = left;
      }
    }
    if (current === center + 1) {
      right = isLeft ? nums1[leftIndex] : nums2[rightIndex];
    }
  }

  return (left + right) / 2;
};
console.log(findMedianSortedArrays([1, 2], [3]));
