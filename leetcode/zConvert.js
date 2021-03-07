/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
  if (numRows === 1) {
    return s;
  }
  const matrix = Array.from({length: numRows}).map(() => []);
  const space = numRows - 2;
  const section = numRows + space;
  for (let i = 0; i < s.length; i++) {
    const m = ~~(i / section)
    const xIndex = m * (space + 1)
    const yIndex = i - m * section
    if (matrix[yIndex]) {
      matrix[yIndex][xIndex] = s[i]
    } else {
      const offset = yIndex - numRows + 1;
      matrix[numRows - offset - 1][xIndex + offset] = s[i]
    }
  }
  return matrix.map(d => d.join("")).join("")
};

console.log(convert('PAYPALISHIRING', 3))
