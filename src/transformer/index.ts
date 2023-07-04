import { NodeTypes, RootNode } from '../parser/ast'
import { traverser } from '../traverser'

export function transformer(ast: RootNode) {
  const newAst = {
    type: NodeTypes.Program,
    body: []
  }

  ast.context = newAst.body //旧的ast与新的ast建立连接

  traverser(ast, {
    CallExpression: {
      enter(node, parent) {
        if (node.type === NodeTypes.CallExpression) {
          let expression: any = {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: node.name
            },
            arguments: []
          }

          node.context = expression.arguments

          if (parent?.type !== NodeTypes.CallExpression) {
            expression = {
              type: 'ExpressionStatement',
              expression
            }
          }

          parent?.context?.push(expression as any)
        }
      }
    },

    NumberLiteral: {
      enter(node, parent) {
        if (node.type === NodeTypes.NumberLiteral) {
          const numberNode = {
            type: 'NumberLiteral',
            value: node.value
          }

          parent?.context?.push(numberNode as any)
        }
      }
    }
  })

  return newAst
}
