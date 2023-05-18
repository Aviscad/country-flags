<script setup>
import CountryCard from './CountryCard.vue'
import { ref } from 'vue'

const data = ref([])

const getCountries = () => {
  fetch('https://restcountries.com/v3.1/all')
    .then((json) => json.json())
    .then((res) => {
      data.value = res
      console.log(data.value)
    })
    .catch((err) => console.log(err))
}

getCountries()
</script>
<template>
  <main class="p-5 grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
    <CountryCard v-for="flag in data" :key="flag.ccn3" :info="flag" />
  </main>
</template>
