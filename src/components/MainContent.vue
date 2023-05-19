<script setup>
import CountryCard from './CountryCard.vue'
import SearchBar from './SearchBar.vue'
import { ref, watch } from 'vue'

const data = ref([])
const searchText = ref('')
const selectedRegion = ref('')

const getCountries = () => {
  fetch('https://restcountries.com/v3.1/all')
    .then((json) => json.json())
    .then((res) => {
      data.value = res
    })
    .catch((err) => console.log(err))
}

const filterByRegion = () => {
  if (!selectedRegion.value) return

  fetch('https://restcountries.com/v3.1/region/' + selectedRegion.value)
    .then((json) => json.json())
    .then((res) => {
      data.value = res
    })
    .catch((err) => console.log(err))
}

const searchByCountry = () => {
  if (searchText.value == '') {
    getCountries()
  } else {
    fetch('https://restcountries.com/v3.1/name/' + searchText.value)
      .then((json) => json.json())
      .then((res) => {
        data.value = res
      })
      .catch((err) => console.log(err))
  }
}

watch(selectedRegion, () => {
  searchText.value = ''
  filterByRegion()
})

watch(searchText, (val) => {
  if (!val == '') {
    searchByCountry()
  }
})

getCountries()
</script>
<template>
  <main class="p-5">
    <SearchBar @search="searchText = $event" @region="selectedRegion = $event" />
    {{ selectedRegion }}
    {{ searchText }}
    <section class="grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      <CountryCard v-for="flag in data" :key="flag.ccn3" :info="flag" />
    </section>
  </main>
</template>
