const input = require('fs').readFileSync('../problems/7.input.txt', 'utf8');
// const input = require('fs').readFileSync('../problems/7.sample.txt', 'utf8');

/* ============================================== COMMON ============================================== */
const processedInput = input.split('\n')
  .map(s => s.split(' '))
  .map(([cards, bid]) => ({ cards: cards.split(''), bid }));

const getType = frequency => frequency[0] === 5 ? 7 : // five of a kind
                             frequency[0] === 4 ? 6 : // four of a kind
                             frequency[0] === 3 && frequency[1] === 2 ? 5 : // full house
                             frequency[0] === 3 ? 4 : // three of a kind
                             frequency[0] === 2 && frequency[1] === 2 ? 3 : // two pairs
                             frequency[0] === 2 ? 2 : // one pair
                             1; // high card


const sortFactory = strengths =>
  (a, b) =>
    a.type - b.type ||
    strengths.indexOf(b.cards[0]) - strengths.indexOf(a.cards[0]) ||
    strengths.indexOf(b.cards[1]) - strengths.indexOf(a.cards[1]) ||
    strengths.indexOf(b.cards[2]) - strengths.indexOf(a.cards[2]) ||
    strengths.indexOf(b.cards[3]) - strengths.indexOf(a.cards[3]) ||
    strengths.indexOf(b.cards[4]) - strengths.indexOf(a.cards[4]);


/* ============================================== PART 1 ============================================== */

const answer1 = processedInput
  .map(({ cards, bid }) => ({
    cards, bid,
    frequency: cards.reduce((map, card) => ({ ...map, [card]: (map[card] || 0) + 1 }), {}),
  }))
  .map(({ cards, bid, frequency }) => ({
    cards, bid, frequency,
    type: getType(Object.values(frequency).sort((a, b) => b - a)),
  }))
  .sort(sortFactory('AKQJT98765432'.split('')))
  .map(({ bid }, index) => bid * (index + 1))
  .reduce((a, b) => a + b);

console.log(`Part 1: ${answer1}`); // 253954294


/* ============================================== PART 2 ============================================== */

const answer2 = processedInput
  .map(({ cards, bid }) => ({
    cards, bid,
    frequency: cards.reduce((map, card) => ({ ...map, [card]: (map[card] || 0) + 1 }), {}),
  }))

  // Combine jokers with the next best card: count them separately, figure out the best card, add jokers to it
  .map(({ cards, bid, frequency }) => ({
    cards, bid,
    jCount: frequency['J'] || 0,
    frequency: { ...frequency, 'J': 0 },
  }))
  .map(({ cards, bid, frequency, jCount }) => ({
    cards, bid, frequency, jCount,
    bestCard: cards.find(card => frequency[card] === Math.max(...Object.values(frequency))),
  }))
  .map(({ cards, bid, frequency, jCount, bestCard }) => ({
    cards, bid,
    frequency: { ...frequency, [bestCard]: frequency[bestCard] + jCount },
  }))


  .map(({ cards, bid, frequency }) => ({
    cards, bid, frequency,
    // type can also be frequency.join(''), but it's closer to the problem statement this way
    type: getType(Object.values(frequency).sort((a, b) => b - a)),
  }))
  .sort(sortFactory('AKQT98765432J'.split('')))
  .map(({ bid }, index) => bid * (index + 1))
  .reduce((a, b) => a + b);

console.log(`Part 2: ${answer2}`); // 254837398
