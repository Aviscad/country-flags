<script setup>
import CountryCard from './CountryCard.vue'
import SearchBar from './SearchBar.vue'
import { useGetCountries } from '../composables/useGetCountries'
import { ref, watch, watchEffect } from 'vue'

const { info } = useGetCountries()

const localData = ref(info)
const apiData = ref(null)
const countryList = ref([])
const countryRegion = ref(null) //Helper
const countryData = ref(null) //Full Data, Local or API
const page = ref(1)
const maxPages = ref(0)
const itemsPerPage = ref(25)
const searchText = ref('')
const selectedRegion = ref('All')

const getFlags = () => {
  if (countryData.value != null) {
    if (selectedRegion.value == 'All') {
      countryList.value = countryData.value.slice(
        page.value * itemsPerPage.value - itemsPerPage.value,
        itemsPerPage.value * page.value
      )
      maxPages.value = Math.ceil(countryData.value.length / itemsPerPage.value)
    } else {
      countryList.value = countryRegion.value.slice(
        page.value * itemsPerPage.value - itemsPerPage.value,
        itemsPerPage.value * page.value
      )
      maxPages.value = Math.ceil(countryRegion.value.length / itemsPerPage.value)
    }
  }
}

watchEffect(async () => {
  try {
    const country = await fetch(
      'https://restcountries.com/v3.1/alllll?fields=name,flags,capital,population,region'
    )
    if (country.ok) {
      const response = await country.json()
      const data = await response
      countryData.value = data
      apiData.value = data
    } else {
      countryData.value = localData.value
    }
    maxPages.value = Math.ceil(countryData.value.length / itemsPerPage.value)
    getFlags()
  } catch (error) {
    countryData.value = localData.value
  }
})

const filterByRegion = () => {
  if (!selectedRegion.value) return
  if (selectedRegion.value != 'All') {
    countryRegion.value = countryData.value.filter(
      (country) => country.region === selectedRegion.value
    )
  } 
  page.value = 1
  getFlags()
}

const searchByCountry = () => {
  if (selectedRegion.value == 'All') {
    countryList.value = countryData.value.filter(
      (country) =>
        country.name.common.toLowerCase().includes(searchText.value.toLowerCase()) ||
        (country.name.official.toLowerCase().includes(searchText.value.toLowerCase()) &&
          country.region === selectedRegion.value)
    )
  } else {
    countryList.value = countryRegion.value.filter(
      (country) =>
        country.name.common.toLowerCase().includes(searchText.value.toLowerCase()) ||
        (country.name.official.toLowerCase().includes(searchText.value.toLowerCase()) &&
          country.region === selectedRegion.value)
    )
  }
  page.value = 1
}

const searchResultText = () => {
  if (countryData.value !== null)
    return countryList.value.length === 0 && searchText.value !== ''
      ? `We couldn't find a country with the text `
      : ''
}

watch(page, getFlags)

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
      class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] p-3 pt-16 min-h-screen bg-light-background dark:bg-dark-background"
      :class="{
        'gap-0 place-items-start': countryList.length === 0 && searchText !== '',
        'gap-8 place-items-center': countryList.length > 1,
        'gap-8 grid-cols-1 place-items-center': countryList.length === 1
      }"
    >
      <SearchBar
        @search="searchText = $event"
        @region="selectedRegion = $event"
        class="w-full col-span-full row-span-full place-content-center sm:place-content-start lg:place-content-between"
      />
      <div
        v-show="countryList.length > 0"
        class="w-full col-span-full place-content-center sm:place-content-start lg:place-content-between"
      >
        <label for="pages">Page Number: </label>
        <input type="number" v-model="page" name="pages" min="1" :max="maxPages" />
      </div>

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
