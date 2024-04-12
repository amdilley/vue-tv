import type { Show } from '@/types/api'

export const getShowDateRange = (show: Partial<Pick<Show, 'premiered' | 'ended'>> = {}) => {
  if (!show.premiered) {
    return
  }

  return `${show.premiered.slice(0, 4)}-${show.ended?.slice(0, 4) ?? ''}`
}
