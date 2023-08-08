import { describe, expect, it } from 'vitest'

describe('正则方法', () => {
  it('match', () => {
    const text = '我和我的祖国祖国'
    expect(text.match(/祖国/)[0]).toEqual('祖国')
    //  [ '祖国', index: 4, input: '我和我的祖国祖国', groups: undefined ]
    expect(text.match(/祖国/g)).toEqual(['祖国', '祖国'])
    //  ["祖国", "祖国"]
    expect(text.match(/美国/)).toEqual(null)
    //  null
  })

  it('解析 url', () => {
    const url = 'https://www.example.com:8080/path?param1=value1&param2=value2'
    const urlRegex = /^(?:(https?):\/\/)?((?:|[\w-]+\.)+[a-z0-9]+)(?:\:([0-9]*))?(?:(\/[^/?#]+)*)?(\?[^#]+)?(#.+)?$/i
    expect(urlRegex.exec(url)).toMatchSnapshot()
    /*
      [
        'https://www.example.com:8080/path?param1=value1&param2=value2',
        'https',
        'www.example.com',
        '8080',
        '/path',
        '?param1=value1&param2=value2',
        undefined,
        index: 0,
        input: 'https://www.example.com:8080/path?param1=value1&param2=value2',
        groups: undefined
      ]
    */

    expect(urlRegex.exec('ftp://xxx')).toBe(null)
  })
})
