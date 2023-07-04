import { NodeTypes, RootNode } from '../parser/ast'
import { traverser } from '../traverser'

export function transformer(ast: RootNode) {
  const newAst = {
    type: NodeTypes.Program,
    body: []
  }

  traverser(ast, {
    CallExpression: {
      enter(node, parentNode) {
        if (node.type === NodeTypes.CallExpression) {
        }
      }
    }
  })
}
