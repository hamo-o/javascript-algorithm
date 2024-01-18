const n = 5;
const input = [
  'hello',
  'observe',
  'effect',
  'take',
  'either',
  'recognize',
  'encourage',
  'ensure',
  'establish',
  'hang',
  'gather',
  'refer',
  'reference',
  'estimate',
  'executive',
];
function solution(n, words) {
  const findLoser = () => {
    const prev = [];
    for (const idx in words) {
      const word = words[idx];
      const prev_word = prev.length ? prev[idx - 1] : word[0];
      if (
        word.length <= 1 ||
        word[0] !== prev_word[prev_word.length - 1] ||
        prev.includes(word)
      ) {
        return [(idx % n) + 1, Math.floor(idx / n) + 1];
      }
      prev.push(word);
    }
    return [0, 0];
  };

  const answer = findLoser();
  return answer;
}

console.log(solution(n, input));
