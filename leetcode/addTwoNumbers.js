// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

// 请你将两个数相加，并以相同形式返回一个表示和的链表。

// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

function ListNode (val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

var addTwoNumbers = function (l1, l2) {
  const listNode1 = new ListNode(l1[0]);
  const listNode2 = new ListNode(l2[0]);
  let curNode = listNode1;
  for (let i = 1; i < l1.length; i++) {
    curNode.next = new ListNode(l1[i]);
    curNode = curNode.next;
  }
  curNode = listNode2;
  for (let i = 1; i < l2.length; i++) {
    curNode.next = new ListNode(l2[i]);
    curNode = curNode.next;
  }
  const result = new ListNode(0);
  let curResultNode = result;
  let curNode1 = listNode1;
  let curNode2 = listNode2;
  while (curNode1 || curNode2) {
    const curSum = curNode1.val + curNode2.val + curResultNode.val;
    if (curSum >= 10) {
      curResultNode.val = curSum - 10;
      curResultNode.next = new ListNode(1)
    } else {
      curResultNode.val = curSum;
    }
    curNode1 = curNode1.next;
    curNode2 = curNode2.next;
    if (curNode1 || curNode2) {
      curNode1 = curNode1 || new ListNode(0)
      curNode2 = curNode2 || new ListNode(0)
      curResultNode.next = curResultNode.next || new ListNode(0);
      curResultNode = curResultNode.next;
    }
  }
  return result
}

console.log(addTwoNumbers( [9,9,9], [9, 9,9]))
