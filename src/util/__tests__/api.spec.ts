import { describe, it, expect, vi } from 'vitest'

import { getShowDetails, getParamString, searchShows, API_BASE } from '../api'

global.fetch = vi.fn(() => Promise.resolve({
  json: () => [],
} as unknown as Response))

describe('getParamString', () => {
  it('returns correct query string', () => {
    expect(getParamString()).toBe('')
    expect(getParamString({})).toBe('')
    expect(getParamString({ a: 'foo', b: 'bar' })).toBe('?a=foo&b=bar')
  })
})

describe('searchShows', () => {
  it('calls correct endpoint', () => {
    searchShows('test')

    expect(fetch).toHaveBeenCalledWith(`${API_BASE}/search/shows?q=test`)
  })
})

describe('getShowDetails', () => {
  it('calls correct endpoint', () => {
    getShowDetails(12345)

    expect(fetch).toHaveBeenCalledWith(`${API_BASE}/shows/12345`)
  })
})
