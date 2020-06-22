// 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
//
// 说明：本题中，我们将空字符串定义为有效的回文串。

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  console.log(s.length);
  let map = {};
  for (let i = 97; i <= 122; i++) {
    map[String.fromCharCode(i)] = 1
  }
  for (let i = 0; i <= 9; i++) {
    map[i] = 1
  }
  let left = 0;
  let right = s.length - 1;
  while (left <= right) {
    while (!map[s[left].toLowerCase()] && left < right) {
      left++;
    }
    while (!map[s[right].toLowerCase()] && left < right) {
      right--;
    }
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};

console.log(isPalindrome(""));
