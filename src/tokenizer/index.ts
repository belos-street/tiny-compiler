import { Reg } from '../other/reg'

export enum TokenTypes {
  Paren = 'paren',
  Name = 'name',
  Number = 'number',
  String = 'string'
}

export interface Token {
  type: TokenTypes
  value: string
}
/**
 * 词法分析
 * tokenizer - 分词器
 */
export function tokenizer(code: string) {
  const tokens: Token[] = []
  let currentPointer = 0
  const { LETTERS, NUMBERS, WHITESPACE } = Reg

  while (currentPointer < code.length) {
    let currentChar = code[currentPointer]

    if (WHITESPACE.test(currentChar)) {
      currentPointer++
      continue
    }

    if (currentChar === '(') {
      tokens.push({
        type: TokenTypes.Paren,
        value: currentChar
      })
      currentPointer++
      continue
    }

    if (currentChar === ')') {
      tokens.push({
        type: TokenTypes.Paren,
        value: currentChar
      })
      currentPointer++
      continue
    }

    if (LETTERS.test(currentChar)) {
      let values = ''
      while (LETTERS.test(currentChar) && currentPointer < code.length) {
        values += currentChar
        currentChar = code[++currentPointer]
      }
      tokens.push({
        type: TokenTypes.Name,
        value: values
      })
    }

    if (NUMBERS.test(currentChar)) {
      let values = ''
      while (NUMBERS.test(currentChar) && currentPointer < code.length) {
        values += currentChar
        currentChar = code[++currentPointer]
      }
      tokens.push({
        type: TokenTypes.Number,
        value: values
      })
    }
  }

  return tokens
}
