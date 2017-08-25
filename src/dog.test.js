/* eslint-disable */
import { dog, bark, wolf } from './dog'

test('dog barks', () => {
  expect(bark(dog)).toBe('dog says bark!!')
})

test('wolf barks', () => {
  expect(bark(wolf)).toBe('wolf says bark!!')
})
