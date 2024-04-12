import { describe, it, expect } from 'vitest'

import { sortedInsert } from '../sort'

describe('sortedInsert', () => {
  interface Item { value: number }

  const comparator = (a: Item, b: Item) => a.value < b.value ? -1 : a.value > b.value ? 1 : 0

  it('sorts items in descending order according to compare function', () => {
    let mockSorted = [] as Item[]

    const mockTop = { value: 10 }
    const mockMid = { value: 5 }
    const mockLow = { value: 2 }

    mockSorted = sortedInsert(mockLow, mockSorted, comparator)

    expect(mockSorted).toEqual([mockLow])

    mockSorted = sortedInsert(mockTop, mockSorted, comparator)

    expect(mockSorted).toEqual([mockTop, mockLow])

    mockSorted = sortedInsert(mockMid, mockSorted, comparator)

    expect(mockSorted).toEqual([mockTop, mockMid, mockLow])
  })
})
