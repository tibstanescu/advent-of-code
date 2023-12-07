// const input = require('fs').readFileSync('../problems/4.input.txt', 'utf8');
const input = require('fs').readFileSync('../problems/4.sample.txt', 'utf8');

/* ============================================== COMMON ============================================== */
const processedInput = input.split('\n')
  .map(line => line.split(/[:|]/))
  .map(([index, myNumbers, winningNumbers]) => ({
    myNumbers: myNumbers.split(' ').filter(Boolean),
    winningNumbers: winningNumbers.split(' ').filter(Boolean)
  }))
  .map(({ myNumbers, winningNumbers }) =>
    winningNumbers
      .filter(i => myNumbers.indexOf(i) >= 0)
      .length);


/* ============================================== PART 1 ============================================== */
const answer1 = processedInput
  .map(winners => winners && Math.pow(2, winners - 1))
  .reduce((a, b) => a + b);

console.log(`Part 1: ${answer1}`); // 33950


/* ============================================== PART 2 ============================================== */
const cards = processedInput;

const solve = index =>
  cards[index] === undefined ? 0 :
  1 + Array(cards[index])
      .fill()
      // good thing we have a nice computer, otherwise it would blow up with recursion here
      .map((_, i) => solve(index + Number(i) + 1))
      .reduce((a, b) => a + b, 0);

const answer2 = cards.map((_, i) => solve(i))
  .reduce((a, b) => a + b);

console.log(`Part 2: ${answer2}`); // 14814534
