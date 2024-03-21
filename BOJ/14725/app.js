const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = +input[0];
const infos = input.slice(1).map((line) => line.split(' '));

class Tree {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(tree) {
    this.children.push(tree);
    this.children.sort((a, b) => a.value.localeCompare(b.value));
  }

  findChild(value) {
    for (const child of this.children) {
      if (child.value === value) {
        return child;
      }
    }
    return false;
  }
}

function addTree(parent, value) {
  const tree = parent.findChild(value);

  // 넣으려는 value가 부모 트리에 없을 때만 추가, 추가한 자식 반환
  if (!tree) {
    const child = new Tree(value);
    parent.addChild(child);
    return child;
  }
  // 넣으려는 value가 이미 부모 트리에 있으면 해당 value값을 가진 트리 반환
  return tree;
}

function printTree(trees, depth) {
  if (!trees.length) return;
  trees.forEach((tree) => {
    const text = `${'--'.repeat(depth)}${tree.value}`;
    console.log(text);

    printTree(tree.children, depth + 1);
  });
}

const root = new Tree();
infos.forEach((line) => {
  const n = +line[0];
  let parent = root;
  for (let i = 1; i <= n; i++) {
    parent = addTree(parent, line[i]);
  }
});

printTree(root.children, 0);
