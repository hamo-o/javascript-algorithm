function solution(msg) {
  const dict = {};
  for (let i = 1; i <= 26; i++) {
    dict[String.fromCharCode(i + 64)] = i;
  }

  const answer = [];
  let count = 27;
  let i = 0;
  while (i < msg.length) {
    let word = msg[i];
    for (let j = i + 1; j <= msg.length; j++) {
      if (j === msg.length) {
        answer.push(dict[word]);
        i = j - 1;
      } else if (!dict[word + msg[j]]) {
        answer.push(dict[word]);
        dict[word + msg[j]] = count;
        count++;
        i = j - 1;
        break;
      }
      word += msg[j];
    }
    i++;
  }
  return answer;
}
