import { describe, expect, test } from 'vitest'
import { TreeNode, TreeNodeChildren, breadthFirstTraversal, inOrderTraversal, postOrderTraversal, preOrderTraversal } from './tree'

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

  test('preOrderTraversal', () => {
    expect(preOrderTraversal(tree)).toMatchSnapshot()
  })

  test('inOrderTraversal', () => {
    expect(inOrderTraversal(tree)).toMatchSnapshot()
  })

  test('postOrderTraversal', () => {
    expect(postOrderTraversal(tree)).toMatchSnapshot()
  })

  test('breadthFirstTraversal', () => {
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
