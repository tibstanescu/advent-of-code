// const input = require('fs').readFileSync('../problems/2.input.txt', 'utf8');
const input = require('fs').readFileSync('../problems/2.sample.txt', 'utf8');


/* ============================================== COMMON ============================================== */
const processedInput = input.split('\n')
  .map(line => line.split(':'))
  .map(([index, games]) => ({
      index,
      games: games.split(';')
        .map(game => game.split(',')
          .map(ball => ball.includes('red') ? { red: +ball.replaceAll(/\D/g, '') } :
                       ball.includes('blue') ? { blue: +ball.replaceAll(/\D/g, '') } :
                       ball.includes('green') ? { green: +ball.replaceAll(/\D/g, '') } :
                         {}
          )
          .reduce((a, b) => ({ ...a, ...b }))
        )
        .reduce((a, b) => ({
          red: Math.max(a.red || 0, b.red || 0),
          blue: Math.max(a.blue || 0, b.blue || 0),
          green: Math.max(a.green || 0, b.green || 0)
        }))
    })
  );


/* ============================================== PART 1 ============================================== */
const answer1 = processedInput
  .filter(({ index, games }) => games.red <= 12 && games.blue <= 14 && games.green <= 13)
  .map(({ index }) => +index.replaceAll(/\D/g, ''))
  .reduce((a, b) => a + b);


console.log(`Part 1: ${answer1}`); // 2617


/* ============================================== PART 2 ============================================== */

const answer2 = processedInput
  .map(({games})=> games.red * games.blue * games.green)
  .reduce((a, b) => a + b);

console.log(`Part 2: ${answer2}`); // 59795