function f (nums, groups) {
  const map = {}
  for (let i = 0; i < groups.length; i++) {
    map[groups[i][2]] = []
  }
  for (let i = 0; i < nums.length; i++) {
    if (map[nums[i]]) {
      map[nums[i]].push(i + 1)
    }
  }
  const result = []
  for (let i = 0; i < groups.length; i++) {
    const indexes = map[groups[i][2]]
    if (!indexes.length) {
      result.push(0)
    }
    let count = 0
    for (let j = 0; j < indexes.length; j++) {
      if (indexes[j] >= groups[i][0] && indexes[j] <= groups[i][1]) {
        count++
      }
    }
    result.push(count)
  }
  return result
}

// console.log(f([1, 2, 3, 3, 4, 3, 5], [[1, 2, 1], [2, 4, 5], [3, 5, 3]]))

function findKth (a, K) {
  // write code here
  function fn (arr, k) {
    const left = []
    const right = []
    const mid = ~~(arr.length / 2)
    for (let i = 0; i < arr.length; i++) {
      if (i === mid) continue
      if (arr[i] < arr[mid]) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
    if (left.length === k - 1) {
      return arr[mid]
    } else if (left.length < k) {
      return fn(right, k - left.length - 1)
    } else {
      return fn(left, k)
    }
  }

  return fn(a, K)
}

console.log(findKth([1, 2, 3, 4, 4,7,6,7,8,9,10], 6))
