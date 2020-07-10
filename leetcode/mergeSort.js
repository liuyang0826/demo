// 归并排

/**
 * @param {number[]} list
 * @return {number[]}
 */

var mergeSort = function (list) {
  if (list.length <= 1) {
    return list;
  }
  let middle = ~~(list.length / 2);
  let left = mergeSort(list.slice(0, middle));
  let right = mergeSort(list.slice(middle));
  return merge(left, right);
};

/**
 * @param {number[]} left
 * @param {number[]} right
 * @return {number[]}
 */
var merge = function (left, right) {
  let leftIndex = 0;
  let rightIndex = 0;
  let result = [];
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }
  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }
  return result;
};

console.log(mergeSort([1, 2, 3, 1, 3, 4, 2, 6, 8, 2, 3]));
