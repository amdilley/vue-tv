<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import ShowDetails from '../components/ShowDetails.vue'
import { getShowDetails } from '@/util/api'
import type { Show } from '@/types/api'
import { useShowStore } from '@/stores/shows'

const show = ref<Show | string>()
const loading = ref(false)
const error = ref<string | null>(null)

const route = useRoute()
const store = useShowStore()

const handleShowLoad = async () => {
  const showId = Number(route.params.id)

  if (store.shows[showId]) {
    show.value = store.shows[showId]
    return
  }

  loading.value = true

  try {
    show.value = await getShowDetails(showId)
    store.add(showId, show.value)
  } catch (err) {
    error.value = 'Could not load show'
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id, handleShowLoad, { immediate: true })
</script>

<template>
  <nav>
    <RouterLink to="/">← Back to search</RouterLink>
  </nav>
  <main v-if="show" class="show">
    <ShowDetails :show="typeof show !== 'string' ? show : undefined"/>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .show {
    max-width: 1024px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
  }
}
</style>
