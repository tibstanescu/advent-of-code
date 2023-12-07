// const input = require('fs').readFileSync('../problems/3.input.txt', 'utf8');
const input = require('fs').readFileSync('../problems/3.sample.txt', 'utf8');

/* ============================================== COMMON ============================================== */
Array.prototype.matrixMap = function(callback) {
  return this.map((row, y) => row.map((cell, x) => callback(cell, x, y)));
};

Array.prototype.matrixReduce = function(callback, initialValue) {
  return this.reduce((acc, row, y) => row.reduce((acc, cell, x) => callback(acc, cell, x, y), acc), initialValue);
};

const processedInput = input.split('\n');
const symbols = processedInput.map(line => line.replaceAll(/\d/g, '.').split('').map(c => c === '.' ? '' : c));
const digits = processedInput.map(line => line.replaceAll(/\D/g, '.').split('').map(c => c === '.' ? '' : c));

const getNumber = (x, y, reachedStart) =>
  // Since there is no number, simply return the empty string
  !digits[x]?.[y] ? '' :
    // We started composing the number keep going to the right
  reachedStart ? digits[x][y] + getNumber(x, y + 1, reachedStart) :
    // We haven't started composing the number, try to move to the left
  digits[x][y - 1] ? getNumber(x, y - 1) :
    // Since we can't move to the left, start composing the number
  getNumber(x, y, true);

const neighbors = digits.matrixMap((cell, x, y) =>
  [
    getNumber(x, y - 1),
    getNumber(x, y + 1),
    // If middle digit exists, there is a single number, otherwise, add each corner separately
    getNumber(x - 1, y) || [getNumber(x - 1, y - 1), getNumber(x - 1, y + 1)],
    getNumber(x + 1, y) || [getNumber(x + 1, y - 1), getNumber(x + 1, y + 1)]
  ].flat().filter(Boolean));


/* ============================================== PART 1 ============================================== */
const answer1 = neighbors
  .matrixMap((numbers, x, y) => symbols[x][y] ? numbers : [])
  .matrixReduce((acc, numbers) => acc.concat(numbers), [])
  .reduce((a, b) => (+a) + (+b));

console.log(`Part 1: ${answer1}`); // 560670


/* ============================================== PART 2 ============================================== */
const answer2 = neighbors
  .matrixMap((numbers, x, y) => symbols[x][y] === '*' && numbers.length === 2 ? numbers[0] * numbers[1] : 0)
  .matrixReduce((a, b) => a + b, 0);

console.log(`Part 2: ${answer2}`); // 91622824