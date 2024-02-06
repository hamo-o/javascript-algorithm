function count(arr, start) {
  let life = start;
  let count = 0;

  for (const item of arr) {
    const [req, minus] = item;
    if (req <= life && life - minus > 0) {
      count++;
      life -= minus;
    } else {
      return count;
    }
  }
  return count;
}

function dfs(pick, dungeons, visited, k) {
  if (pick.length === dungeons.length) {
    return count(pick, k);
  }

  let m = 0;
  dungeons.forEach((dungeon, i) => {
    if (!visited[i]) {
      pick.push(dungeon);
      visited[i] = 1;
      m = Math.max(m, dfs(pick, dungeons, visited, k));
      pick.pop();
      visited[i] = 0;
    }
  });

  return m;
}

function solution(k, dungeons) {
  const visited = new Array(dungeons.length).fill(0);
  const answer = dfs([], dungeons, visited, k);
  return answer;
}
