<script setup lang="ts">
import { useRouter } from 'vue-router'
import ShowGrid from '../components/ShowGrid.vue'
import ShowSearch from '../components/ShowSearch.vue'
import { useShowStore } from '@/stores/shows'
import type { Show } from '@/types/api';

const router = useRouter()
const store = useShowStore()

const handleSelect = (show: Show) => {
  router.push(`/shows/${show.id}`)
}
</script>

<template>
  <header>
    <ShowSearch :on-select="handleSelect" />
  </header>
  <main>
    <h2 v-if="store.topShows.length">Top searched shows</h2>
    <ShowGrid :shows="store.topShows" :on-select="handleSelect"/>
  </main>
</template>

<style scoped>
main > h2 {
  padding: 20px 0;
}
</style>
