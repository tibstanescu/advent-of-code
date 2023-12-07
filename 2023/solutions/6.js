// const input = require('fs').readFileSync('../problems/6.input.txt', 'utf8');
const input = require('fs').readFileSync('../problems/6.sample.txt', 'utf8');


/* ============================================== COMMON ============================================== */
const processedInput = input.split('\n').map(s => s.split(':')[1].split(/\s+/).filter(Boolean).map(x => +x));

// Solving i * (time-i) >= dist +1, equivalent to i*i - i*time + dist + 1 <= 0
// Use quadratic formula (-b +- sqrt(b*b - 4ac)) / 2a, count all integers in the interval between the two roots
const countIntegers = (time, dist) =>
  Math.floor(time / 2 + Math.sqrt(time * time - 4 * (dist + 1)) / 2) -
  Math.ceil(time / 2 - Math.sqrt(time * time - 4 * (dist + 1)) / 2) +
  1;

/* ============================================== PART 1 ============================================== */
const answer1 = processedInput[0].map((time, i) => countIntegers(time, processedInput[1][i]))
  .reduce((a, b) => a * b);

console.log(`Part 1: ${answer1}`); // 170000


/* ============================================== PART 2 ============================================== */
const answer2 = processedInput.map(a => +a.reduce((a, b) => '' + a + b))
  .reduce((time, dist) => countIntegers(time, dist));

console.log(`Part 2: ${answer2}`); // 20537782
