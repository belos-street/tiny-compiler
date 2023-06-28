import { NodeTypes, RootNode, ChildNode, CallExpressionNode } from '../parser/ast'

type ParentNode = RootNode | CallExpressionNode | undefined
type MethodFn = (node: RootNode | ChildNode, parentNode: ParentNode) => void
type VisitorOption = {
  enter: MethodFn
  exit?: MethodFn
}

export type Visitor = {
  Program?: VisitorOption
  NumberLiteral?: VisitorOption
  CallExpression?: VisitorOption
  StringLiteral?: VisitorOption
}

/**
 * @function traverser 深度优先遍历整颗AST
 * @param rootNode - RootNode
 * @param visitor - 暴露出每个节点的操作函数
 * @description 需要对每个节点做进入，退出的操作，则需要先遍历整颗树
 */
export function traverser(rootNode: RootNode, visitor: Visitor) {
  // 遍历树 深度优先搜索
  function traverArray(array: ChildNode[], parent: ParentNode) {
    for (const node of array) {
      traverNode(node, parent)
    }
  }

  function traverNode(node: RootNode | ChildNode, parent?: ParentNode) {
    /** 执行enter */
    const methods = visitor[node.type]
    methods && methods.enter(node, parent)

    switch (node.type) {
      case NodeTypes.Program:
        traverArray(node.body, node)
        break
      case NodeTypes.CallExpression:
        traverArray(node.params, node)
        break
      case NodeTypes.NumberLiteral:
        break
      default:
        break
    }

    /** 执行exit */
    methods && methods.exit && methods.exit(node, parent)
  }
  traverNode(rootNode)
}
