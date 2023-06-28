import { Token, TokenTypes } from '../tokenizer'
import { createCallExpressionNode, createNumberLiteralNode, createRootNode } from './ast'

/**
 * 语法分析 parser
 * @param tokens - Token[]
 * @returns RootNode - AST
 */
export function parser(tokens: Token[]) {
  let currentIndex = 0
  const rootNode = createRootNode()

  function walk() {
    let token = tokens[currentIndex]

    if (token.type === TokenTypes.Number) {
      currentIndex++
      return createNumberLiteralNode(token.value)
    }

    if (token.type === TokenTypes.Paren && token.value === '(') {
      token = tokens[++currentIndex]
      const node = createCallExpressionNode(token.value) //左括号第一个为表达式

      token = tokens[++currentIndex]
      while (!(token.type === TokenTypes.Paren && token.value === `)`)) {
        node.params.push(walk())
        token = tokens[currentIndex]
      }
      currentIndex++ //指针更新到右括号
      return node
    }

    throw new Error(`识别不了的 token: ${token}`)
  }

  while (currentIndex < tokens.length) {
    rootNode.body.push(walk())
  }
  return rootNode
}
