import { describe, it, expect } from 'vitest'

import { getShowDateRange } from '../dates'

describe('getShowDateRange', () => {
  it('returns correct year range', () => {
    expect(getShowDateRange({ premiered: '2020-04-01', ended: '2024-03-09' })).toBe('2020-2024')
    expect(getShowDateRange({ premiered: '2020-04-01' })).toBe('2020-')
    expect(getShowDateRange({})).toBe(undefined)
    expect(getShowDateRange()).toBe(undefined)
  })
})
