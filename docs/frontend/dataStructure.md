# 数据结构

## 树

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