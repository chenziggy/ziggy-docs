# 数据结构

## 树
* 根节点：树的顶部节点，没有父节点
* 子节点：树中每个节点可以有零个或多个子节点
* 叶节点：没有子节点的节点称为叶节点（Leaf Node）或终端节点
* 父节点：每个节点除了根节点外，都有一个父节点
* 路径：从根节点到任意节点的路径称为路径
* 深度（Depth）：节点的深度是指从根节点到该节点的路径的长度
* 高度（Height）：树的高度是指从根节点到叶节点的最长路径的长度

查询节点，并返回路径
```js
function findMatchingNodes(tree, searchText) {
  const result = [];

  function traverse(node, path) {
    if (node.text.includes(searchText)) {
      result.push({ node, path });
    }

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        traverse(child, [...path, {id: child.id, name: child.text}]);
      }
    }
  }

  traverse(tree[0], []);

  return result;
}
```

## 遍历方式

### 深度优先

### 广度优先

## 二叉树

## 二叉搜索树

## 平衡二叉树

## 完全二叉树