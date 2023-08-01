export class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

export function preOrderTraversal(node) {
  const res = []

  function preOrder(node) {
    if (node === null)
      return

    res.push(node.value)
    preOrder(node.left)
    preOrder(node.right)
  }
  preOrder(node)
  return res
}

export function inOrderTraversal(node) {
  const res = []

  function preOrder(node) {
    if (node === null)
      return

    preOrder(node.left)
    res.push(node.value)
    preOrder(node.right)
  }
  preOrder(node)
  return res
}
export function postOrderTraversal(node) {
  const res = []

  function preOrder(node) {
    if (node === null)
      return
    preOrder(node.left)
    preOrder(node.right)
    res.push(node.value)
  }
  preOrder(node)
  return res
}

export class TreeNodeChildren {
  constructor(value) {
    this.value = value
    this.children = []
  }

  addChild(value) {
    const newChild = new TreeNodeChildren(value)
    this.children.push(newChild)
    return newChild
  }
}
export function breadthFirstTraversal(root) {
  const res = []
  function bft(root) {
    if (root === null)
      return

    const queue = [root]
    while (queue.length > 0) {
      const node = queue.shift()
      res.push(node.value)
      for (const child of node.children)
        queue.push(child)
    }
  }

  bft(root)
  return res
}
