const data = {
  a: 100,
  b: 200
}

function observe (data) {
  for (let key in data) {
    def(data, key)
  }
}

function def (data, key) {
  let value = data[key]
  data.hasOwnProperty(key) && Object.defineProperty(data, key, {
    set (v) {
      value = v + 10
    },
    get () {
      return value
    }
  })
}

// observe(data);
// console.log(data.a)
// data.a = 200
// console.log(data.a)
// console.log(data.c)
// data.c = 300
// console.log(data.c)

Function.prototype.myBind = function (context) {
  context.$$fn = this
  var args = []
  var parentArgs = arguments
  for (var i = 1; i < arguments.length; i++) {
    args.push('parentArgs[' + i + ']')
  }
  return function () {
    var _args = args.slice()
    for (var i = 0; i < arguments.length; i++) {
      _args.push('arguments[' + i + ']')
    }
    return eval('context.$$fn(' + _args.join(',') + ')')
  }
}

function a (a, b) {
  console.log(this.a, a, b)
  return this.a + a + b
}

// const a1 = a.myBind({a: 100}, 1000)
// const a2 = a.myBind({a: 100}, 1000)
// console.log(a1(200, 300))
// console.log(a1(200, 300))
// console.log(a1(200, 300))

function myInstanceOf (instance, Constructor) {
  if (instance === null || typeof instance !== 'object') {
    return false;
  }
  let curProto = instance.__proto__
  while (curProto) {
    if (curProto === Constructor.prototype) {
      return true
    }
    curProto = curProto.__proto__
  }
  return false
}

function quickSort (nums) {
  if (nums.length <= 1) {
    return nums;
  }
  const left = [];
  const right = [];
  const mid = ~~(nums.length * Math.random())
  const midVal = nums[mid];

  for (let i = 0; i < nums.length; i++) {
    if (i === mid) {
      continue
    }
    if (nums[i] < midVal) {
      left.push(nums[i])
    } else {
      right.push(nums[i])
    }
  }

  return [...quickSort(left), midVal, ...quickSort(right)]
}

function mergeSort (nums) {
  if (nums.length <= 1) {
    return nums
  }
  const mid = ~~(nums.length / 2);
  return merge(mergeSort(nums.slice(0, mid)), mergeSort(nums.slice(mid)))
}

function merge (a, b) {
  console.log(a, b)
  if (!a.length) {
    return b;
  }
  if (!b.length) {
    return a;
  }
  let i = 0, j = 0;
  const result = [];
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      result.push(a[i])
      i++
    } else {
      result.push(b[j])
      j++
    }
  }
  while (i < a.length) {
    result.push(a[i])
    i++
  }
  while (j < b.length) {
    result.push(b[j])
    j++
  }
  return result;
}

console.log(mergeSort([1, 2, 3, 1, 32, 4, 5, 2, 2, 34, 4]))
