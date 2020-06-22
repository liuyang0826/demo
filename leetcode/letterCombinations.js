// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
//
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  var result = [];
  if (!digits.length) {
    return result;
  }
  var letterMap = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  }
  result = letterMap[digits[0]]
  var temp = [];
  for (var i = 1; i < digits.length; i++) {
    for (var j = 0; j < result.length; j++) {
      var cur = letterMap[digits[i]]
      for (var k = 0; k < cur.length; k++) {
        temp.push(result[j] + cur[k])
      }
    }
    result = temp
    temp = []
  }
  return result
};

