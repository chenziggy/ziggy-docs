import { describe, expect, it } from 'vitest'
import { findMostFrequentString, genHashMap, sortValue, splitWords, topFrequentWord } from './topFrequentWord'

describe('查找字符串中出现频率最高的3个单词，同样规则返回其相邻单词', () => {
  it('单词拆分', () => {
    const str = 'Huawei devices. company\'s (ICT)'
    expect(splitWords(str)).toEqual(['huawei', 'devices', 'company\'s', 'ict'])
  })

  it('生成hashMap', () => {
    const arr = ['huawei', 'devices', 'huawei']
    expect(genHashMap(arr)).toEqual({
      huawei: {
        value: 2,
        prev: ['devices'],
        next: ['devices'],
      },
      devices: {
        value: 1,
        prev: ['huawei'],
        next: ['huawei'],
      },
    })
  })

  it('hashMap value 大小排序 相同value a-z排序', () => {
    const hashMap = {
      devices: {
        value: 1,
        prev: ['huawei'],
        next: ['huawei'],
      },
      huawei: {
        value: 2,
        prev: ['devices'],
        next: ['devices'],
      },
      auawei: {
        value: 2,
        prev: ['devices'],
        next: ['devices'],
      },
    }
    expect(sortValue(hashMap)).toEqual(['auawei', 'huawei', 'devices'])
  })

  it('返回单词数组出现频次最高的单词及出现次数', () => {
    const words = ['auawei', 'huawei', 'devices', 'huawei']
    expect(findMostFrequentString(words)).toEqual({
      word: 'huawei',
      value: 2,
    })
  })

  it('最终组合', () => {
    const str = 'Huawei is a multinational technology company headquartered in Shenzhen, Guangdong, China. Founded in 1987, Huawei is a leading global provider of information and communications technology (ICT) infrastructure and smart devices. The company\'s portfolio includes a wide range of products and solutions, such as smartphones, tablets, laptops, telecommunications equipment, networking solutions, and cloud computing services. Huawei is known for its innovation and research in areas such as 5G technology, artificial intelligence, and consumer electronics.'

    expect(topFrequentWord(str)).toMatchSnapshot()
  })
})
