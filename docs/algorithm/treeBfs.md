# 树广度优先

树的广度遍历（Breadth-First Search，BFS）是一种遍历树节点的方法

首先访问根节点，然后依次访问根节点的所有相邻节点，接着访问这些相邻节点的相邻节点，依此类推，直到遍历完整个树

```js
class TreeNode {
  constructor(value) {
    this.value = value
    this.children = []
  }
}

// 广度优先遍历
function breadthFirstTraversal(root) {
  if (root === null)
    return

  const queue = [root]
  while (queue.length > 0) {
    const node = queue.shift()
    console.log(node.value)
    for (const child of node.children)
      queue.push(child)

  }
}
```