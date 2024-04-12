import { defineStore } from 'pinia'
import type { Show } from '@/types/api'
import { sortedInsert } from '@/util/sort'

export const useShowStore = defineStore('shows', {
  state: () => ({
    shows: {} as Record<number, Show | string>,
    topShows: [] as Show[],
  }),
  actions: {
    // id does exist on Show type but
    // should remain its own param in
    // the case of 404 responses that
    // we still want to cache but that
    // do not exist as Show instances
    add(id: number, show: Show | string) {
      // only add to array if not in cache
      if (typeof show !== 'string' && this.shows[id] === undefined) {
        const nextTopShows = sortedInsert(show, this.topShows, (a, b) => {
          const aVal = a.rating?.average ?? 0
          const bVal = b.rating?.average ?? 0

          if (aVal < bVal) {
            return -1
          } else if (aVal > bVal) {
            return 1
          } else {
            return 0
          }
        })

        // only maintain the top 10 shows
        this.topShows = nextTopShows.length > 10
          ? nextTopShows.slice(0, 10)
          : nextTopShows
      }

      this.shows[id] = show
    },
    remove(id: number) {
      const removalIndex = this.topShows.findIndex((show) => show.id === id)

      this.topShows.splice(removalIndex, 1)
      delete this.shows[id]
    },
    reset() {
      this.shows = {} as Record<number, Show>
      this.topShows = [] as Show[]
    }
  },
  persist: true,
})
