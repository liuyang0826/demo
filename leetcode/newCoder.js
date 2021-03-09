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

// console.log(findKth([1, 2, 3, 4, 4,7,6,7,8,9,10], 6))
function minNumberdisappered (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 0 && arr[i] < arr.length - 1) {
      swap(arr[i])
    }
  }

  function swap (i) {
    if (i >= arr.length) return
    if (arr[i] !== i) {
      let temp = arr[i]
      arr[i] = i
      swap(temp, temp)
    }
  }

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== i) {
      return i
    }
  }
  return arr[arr.length - 1] + 1
}

// console.log(minNumberdisappered([1,2,3,4]))

function removeWithoutCopy (arr, item) {
  let prev = 0
  while (arr[prev] !== item && prev < arr.length) {
    prev++
  }
  if (prev === arr.length) {
    return arr
  }
  let next = prev
  while (next < arr.length) {
    while (arr[prev] !== item) {
      prev++
    }
    while (arr[next] === item) {
      next++
      if (next === arr.length) {
        arr.length = prev
        return arr
      }
    }
    arr[prev] = arr[next]
    arr[next] = item
  }
}

// console.log(removeWithoutCopy([1, 2, 3, 2, 3, 4, 3, 3, 3], 3))
function cssStyle2DomStyle (sName) {
  let str = ''
  let nextUpper = false
  for (let i = 0; i < sName.length; i++) {
    if (sName[i] === '-') {
      nextUpper = true
    } else if (nextUpper) {
      str += sName[i].toUpperCase()
      nextUpper = false
    } else {
      str += sName[i]
    }
  }
  return str
}

function makeClosures (arr, fn) {
  return arr.map((item) => {
    return () => {
      return fn(item)
    }
  })
}

const result = makeClosures([1, 2, 3], function (x) {
  return x * x
})
// console.log(result[2]())

function flat (arr) {
  let i = 0
  while (i < arr.length) {
    while (Array.isArray(arr[i]) && curLevel < level) {
      arr.splice(i, 1, ...arr[i])
    }
    i++
  }
  return arr
}

// console.log(flat([[1, 2, [3]], 4, [[5, 6, [8, [9]]], 7]], 3))

function makeLimit (limit) {
  return function (arr) {
    let index = 0;
    let isError = false;
    return new Promise((resolve, reject) => {
      for (let i = 0; i < limit; i++) {
        next(i);
      }
      function next (i) {
        if (isError) return;
        if (index === arr.length) {
          resolve()
        }
        return arr[index++]().then(() => {
          next(i);
        }).catch(() => {
          isError = true;
          reject()
        })
      }
    })
  }
}

const limiter = makeLimit(2);

function success() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("success")
      resolve()
    }, 1000)
  })
}

function fail() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("fail")
      reject()
    }, 1000)
  })
}

limiter([success, fail, success, success, success, success, success])
