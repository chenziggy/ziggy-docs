import { describe, expect, it } from 'vitest'
import { TreeNode, TreeNodeChildren, breadthFirstTraversal, inOrderTraversal, postOrderTraversal, preOrderTraversal, transferForest } from './tree'

describe('tree', () => {
  /*
       1
      / \
     2   3
    / \ / \
   4  5 6  7
*/
  const tree = new TreeNode(1)
  tree.left = new TreeNode(2)
  tree.right = new TreeNode(3)
  tree.left.left = new TreeNode(4)
  tree.left.right = new TreeNode(5)
  tree.right.left = new TreeNode(6)
  tree.right.right = new TreeNode(7)

  it('preOrderTraversal', () => {
    expect(preOrderTraversal(tree)).toMatchSnapshot()
  })

  it('inOrderTraversal', () => {
    expect(inOrderTraversal(tree)).toMatchSnapshot()
  })

  it('postOrderTraversal', () => {
    expect(postOrderTraversal(tree)).toMatchSnapshot()
  })

  it('breadthFirstTraversal', () => {
    const root = new TreeNodeChildren('Root')
    const child1 = root.addChild('Child 1')
    const child2 = root.addChild('Child 2')
    const grandchild11 = child1.addChild('Grandchild 1-1')
    const grandchild12 = child1.addChild('Grandchild 1-2')
    const grandchild21 = child2.addChild('Grandchild 2-1')
    expect(breadthFirstTraversal(root)).toEqual(
      ['Root', 'Child 1', 'Child 2',
        'Grandchild 1-1',
        'Grandchild 1-2',
        'Grandchild 2-1'],
    )
  })
})

describe('数组转森林', () => {
  const list = [
    { id: 1, name: '部门1', pid: null },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
    { id: 6, name: '部门1', pid: null },
    { id: 7, name: '部门2', pid: 6 },
  ]

  it('transferForest', () => {
    expect(transferForest(list)).toMatchSnapshot()
  })
})
