<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import debounce from 'lodash.debounce'
import { searchShows } from '@/util/api'
import { getShowDateRange } from '@/util/dates'
import type { Show, ShowResult } from '@/types/api';
import { useShowStore } from '@/stores/shows'

const props = defineProps<{
  delay?: number
  onSelect?: (show: Show) => void
}>()

const store = useShowStore()

const showResults = ref(false)
const search = ref('')
const results = ref<ShowResult[]>([])

const handleBlur = () => {
  showResults.value = false
}

const handleFocus = () => {
  showResults.value = true
}

const handleInput = debounce(async (q: string) => {
  if (q) {
    results.value = await searchShows(q)

    for (const { show } of results.value) {
      store.add(show.id, show)
    }
  } else {
    results.value = []
  }
}, props.delay ?? 300)

watchEffect(() => {
  handleInput(search.value)
})
</script>

<template>
  <div class="search-field-container">
    <input
      placeholder="Seach shows"
      v-model="search"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <div v-if="showResults" class="search-result-container">
      <div
        :key="result.show.id"
        class="search-result-item"
        @mousedown="$event => $props.onSelect?.(result.show)"
        v-for="result of results"
      >
        <div v-if="result.show.image" class="search-result-poster">
          <img :src="result.show.image.medium" height="80" />
        </div>
        <div class="search-result-details">
          <div class="search-result-details--name">{{ result.show.name }}</div>
          <div v-if="getShowDateRange(result.show)" class="search-result-details--dates">{{ getShowDateRange(result.show) }}</div>
          <div v-if="result.show.network" class="search-result-details--network">{{ result.show.network.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-field-container {
  position: relative;
  width: 100%;
  z-index: 10;
}

.search-field-container > input {
  width: 100%;
  height: 40px;
  font-size: 20px;
}

.search-result-container {
  position: absolute;
  top: calc(100% + 4px);
  width: 100%;
  max-height: 300px;
  background-color: var(--c-white);
  overflow-y: auto;
  scrollbar-width: none;
}

.search-result-item {
  display: flex;
  gap: 10px;
  padding: 6px;
  width: 100%;
  height: 100px;
  color: #222;
  cursor: pointer;
}

.search-result-item:hover {
  background-color: #ececec;
}

.search-result-details {
  flex: 1;
}

.search-result-details--name {
  font-size: 16px;
  font-weight: 700;
}

.search-result-details--dates {
  font-size: 12px;
}

.search-result-details--network {
  font-size: 12px;
}

.search-result-poster {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
}

@media (min-width: 1024px) {

}
</style>
