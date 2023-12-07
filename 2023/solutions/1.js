const input = require('fs').readFileSync('../problems/1.input.txt', 'utf8');
// const input = require('fs').readFileSync('../problems/1.sample1.txt', 'utf8');
// const input = require('fs').readFileSync('../problems/1.sample2.txt', 'utf8');


/* ============================================== COMMON ============================================== */
const processedInput = input.split('\n');

/* ============================================== PART 1 ============================================== */
const answer1 = processedInput
  .map(line => Array.from(line.matchAll(/\d/g)))
  .map(arr => arr[0]?.[0] + arr[arr.length - 1]?.[0])
  .reduce((a, b) => (+a) + (+b));

console.log(`Part 1: ${answer1}`); // 54597


/* ============================================== PART 2 ============================================== */
const answer2 = processedInput
  .map(line => line
    .replaceAll(/one|two|three|four|five|six|seven|eight|nine|zero/g, match =>
      match === 'one' ? 'o1ne' :
      match === 'two' ? 't2wo' :
      match === 'three' ? 't3hree' :
      match === 'four' ? 'f4our' :
      match === 'five' ? 'f5ive' :
      match === 'six' ? 's6ix' :
      match === 'seven' ? 's7even' :
      match === 'eight' ? 'e8ight' :
      match === 'nine' ? 'n9ine' :
      match === 'zero' ? 'z0ero' :
      match)
    .replaceAll(/one|two|three|four|five|six|seven|eight|nine|zero/g, match =>
      match === 'one' ? 'o1ne' :
      match === 'two' ? 't2wo' :
      match === 'three' ? 't3hree' :
      match === 'four' ? 'f4our' :
      match === 'five' ? 'f5ive' :
      match === 'six' ? 's6ix' :
      match === 'seven' ? 's7even' :
      match === 'eight' ? 'e8ight' :
      match === 'nine' ? 'n9ine' :
      match === 'zero' ? 'z0ero' :
      match)
  )
  .map(line => Array.from(line.matchAll(/\d/g)))
  .map(arr => arr[0][0] + arr[arr.length - 1][0])
  .reduce((a, b) => (+a) + (+b));

console.log(`Part 2: ${answer2}`); // 54504
