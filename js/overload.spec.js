import { describe, expect, it } from 'vitest'
import { addMethod, createOverload } from './overload'

describe('函数重载 addMethod', () => {
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

    expect(searcher.getArgs(1, 2)).not.toBe([1, 2])
  })
})

describe('函数重载 createOverload', () => {
  const getUsers = createOverload()

  it('无参数', () => {
    getUsers.addImpl(() => {
      return '查询所有用户'
    })
    expect(getUsers()).toBe('查询所有用户')
  })

  it('参数默认值', () => {
    const searchPage = (page, size = 10) => {
      return `按照页码${page}和数量${size}查询用户`
    }

    getUsers.addImpl('number', searchPage)
    expect(getUsers(1)).toBe('按照页码1和数量10查询用户')

    getUsers.addImpl('number', 'number', searchPage)
    expect(getUsers(10, 20)).toBe('按照页码10和数量20查询用户')
  })

  it('参数类型不同', () => {
    getUsers.addImpl('string', 'string', (name, sex) => {
      return `按照姓名${name}和性别${sex}查询用户`
    })
    expect(getUsers('ziggy', 'male')).toBe('按照姓名ziggy和性别male查询用户')
  })
})
