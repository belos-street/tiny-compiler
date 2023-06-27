import { describe, expect, test } from 'vitest'
import { TokenTypes } from '../../tokenizer'
import { parser } from '..'
import { NodeTypes } from '../ast'

describe('parser test', () => {
  test('number node', () => {
    const tokens = [{ type: TokenTypes.Number, value: '2' }]

    const ast = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.NumberLiteral,
          value: '2'
        }
      ]
    }
    expect(parser(tokens)).toEqual(ast)
  })

  // test("parser tokens to ast", () => {
  //   const tokens = [
  //     { type: TokenTypes.Paren, value: "(" },
  //     { type: TokenTypes.Name, value: "add" },
  //     { type: TokenTypes.Number, value: "2" },
  //     { type: TokenTypes.Paren, value: "(" },
  //     { type: TokenTypes.Name, value: "subtract" },
  //     { type: TokenTypes.Number, value: "4" },
  //     { type: TokenTypes.Number, value: "2" },
  //     { type: TokenTypes.Paren, value: ")" },
  //     { type: TokenTypes.Paren, value: ")" },
  //   ];
  //   const ast = {
  //     type: NodeTypes.Program,
  //     body: [
  //       {
  //         type: NodeTypes.CallExpression,
  //         name: "add",
  //         params: [
  //           {
  //             type: NodeTypes.NumberLiteral,
  //             value: "2",
  //           },
  //           {
  //             type: NodeTypes.CallExpression,
  //             name: "subtract",
  //             params: [
  //               {
  //                 type: NodeTypes.NumberLiteral,
  //                 value: "4",
  //               },
  //               {
  //                 type: NodeTypes.NumberLiteral,
  //                 value: "2",
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   };
  //   expect(parser(tokens)).toEqual(ast);
  // });
})
