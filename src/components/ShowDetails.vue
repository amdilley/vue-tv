<script setup lang="ts">
import { getShowDateRange } from '@/util/dates'
import type { Show } from '@/types/api'

defineProps<{
  show?: Show
}>()
</script>

<template>
  <div v-if="$props.show" class="show-details-container">
    <div class="show-details-header">
      <div class="show-details-header-primary">
        <div class="show-details-header--name">{{ $props.show.name }}</div>
        <div class="show-details-header--info">
          <div v-if="getShowDateRange($props.show)" class="show-details--dates">{{ getShowDateRange($props.show) }}</div>
          <div v-if="$props.show.network" class="show-details--network">{{ $props.show.network.name }}</div>
        </div>
      </div>
      <div class="show-details-header-secondary">
        <div v-if="$props.show.rating" class="show-details--rating-container">
          <div class="show-details--rating-title">Rating</div>
          <div class="show-details--rating-score">
            <span>{{ $props.show.rating.average }}</span>/10
          </div>
        </div>
      </div>
    </div>
    <div class="show-details-body">
      <div v-if="$props.show.image" class="show-poster">
        <img :src="$props.show.image.original" width="220" />
      </div>
      <div v-if="$props.show.summary" v-html="$props.show.summary" class="show-summary"/>
    </div>
  </div>
  <div v-else class="show-not-found">
    Show not found
  </div>
</template>

<style scoped>
.show-details-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
}

.show-details-header {
  display: flex;
}

.show-details-header-primary {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.show-details-header--name {
  font-size: 48px;
  font-weight: 400;
  line-height: normal;
}

.show-details-header--info {
  display: flex;
  gap: 8px;
}

.show-details--dates {
  font-size: 12px;
}

.show-details--network {
  font-size: 12px;
}

.show-details--rating-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.show-details--rating-title {
  font-size: 16px;
}

.show-details--rating-score > span {
  font-size: 18px;
  font-weight: 700;
}

.show-details-body {
  display: flex;
  gap: 10px;
}

.show-poster {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
}

.show-summary {
  padding: 0 6px;
  font-size: 16px;
}

.show-not-found {
  position: relative;
  top: -100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}

@media (max-width: 524px) {
  .show-details-body {
    flex-direction: column;
  }
}
</style>
