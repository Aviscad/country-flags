<script setup>
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'

const emit = defineEmits(['search', 'region'])

const search = ref('')
const regions = ref(['All', 'Asia', 'Europe', 'Africa', 'Americas', 'Antarctic', 'Oceania'])
const selectedRegion = ref('All')

const getRegion = () => {
  emit('region', selectedRegion.value)
}

const getSearch = () => {
  emit('search', search.value)
}

watchDebounced(
  search,
  () => {
    getSearch()
  },
  {
    debounce: 1000,
    maxWait: 1500
  }
)
</script>
<template>
  <form @submit.prevent class="p-3 flex gap-2">
    <div class="relative">
      <input
        type="text"
        v-model="search"
        placeholder="Search a country...."
        class="text-light-font bg-light-background border w-60 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 pl-10 sm:w-72 md:w-80 lg:w-96 dark:text-white dark:bg-dark-elements dark:border-none"
      />
      <font-awesome-icon
        icon="fa-solid fa-magnifying-glass"
        class="absolute left-2 top-1/2 -translate-y-1/2 z-30 h-5 w-5 text-gray-400"
      />
    </div>
    <select
      name="regions"
      v-model="selectedRegion"
      @change="getRegion"
      class="text-light-font bg-light-background border w-40 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 dark:text-white dark:bg-dark-elements dark:border-none"
    >
      <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
    </select>
  </form>
</template>
