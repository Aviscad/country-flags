<script setup>
import CountryCard from './CountryCard.vue'
import SearchBar from './SearchBar.vue'
import { useGetCountries } from '../composables/useGetCountries'
import { ref, watch, watchEffect } from 'vue'

const { info } = useGetCountries()

const data = ref(info)
const apiData = ref(null)
const countryList = ref(null)
const searchText = ref('')
const selectedRegion = ref('All')

countryList.value = data.value

watchEffect(async () => {
  try {
    const country = await fetch('https://restcountries.com/v3.1/all/')
    if (country.ok) {
      const response = await country.json()
      const data = await response
      countryList.value = data
      apiData.value = data
    } else {
      countryList.value = data.value
    }
  } catch (error) {
    countryList.value = data.value
  }
})

const filterByRegion = () => {
  if (!selectedRegion.value) return
  if (selectedRegion.value == 'All') {
    apiData.value == null ? (countryList.value = data.value) : (countryList.value = apiData.value)
  } else {
    if (apiData.value != null) {
      countryList.value = apiData.value.filter((country) => country.region === selectedRegion.value)
    } else {
      countryList.value = data.value.filter((country) => country.region === selectedRegion.value)
    }
  }
}

const searchByCountry = () => {
  countryList.value = countryList.value.filter(
    (country) =>
      country.name.common.toLowerCase().includes(searchText.value.toLowerCase()) ||
      (country.name.official.toLowerCase().includes(searchText.value.toLowerCase()) &&
        country.region === selectedRegion.value)
  )
}

const searchResultText = () => {
  if (countryList.value !== null)
    return countryList.value.length === 0 && searchText.value !== ''
      ? `We couldn't find a country with the text `
      : ''
}

watch(selectedRegion, (val) => {
  if (!val) return
  filterByRegion()
  if (searchText.value != '') {
    searchByCountry()
  }
})

watch(searchText, (val) => {
  filterByRegion()
  if (val !== '') {
    searchByCountry()
  }
})
</script>
<template>
  <main>
    <section
      class="grid gap-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] p-3 pt-16 min-h-screen bg-light-background dark:bg-dark-background"
      :class="{
        'gap-0 place-items-start': countryList.length === 0 && searchText !== '',
        'place-items-center': countryList.length > 0
      }"
    >
      <SearchBar
        @search="searchText = $event"
        @region="selectedRegion = $event"
        class="w-full col-span-full row-span-full place-content-center sm:place-content-start lg:place-content-between"
      />
      <small
        v-if="countryList.length === 0 && searchText !== ''"
        class="text-sm text-red-500 w-full col-span-full italic text-center"
        >{{ searchResultText() }} <span class="font-bold">{{ searchText + '...' }}</span>
      </small>
      <template v-if="countryList != null">
        <CountryCard v-for="country in countryList" :key="country.ccn3" :info="country" />
      </template>
    </section>
  </main>
</template>
