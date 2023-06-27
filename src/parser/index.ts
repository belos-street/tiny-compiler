import { Token, TokenTypes } from '../tokenizer'
import { createNumberLiteralNode, createRootNode } from './ast'

export function parser(tokens: Token[]) {
  let currentIndex = 0
  let token = tokens[currentIndex]

  const rootNode = createRootNode()

  if (token.type === TokenTypes.Number) {
    rootNode.body.push(createNumberLiteralNode(token.value))
  }

  return rootNode
}
