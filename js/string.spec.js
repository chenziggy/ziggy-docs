import { describe, expect, it } from 'vitest'
import { longestPalindrome } from './string'

describe('最长回文子串', () => {
  it('longestPalindrome', () => {
    const str1 = 'forgeeksskeegfor'
    const str1A = 'geeksskeeg'
    expect(longestPalindrome(str1)).toEqual(str1A)
    const str2 = 'aaab'
    const str2A = 'aaa'
    expect(longestPalindrome(str2)).toEqual(str2A)
    const str3 = 'abc'
    const str3A = 'a'
    expect(longestPalindrome(str3)).toEqual(str3A)
  })
})
