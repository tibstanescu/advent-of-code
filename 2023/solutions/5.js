const input = require('fs').readFileSync('../problems/5.input.txt', 'utf8');
// const input = require('fs').readFileSync('../problems/5.sample.txt', 'utf8');

/* ============================================== COMMON ============================================== */
const processedInput = input.split('\n\n');

const seeds = processedInput
  .shift()
  .split(':')[1]
  .split(' ')
  .filter(Boolean)
  .map(x => +x);
const maps = processedInput
  .map(s => s.split(':\n')[1])
  .map(s => s.split('\n')
    .map(u => u.split(' ')
      .map(x => +x)));


/* ============================================== PART 1 ============================================== */

const answer1 = maps.reduce((seeds, mapList) => {
  return mapList.reduce(([processed, unprocessed], [dest, src, length]) => {
    return [
      [
        ...processed,
        ...unprocessed
          .filter(seed => seed >= src && seed < src + length)
          .map(seed => seed + dest - src)
      ],
      unprocessed.filter(seed => seed < src || seed >= src + length)
    ];
  }, [[], seeds])

    .flat();
}, seeds)
  .reduce((a, b) => Math.min(a, b));

console.log(`Part 1: ${answer1}`); // 26273516


/* ============================================== PART 2 ============================================== */

const seedRanges = seeds.filter((_, i) => i % 2 === 0)
  .map((s, i) => ({ start: s, end: s + seeds[2 * i + 1] - 1 }));

const shift = (range, diff) => ({ start: range.start + diff, end: range.end + diff, shifted: true });

const combine = (range1, range2, diff) => {
  const points = [range1.start, range1.end, range2.start, range2.end].sort((a, b) => a - b);
  return [
    { start: points[0], end: points[1] - 1 },
    { start: points[1], end: points[1] },
    { start: points[1] + 1, end: points[2] - 1 },
    { start: points[2], end: points[2] },
    { start: points[2] + 1, end: points[3] }
  ]
    .filter(range => range.start <= range.end)
    .filter(range => range.start >= range1.start && range.end <= range1.end)
    .map(range => range.start >= range2.start && range.end <= range2.end ? shift(range, diff) : range);
};


const answer2 = maps.reduce((acc, mapList) =>
  mapList.reduce(([processed, toProcess], [dest, src, length]) => {
    const results = toProcess
      .map(range => combine(range, { start: src, end: src + length - 1 }, dest - src))
      .flat();

    return [
      [...processed, ...results.filter(range => range.shifted)],
      results.filter(range => !range.shifted)
    ];
  }, [[], acc])
    .flat()
    .map(({ start, end }) => ({ start, end }))
    .sort((a, b) => a.start - b.start)
    .reduce((acc, { start, end }) =>
      acc[acc.length - 1]?.end >= start - 1 ?
      acc.with(-1, { start: acc[acc.length - 1].start, end }) :
        [...acc, { start, end }], []), seedRanges)
  .map(({ start }) => start)
  .reduce((a, b) => Math.min(a, b));

console.log(`Part 2: ${answer2}`); // 34039469
