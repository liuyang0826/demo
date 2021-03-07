// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if(intervals.length === 1) {
    return intervals
  }
  intervals.sort((a, b) => a[0] - b[0])
  const result = []
  let cur = intervals[0]
  for (let i = 1; i < intervals.length; i++) {
    if (cur[1] >= intervals[i][0]) {
      cur = [cur[0], Math.max(intervals[i][1], cur[1])]
    } else {
      result.push(cur)
      cur = intervals[i]
    }
  }
  result.push(cur)
  return result
}
console.log(merge([[1, 4], [2, 3]]))
