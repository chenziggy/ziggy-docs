import { describe, expect, it } from 'vitest'
import { addMethod } from './overload'

describe('函数重载', () => {
  it('利用对象、闭包、递归', () => {
    const searcher = {}
    addMethod(searcher, 'getArgs', () => {
      return []
    })
    addMethod(searcher, 'getArgs', (name) => {
      return [name]
    })
    addMethod(searcher, 'getArgs', (name, sex) => {
      return [name, sex]
    })

    expect(searcher.getArgs()).toEqual([])
    expect(searcher.getArgs(1)).toEqual([1])
    expect(searcher.getArgs(1, 2)).toEqual([1, 2])
  })

  it('参数默认值不识别', () => {
    const searcher = {}

    addMethod(searcher, 'getArgs', () => {
      return []
    })
    addMethod(searcher, 'getArgs', (name = 'ziggy', sex) => {
      return [name, sex]
    })

    expect(searcher.getArgs(1, 2)).not.toEqual([1, 2])
  })
})
