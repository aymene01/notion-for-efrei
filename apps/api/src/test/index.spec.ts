import { describe, expect, it } from 'vitest'

const sum = (a: number, b: number) => a + b

describe('sum', () => {
	it('should return 3', () => {
		expect(sum(1, 2)).toBe(3)
	})
})
