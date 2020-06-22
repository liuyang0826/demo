// 你有两个字符串，即pattern和value。 pattern字符串由字母"a"和"b"组成，用于描述字符串中的模式。
// 例如，字符串"catcatgocatgo"匹配模式"aabab"（其中"cat"是"a"，"go"是"b"），
// 该字符串也匹配像"a"、"ab"和"b"这样的模式。但需注意"a"和"b"不能同时表示相同的字符串。
// 编写一个方法判断value字符串是否匹配pattern字符串。

/**
 * @param {string} pattern
 * @param {string} value
 * @return {boolean}
 */
var patternMatching = function (pattern, value) {
  let len1 = pattern.length;
  let len2 = value.length;
  if (len1 + len2 === 0) {
    return true;
  }
  if (!value.length) {
    let a = pattern[0];
    for (let i = 1; i < pattern.length; i++) {
      if (pattern[i] !== i) {
        return false;
      }
    }
    return true;
  }
  let aItemLen = 0;
  while (aItemLen <= value.length) {
    let a = value.substr(0, aItemLen);
    let bItemLen = 0;
    while (bItemLen <= value.length - aItemLen) {
      let b = "";
      for (let i = 1; i < pattern.length; i++) {
        if (pattern[i] !== pattern[0]) {
          b = value.substr(aItemLen * i, bItemLen)
          break
        }
      }
      if (a === b) {
        bItemLen++;
        continue
      }
      let curValue = "";
      for (let i = 0; i < pattern.length; i++) {
        curValue += (pattern[i] === pattern[0] ? a : b);
      }
      if (curValue === value) {
        return true;
      }
      bItemLen++;
    }
    aItemLen++;
  }
  return false;
};

console.log(patternMatching("abbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbabbbb",
"yxankynynxnxnxxyxyyyxxakxanaxnankyykxxannxayyyaxakyyyxxyxyyxxkxyyyyxnxxyykayyanayxayknayxyyynyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyykxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyxxykykyyyxankynynxnxnxxyxyyyxxakxanaxnankyykxxannxayyyaxakyyyxxyxyyxxkxyyyyxnxxyykayyanayxayknayxyyynyxxykykyyxxykykyyxxxykykyy"));
