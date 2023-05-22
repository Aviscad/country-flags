<script setup>
import { ref, watch } from 'vue'
import debounce from 'lodash.debounce'

const emit = defineEmits(['search', 'region'])

const search = ref('')
const regions = ref(['All', 'Asia', 'Europe', 'Africa', 'Americas', 'Antarctic', 'Oceania'])
const selectedRegion = ref('All')

watch(
  search,
  debounce(() => {
    getSearch()
  }, 500)
)

function getRegion() {
  search.value = ''
  emit('region', selectedRegion.value)
}

function getSearch() {
  emit('search', search.value)
}
</script>
<template>
  <!-- set onChange on select, input add debounce -->
  <form @submit.prevent>
    <input
      type="text"
      v-model="search"
      class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5"
    />
    <select name="regions" v-model="selectedRegion" @change="getRegion">
      <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
    </select>
  </form>
</template>
