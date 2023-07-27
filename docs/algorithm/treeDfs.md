# 树深度优先

树的深度遍历（Depth-First Search，DFS）是一种遍历树节点的方法，它分为三种方式：前序遍历、中序遍历和后序遍历

## 前序遍历
```js
class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

// 前序遍历
function preOrderTraversal(node) {
  if (node === null)
    return

  console.log(node.value)
  preOrderTraversal(node.left)
  preOrderTraversal(node.right)
}
```

## 中序遍历
```js
function inOrderTraversal(node) {
  if (node === null)
    return

  inOrderTraversal(node.left)
  console.log(node.value)
  inOrderTraversal(node.right)
}
```

## 后序遍历
```js
function postOrderTraversal(node) {
  if (node === null)
    return

  postOrderTraversal(node.left)
  postOrderTraversal(node.right)
  console.log(node.value)
}
```