// 快排

/**
 * @param {number[]} list
 * @return {number[]}
 */
var quickSort = function (list) {
  function f (list, i, j) {
    if(i < j) {
      let left = i;
      let right = j;
      let pivot = list[left];
      while(i < j) {
        while(list[j] >= pivot && i < j) {  // 从后往前找比基准小的数
          j--;
        }
        if(i < j) {
          list[i] = list[j];
          i++
        }
        while(list[i] <= pivot && i < j) {  // 从前往后找比基准大的数
          i++;
        }
        if(i < j) {
          list[j] = list[i];
          j--
        }
      }
      list[i] = pivot;
      f(list, left, i-1);
      f(list, i+1, right);
    }
  }
  f(list, 0, list.length - 1)
};

let a = [1,2,3,4,1,2,3,51,2]
quickSort(a)
console.log(a);
