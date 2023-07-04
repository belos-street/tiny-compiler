import { test, expect } from 'vitest'
import { compiler } from '../'
test('compiler', () => {
  const code = `(add 2 (subtract 4 2))`

  expect(compiler(code)).toBe('add(2, subtract(4, 2));')
})
