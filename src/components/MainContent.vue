<script setup>
import CountryCard from './CountryCard.vue'
import SearchBar from './SearchBar.vue'
import { countries } from '../data/countriesV3.1.json'
import { ref, watch } from 'vue'

const data = ref([])
const countryList = ref(null)
const searchText = ref('')
const selectedRegion = ref('')

const getCountries = () => {
  // fetch('https://restcountries.com/v3.1/all')
  //   .then((json) => json.json())
  //   .then((res) => {
  //     data.value = res
  //   })
  //   .catch((err) => console.log(err))
  //   .finally(() => {
  //     countryList.value = data.value
  //   })
  //console.log(Object.keys(countries))
  //console.log(Object.entries(countries))
  if (data.value.length === 0) {
    Object.entries(countries).map((c) => data.value.push(c[1]))
  }
  countryList.value = data.value
}

const filterByRegion = () => {
  if (!selectedRegion.value) return
  countryList.value = data.value.filter((country) => country.region === selectedRegion.value)
}

const searchByCountry = () => {
  countryList.value = countryList.value.filter(
    (country) =>
      country.name.common.includes(searchText.value) ||
      country.name.official.includes(searchText.value)
  )
}

const searchResultText = () => {
  if (countryList.value !== null)
    return countryList.value.length === 0 && searchText.value !== ''
      ? `We couldn't find a contry called ${searchText.value}`
      : ''
}

watch(selectedRegion, (val) => {
  if (!val) return
  val == 'All' ? getCountries() : filterByRegion()
})

watch(searchText, (val) => {
  if (val === '') {
    getCountries()
  } else {
    searchByCountry()
  }
})

getCountries()
</script>
<template>
  <main>
    <section
      class="grid gap-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center p-5 absolute w-full"
    >
      <SearchBar
        @search="searchText = $event"
        @region="selectedRegion = $event"
        class="w-full col-span-full row-span-full"
      />
      {{ searchResultText() }}
      <CountryCard v-for="country in countryList" :key="country.ccn3" :info="country" />
    </section>
  </main>
</template>
