import type { Show, ShowResult } from '../types/api'

export const API_BASE = 'https://api.tvmaze.com'

export const getParamString = (params: Record<string, string> = {}) => {
  let str = ''

  for (const k in params) {
    str += `&${k}=${params[k] ?? ''}`
  }

  return str ? `?${str.slice(1)}` : str
}

// TV show API
const apiFactory = <T extends object>(path: string, params: Record<string, string> = {}) =>
  fetch(`${API_BASE}${path}${getParamString(params)}`)
    .then(response => response.json() as T)

export const searchShows = (query: string) => apiFactory<ShowResult[]>('/search/shows', { q: query })

export const getShowDetails = (id: number) => apiFactory<Show>(`/shows/${id}`)
