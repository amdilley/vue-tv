<script setup lang="ts">
import type { Show } from '@/types/api'

defineProps<{
  shows: Show[]
  onSelect?: (show: Show) => void
}>()
</script>

<template>
  <div class="show-card-grid">
    <div
      :key="show.id"
      class="show-card-container"
      @click.prevent="$event => $props.onSelect?.(show)"
      v-for="show in $props.shows"
    >
      <div v-if="show.image" class="show-poster">
        <img :src="show.image.medium" width="220" />
      </div>
      <div v-else class="show-card-name">{{ show.name }}</div>
      <div v-if="show.rating" class="show-card--rating-container">
        <div class="show-card--rating-score">
          <span>{{ show.rating.average }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.show-card-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
}

.show-card-container {
  position: relative;
  width: 220px;
  cursor: pointer;
}

.show-card--rating-container {
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
}

.show-card--rating-score > span {
  color: var(--c-white);
  text-shadow: 0 0 1px var(--c-black);
  font-size: 18px;
  font-weight: 700;
}

.show-poster {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
}

@media (max-width: 1024px) {
  .show-card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .show-card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 524px) {
  .show-card-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
