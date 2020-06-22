// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  var length = 0;
  if (s.length < 2) {
    if (s.length > length) {
      return s.length;
    }
  }
  var cache = {};
  var curLen = 0;
  var index = 0;
  var start = 0;
  while (index < s.length) {
    if (cache[s[index]]) {
      if (curLen > length) {
        length = curLen;
      }
      cache[s[start]] = false;
      start = start + 1;
      curLen --;
    } else {
      cache[s[index]] = true;
      curLen++;
      index++;
    }
  }
  if (curLen > length) {
    length = curLen;
  }
  return length;
};

console.log(lengthOfLongestSubstring("auedc"));
