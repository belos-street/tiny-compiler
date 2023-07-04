import { test, expect } from 'vitest'
import { NodeTypes } from '../../parser/ast'
import { codegen } from '..'

test('codegen', () => {
  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'add'
          },
          arguments: [
            {
              type: 'NumberLiteral',
              value: '2'
            },
            {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'subtract'
              },
              arguments: [
                {
                  type: 'NumberLiteral',
                  value: '4'
                },
                {
                  type: 'NumberLiteral',
                  value: '2'
                }
              ]
            }
          ]
        }
      }
    ]
  }
  //toMatchInlineSnapshot: 这可确保某个值匹配最近的快照
  expect(codegen(ast)).toMatchInlineSnapshot('"add(2, subtract(4, 2));"')
})

test('two ExpressionStatement', () => {
  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'add'
          },
          arguments: [
            {
              type: 'NumberLiteral',
              value: '2'
            },
            {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'subtract'
              },
              arguments: [
                {
                  type: 'NumberLiteral',
                  value: '4'
                },
                {
                  type: 'NumberLiteral',
                  value: '2'
                }
              ]
            }
          ]
        }
      },
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'add'
          },
          arguments: [
            {
              type: 'NumberLiteral',
              value: '2'
            },
            {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'subtract'
              },
              arguments: [
                {
                  type: 'NumberLiteral',
                  value: '4'
                },
                {
                  type: 'NumberLiteral',
                  value: '2'
                }
              ]
            }
          ]
        }
      }
    ]
  }

  expect(codegen(ast)).toMatchInlineSnapshot('"add(2, subtract(4, 2));add(2, subtract(4, 2));"')
})
