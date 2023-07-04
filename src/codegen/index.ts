/**
 * @description 将新的AST的对应节点生成目标代码
 * @param node
 */
export function codegen(node: any): string {
  switch (node.type) {
    case 'Program':
      return node.body.map(codegen).join('')
    case 'ExpressionStatement':
      return codegen(node.expression) + ';'
    case 'NumberLiteral':
      return node.value
    case 'CallExpression':
      return node.callee.name + '(' + node.arguments.map(codegen).join(', ') + ')'
    default:
      return ''
  }
}
