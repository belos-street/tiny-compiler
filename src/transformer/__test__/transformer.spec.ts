import { transformer } from '..'
import { RootNode, NodeTypes } from '../../parser/ast'
import { expect, test } from 'vitest'

test('transformer test', () => {
  //add 2 (subtract 4 2)
  const originalAST: RootNode = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: '2'
          },
          {
            type: NodeTypes.CallExpression,
            name: 'subtract',
            params: [
              {
                type: NodeTypes.NumberLiteral,
                value: '4'
              },
              {
                type: NodeTypes.NumberLiteral,
                value: '2'
              }
            ]
          }
        ]
      }
    ]
  }

  // add(2, subtract(4,2))
  const transformedAST = {
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

  expect(transformer(originalAST)).toEqual(transformedAST)
})
