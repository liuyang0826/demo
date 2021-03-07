/**
 * 在一个长度为n的数组里的所有数字都在0到n-1的范围内。
 * 数组中某些数字是重复的，
 * 但不知道有几个数字重复了，也不知道每个数字重复了几次。
 * 请找出数组中任意一个重复的数字。
 * 例如，如果输入长度为7的数组{2, 3, 1, 0, 2, 5, 3}，
 * 那么对应的输出是重复的数字2或者3。
 * @param {[]} list
 **/
function main (list) {
  const map = {}
  list.forEach((item) => {
    if (!map[item]) {
      map[item] = 1
    } else {
      map[item]++
    }
  })
  const res = []
  for (let i in map) {
    if (map[i] > 1) {
      res.push(i)
    }
  }
  return res
}

// console.log(main([2, 3, 1, 0, 2, 5, 3, 0]))

/**
 * 题目：请实现一个函数，把字符串中的每个空格替换成 “%20”。 例如输入 “We are happy.”，则输出”We%20are%20happy.”。
 **/
function replaceBlank (str) {
  let res = ''
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      res += '%20'
    } else {
      res += str[i]
    }
  }
  return res
}

// console.log(replaceBlank('We are happy.'))

/**
 * 两个栈实现队列
 **/
function createQueue () {
  const stack1 = []
  const stack2 = []
  return {
    append (val) {
      stack1.push(val)
    },
    del () {
      if (!stack1.length) {
        return
      }
      while (stack1.length > 1) {
        stack2.push(stack1.pop())
      }
      stack1.pop()
      while (stack2.length) {
        stack1.push(stack2.pop())
      }
      console.log(stack1)
    },
    display () {
      console.log(stack1)
    }
  }
}

/**
 * 两个队列实现栈
 **/
function createStack () {
  const queue1 = []
  const queue2 = []
  return {
    push (val) {
      queue1.push(val)
    },
    pop () {
      if (!queue1.length) {
        return
      }
      while (queue1.length > 1) {
        queue2.push(queue1.shift())
      }
      queue1.shift()
      while (queue2.length) {
        queue1.push(queue2.shift())
      }
      console.log(queue1)
    },
    display () {
      console.log(queue1)
    }
  }
}

// const stack = createStack();
// stack.push(1)
// stack.push(2)
// stack.display();
// stack.pop()
// stack.pop()

/**
 * 斐波那契求和
 **/
function fibonacci (n) {
  let result = 0
  let pre1 = 1
  let pre2 = 0
  if (n === 0) {
    return result
  }
  if (n === 1) {
    return pre1
  }
  for (let i = 2; i <= n; i++) {
    result = pre1 + pre2
    pre2 = pre1
    pre1 = result
  }
  return result
}

/**
 * 矩阵内移动 回溯算法
 **/
function movingCount (max, rows, cols) {
  const flags = Array.from({length: rows}).map(() => [])
  const result = []
  countingSteps(0, 0)
  return result

  function countingSteps (i, j) {
    // 终止条件
    if (i < 0 || i >= rows || j < 0 || j >= cols || flags[i][j] || bitSum(i) + bitSum(j) > max) {
      return 0
    }
    flags[i][j] = true
    result.push([i, j])
    return countingSteps(i - 1, j) + countingSteps(i, j - 1) + countingSteps(i + 1, j) + countingSteps(i, j + 1) + 1
  }

  function bitSum (n) {
    let count = 0
    while (n !== 0) {
      count += n % 10
      n = ~~(n / 10)
    }
    return count
  }
}

// console.log(movingCount(3, 60, 60))

/**
 * 剪绳子 分成n段 求长度积最大值 动态规划
 **/
function maxProduct (n) {
  if (n <= 1) {
    return 0
  }
  if (n === 2) {
    return 1    // 1 * 1 = 1
  }
  if (n === 3) {
    return 2    // 1 * 2 = 2
  }
  const list = [0, 1, 2, 3]
  for (let i = 4; i <= n; i++) {
    let max = 0
    for (j = 1; j <= ~~(i / 2); j++) {
      max = Math.max(max, list[j] * list[i - j])
    }
    list[i] = max
  }
  return list[n]
}

function swap (list, i, j) {
  const temp = list[i]
  list[i] = list[j]
  list[j] = temp
}

// console.log(maxProduct(9))

/**
 * 奇数在偶数前
 **/
function sortOddEven (list, isLeft) {
  if (list.length <= 1) {
    return list
  }
  let left = 0
  let right = list.length - 1
  while (left < right) {
    if (!isLeft(list[left])) {
      left++
    }
    if (left < right && isLeft(list[right])) {
      right--
    }
    if (isLeft(list[left]) && !isLeft(list[right])) {
      swap(list, left, right)
    }
  }
  console.log(list)
}

// sortOddEven([1,2,3,4,5,6,7,8,9,10,11], (item) => {
//   return (item % 3)
// })

/**
 * 排序的链表去重
 **/
function LinkNode (data, next, prev) {
  this.data = data
  this.next = next || null
  this.prev = prev || null
}

function makeLinkList (list) {
  if (!list.length) return null
  const head = new LinkNode(list[0])
  let i = 1
  let curNode = head
  while (i < list.length) {
    curNode.next = new LinkNode(list[i])
    curNode = curNode.next
    i++
  }
  return head
}

function display (node, reverse = false) {
  const result = []
  let curNode = node
  while (curNode) {
    result.push(curNode.data)
    curNode = reverse ? curNode.prev : curNode.next
  }
  console.log(result)
}

function delRepeatNode (node) {
  display(node)
  if (!node || !node.next) return node
  // 下一个重复
  let nextNode = node.next
  if (node.data === nextNode.data) {
    while (nextNode && nextNode.data === node.data) {
      nextNode = nextNode.next
    }
    return delRepeatNode(nextNode)
  }
  node.next = delRepeatNode(nextNode)
  return node
}

/**
 * 单向链表倒数第n个节点
 **/
function lastOfLinkList (node, n) {
  let pre = node
  let last = node
  let i = 0
  while (last) {
    if (i >= n) {
      pre = pre.next
    }
    last = last.next
    i++
  }
  return i < n ? null : pre
}

/**
 * 反转链表 单项链表
 **/
function reverseLinkList (head) {
  if (!head) return head
  let prev = null, nextNode = null
  while (head) {
    nextNode = head.next;
    head.next = prev;
    prev = head;
    head = nextNode
  }
  return prev
}

/**
 * 反转链表 双向链表
 **/
function reverseLinkList2 (head) {
  if (!head) return head
  let prev = null, nextNode = null
  while (head) {
    nextNode = head.next
    head.next = prev;
    head.prev = nextNode;
    prev = head;
    head = nextNode
  }
  return prev
}

/**
 * 反转链表 按区间反转
 **/
function reverseLinkListByK (head, k) {
  if (k === 1) {
    return head
  }
  let curNode = head;
  let count = 0;
  while (curNode) {
    if (!curNode.next) {
      break
    }
    curNode = curNode.next;
    count++
    if(count === k - 1){
      break;
    }
  }
  if (!curNode) {
    return head;
  }
  const nextHead = reverseLinkListByK(curNode.next, k)
  let tempHead = head;
  let prev = null;
  let next = null;
  let num = k
  while (num > 0 && head) {
    next = head.next;
    head.next = prev;
    prev = head
    head = next;
    num--
  }
  tempHead.next = nextHead
  return prev
}

// let head = makeLinkList([1,2,3,4,5,6, 7, 8])
// head = reverseLinkListByK(head, 1)
// display(head)
// console.log(head.next.next.data)
// display(reverseLinkListByK(head, 2))

// console.log(reverseLinkListByK(head, 2))

/**
 * 合并有序链表
 **/
function mergeSortedLinkList (head1, head2) {
  if (!head1) {
    return head2
  }
  if (!head2) {
    return head1
  }
  let head = null
  if (head1.data < head2.data) {
    head = head1
    head1 = head1.next
  } else {
    head = head2
    head2 = head2.next
  }
  let curNode = head
  while (head1 && head2) {
    if (head1.data < head2.data) {
      curNode.next = head1
      head1 = head1.next
    } else {
      curNode.next = head2
      head2 = head2.next
    }
    curNode = curNode.next
  }
  if (head1) {
    curNode.next = head1
  }
  if (head2) {
    curNode.next = head2
  }
  return head
}

// display(mergeSortedLinkList(makeLinkList([1,3,4,7]), makeLinkList([2, 4, 6, 7, 9])))

/**
 * 给定一个非空且只包含非负数的整数数组 nums, 数组的度的定义是指数组里任一元素出现频数的最大值。
 * 你的任务是找到与 nums 拥有相同大小的度的最短连续子数组，返回其长度。
 **/
function findShortestSubArray (list) {
  if (!list || !list.length) return 0;
  const map = {}
  list.forEach((item, index) => {
    if (!map[item]) {
      map[item] = []
    }
    map[item].push(index)
  })
  let maxCount = 0;
  let minLength = 0;
  Object.values(map).forEach((item) => {
    if (item.length >= maxCount) {
      maxCount = item.length;
      minLength = item[item.length - 1] - item[0] + 1
    }
  })
  return minLength
}

// console.log(findShortestSubArray([1, 2, 3, 2,3,2, 1,1]))

/**
 * 给定一个整数数组  nums 和一个正整数 k，找出是否有可能把这个数组分成 k 个非空子集，其总和都相等。
 **/
function canPartitionKSubSets (nums, k) {
  if (k === 0) return true;
  if (!nums || !nums.length) return false;
  const sum = nums.reduce((a, b) => a + b);
  if (sum % k !== 0) {
    return false;
  }
  const avg = sum / k;
  const flags = [];
  return fn(k, avg, 0)

  function fn(k, target, index) {
    if (k === 0) return true;
    if (target === 0) {
      return fn(k - 1, avg, 0)
    }

    for (let i = index; i < nums.length; i++) {
      if (flags[i]) {
        continue
      }
      flags[i] = true;
      if (target - nums[i] >= 0 && fn(k, target - nums[i], index + 1)) {
        return true;
      }
      flags[i] = false;
    }
    return false
  }
}

// console.log(canPartitionKSubSets([4, 3, 2, 3, 5, 2, 1], 4))
// nums = [4, 3, 2, 3, 5, 2, 1], k = 4
/**
 * 题目：给定一个 double 类型的数组 arr，其中的元素可正、可负、可 0，返回子数组累乘的最大乘积。
 **/
function maxMulitiple (nums) {
  if (!nums || !nums.length) {
    return 0;
  }
  let max = nums[0];
  let min = nums[0];
  let res = nums[0];
  let possible1 = 0;
  let possible2 = 0;
  let possible3 = 0;
  for (let i = 1; i < nums.length; i++) {
    possible1 = nums[i];
    possible2 = max * nums[i]
    possible3 = min * nums[i]
    max = Math.max(possible1, possible2, possible3);
    min = Math.min(possible1, possible2, possible3);
    console.log(max, min)
    res = Math.max(max, min, res);
  }
  return res;
}

/**
 * 题目：给定一个 double 类型的数组 arr，其中的元素可正、可负、可 0，返回子数组累乘的最大和。
 **/
function maxSum (nums) {
  if (!nums || !nums.length) {
    return 0;
  }
  let max = nums[0];
  let res = nums[0];
  for (let i = 1; i < nums.length; i++) {
    max = Math.max(nums[i], max + nums[i])
    res = Math.max(res, max)
  }
  return res
}

// console.log(maxMulitiple([-2.5,4,1,3,-2,8,-1]))
// console.log(maxSum([6, -3, -2, 7, -15, 1, 2, 2]))

/**
 * 数组数字奇数偶数位置交换
 **/
function sortEvenOdd (nums) {
  let evenIndex = 0
  let oddIndex = 1
  let lastIndex = nums.length - 1
  while (evenIndex < nums.length && oddIndex < nums.length) {
    console.log(nums[lastIndex], 2)
    if (nums[lastIndex] % 2) {
      swap(nums, oddIndex, lastIndex)
      oddIndex += 2;
    } else {
      swap(nums, evenIndex, lastIndex)
      evenIndex += 2;
    }
  }
}


// sortEvenOdd([1,2,1,2,3,4,32,2,3,4,4,4,4,4])

/**
 * 字符串排列组合
 **/
function allSubString (str) {
  const res = [];
  fn("", 0)
  return res;
  function fn (prefix, i) {
    if (i === str.length) {
      res.push(prefix)
      return;
    }
    fn(prefix + str[i], i + 1);
    fn(prefix, i + 1);
  }
}

// console.log(allSubString('abc'))

/**
 * 反转字符串
 **/
function reverseStr (str) {
  let left = 0;
  let right = str.length - 1;
  const list = str.split("")
  while (left < right) {
    swap(list, left, right)
    left++;
    right--;
  }
  return list.join("")
}

// console.log(reverseStr('abcdefgh'))

/**
 * 最长无重复子字符串 滑动窗口法
 **/
function getLengthOfLongestSubstring (str) {
  let left = 0, right = 0, maxLength = 0;
  let map = {};
  while (right < str.length) {
    if (map.hasOwnProperty(str[right])) {
      left = map[str[right]] + 1
    }
    console.log(left)
    maxLength = Math.max(maxLength, right - left + 1);
    map[str[right]] = right;
    right++;
  }
  return maxLength;
}

// console.log(getLengthOfLongestSubstring('wwkewa'))

function TreeNode (data) {
  this.data = data;
  this.left = null;
  this.right = null;
}

/**
 * 广度优先遍历
 **/
function levelTraverse (root) {
  if (!root) {
    return;
  }
  const queue = [root];
  while (queue.length) {
    const curNode = queue.shift();
    console.log(curNode.data)
    curNode.left && queue.push(curNode.left);
    curNode.right && queue.push(curNode.right);
  }
}

/**
 * 深度优先遍历 递归实现
 **/
function deepTraverse (root) {
  if (!root) {
    return;
  }
  deepTraverse(root.right)
  deepTraverse(root.left)
  console.log(root.data)
}

/**
 * 前序遍历 中左右
 **/
function deepTraverse1 (root) {
  if (!root) {
    return;
  }
  const stack = [root];
  const result = []
  while (stack.length) {
    const curNode = stack.pop();
    result.push(curNode.data)
    curNode.right && stack.push(curNode.right);
    curNode.left && stack.push(curNode.left);
  }
  console.log(result)
}

/**
 * 后序遍历 左右中
 **/
function deepTraverse2 (root) {
  if (!root) {
    return;
  }
  const stack1 = [root];
  const stack2 = [];
  const result = []
  while (stack1.length) {
    const curNode = stack1.pop();
    stack2.push(curNode)
    curNode.left && stack1.push(curNode.left);
    curNode.right && stack1.push(curNode.right);
  }
  while (stack2.length) {
    const curNode = stack2.pop();
    result.push(curNode.data);
  }
  console.log(result)
}

/**
 * 中序遍历 左中右
 **/
function deepTraverse3 (root) {
  if (!root) {
    return;
  }
  const stack = [];
  const result = [];
  while (stack.length || root) {
    if (root) {
      while (root) {
        stack.push(root);
        root = root.left
      }
    } else {
      root = stack.pop();
      result.push(root.data)
      root = root.right
    }
  }
  console.log(result)
}

// const root = new TreeNode(1);
//
// root.left = new TreeNode(2)
// root.right = new TreeNode(3)
// root.left.left = new TreeNode(4)
// root.left.right = new TreeNode(5)
// root.right.left = new TreeNode(6)
// root.right.right = new TreeNode(7)
// root.left.left.left = new TreeNode(8)
// root.left.left.right = new TreeNode(9)
// levelTraverse(root)
// deepTraverse1(root)
// deepTraverse2(root)
// deepTraverse3(root)

/**
 * 三数之和 先排序 再双指针
 **/
function threeSum (nums) {
  const result = [];
  if (!nums || !nums.length) {
    return result;
  }
  nums.sort((a, b) => a - b);
  if (nums[0] > 0) {
    return result
  }
  for (let i = 0; i < nums.length; i++) {
    if (i && nums[i] === nums[i - 1]) {
      continue;
    }
    const target = -nums[i];
    let m = i + 1;
    let n = nums.length - 1;
    while (m < n) {
      const value = nums[m] + nums[n];
      if (value < target) {
        m++;
      } else if (value > target) {
        n--;
      } else {
        const list = [nums[i], nums[m], nums[n]]
        result.push(list);
        while (m < n && nums[m] === list[1]) {
          m++;
        }
        while (m < n && nums[n] === list[2]) {
          n--;
        }
      }
    }
  }
  return result
}

// console.log(threeSum([-1, 0, 1, 2, -1, -4]))

/**
 * 回溯
 **/
function combinationSum2 (nums, n, sum) {

  return fn(n, sum, 0)

  function fn (n, sum, i) {
    if (n === 0 || i === nums.length - 1) {
      return sum === 0;
    }

    for (; i < nums.length; i++) {
      if (fn(n - 1, sum - nums[i], i + 1)) {
        return true
      }
    }
    return false
  }
}

// console.log(combinationSum2([1, 3, 4, 6, 8, 10], 4, 21))

/**
 * 数组和为n的两个值 一次循环
 **/
function find(nums, n) {
  const result = [];
  const map = {};

  for (let i = 0; i < nums.length; i++) {
    const m = n - nums[i]
    if (map.hasOwnProperty(m)) {
      result.push([m, nums[i]])
    } else {
      map[nums[i]] = i;
    }
  }

  return result;
}

console.log(find([32, 3, 5, 1, 30, 76, 2, 10, 29], 31))

function runPromiseAsParallel (promise1, promise2) {
  return new Promise((resolve, reject) => {
    let error = 0;
    promise1.then(() => {
      resolve()
    }).catch((e) => {
      error++;
      if (error === 2) {
        reject(e)
      }
    })
    promise2.then(() => {
      resolve()
    }).catch(() => {
      error++;
      if (error === 2) {
        reject(e)
      }
    })
  })
}

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

/**
 * 快速排序
 **/
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

/**
 * 归并排序
 **/
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

/**
 * 楼梯问题
 **/
function step (n) {
  if (n === 1) return 1
  if (n === 2) return 2
  return step(n - 1) + step(n - 2)
}

console.log(step(7))
// f(3) = f(2) + f(1)
function step1 (n) {
  if (n <= 0) {
    return -1;
  }
  if (n === 1 ) {
    return 1;
  }
  if (n === 2 ) {
    return 2;
  }
  let prev2 = 1;
  let prev1 = 2;
  let res = 0;
  for (let i = 2; i < n; i++) {
    res = prev1 + prev2;
    prev2 = prev1;
    prev1 = res;
  }
  return res
}
console.log(step1(7))

function each (root) {
  console.log(root)
  root.left && each(root.left)
  root.right && each(root.right)
}

function each1 (root) {
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    stack.push(node.right)
    stack.push(node.left)
  }
}
function each3 (root) {
  const stack1 = [root];
  const stack2 = [];
  while (stack.length) {
    const node = stack1.pop();
    stack2.push(node)
    stack.push(node.right)
    stack.push(node.left)
  }
}
