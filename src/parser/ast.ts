export enum NodeTypes {
  NumberLiteral = 'NumberLiteral', //数字字面量
  Program = 'Program', //根字面量
  StringLiteral = 'StringLiteral', //字符串字面量
  CallExpression = 'CallExpression' //表达式字面量
}

export type ChildNode = NumberLiteralNode | CallExpressionNode | StringLiteralNode

export type Node = {
  type: NodeTypes
}

export type RootNode = Node & {
  body: ChildNode[]
  type: NodeTypes.Program
  context?: ChildNode[]
}
export type NumberLiteralNode = Node & {
  type: NodeTypes.NumberLiteral
  value: string
}

export type StringLiteralNode = Node & {
  value: string
  type: NodeTypes.StringLiteral
}

export type CallExpressionNode = Node & {
  name: string
  params: ChildNode[]
  type: NodeTypes.CallExpression
  context?: ChildNode[]
}

/**
 * @function createRootNode 创建根节点
 * @function createStringLiteralNode 创建字符节点
 * @function createNumberLiteralNode 创建数字节点
 * @function createCallExpressionNode 创建表达式节点
 */
export function createRootNode(): RootNode {
  return {
    type: NodeTypes.Program,
    body: []
  }
}

export function createStringLiteralNode(value: string): StringLiteralNode {
  return {
    type: NodeTypes.StringLiteral,
    value
  }
}

export function createNumberLiteralNode(value: string): NumberLiteralNode {
  return {
    type: NodeTypes.NumberLiteral,
    value
  }
}

export function createCallExpressionNode(name: string): CallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    name,
    params: []
  }
}
