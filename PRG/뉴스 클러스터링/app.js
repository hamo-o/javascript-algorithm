function changeStrToArr(str) {
  const regex = /^[a-zA-Z]{2}$/;
  const answer = [];

  for (let i = 0; i < str.length - 1; i++) {
    if (regex.test(str[i] + str[i + 1])) {
      answer.push(str[i] + str[i + 1]);
    }
  }

  return answer;
}

function solution(str1, str2) {
  const arr1 = changeStrToArr(str1.toUpperCase());
  const arr2 = changeStrToArr(str2.toUpperCase());
  const visited = new Array(arr2.length).fill(0);

  let inter = 0;
  let union = arr1.length + arr2.length;

  for (const item1 of arr1) {
    for (const i in arr2) {
      if (item1 === arr2[i] && !visited[i]) {
        inter++;
        union--;
        visited[i] = 1;
        break;
      }
    }
  }

  const answer = union ? Math.floor((inter / union) * 65536) : 65536;
  return answer;
}
