import {MessageResolver} from '../resolvers/MessageResolver'

test('returns message', () => {
  const resolver = new MessageResolver()
  expect(resolver.message()).toBe('Hello from the backend!')
})
