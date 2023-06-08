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
  maxPages.value = Math.ceil(countryList.value.length / itemsPerPage.value)
}

const searchResultText = () => {
  if (countryData.value !== null)
    return countryList.value.length === 0 && searchText.value !== ''
      ? `We couldn't find a country with the text `
      : ''
}

const previousPage = () => {
  if (page.value === 1) return
  page.value--
}

const nextPage = () => {
  if (page.value === maxPages.value) return
  page.value++
}

watchEffect(async () => {
  try {
    const country = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region'
    )
    if (country.ok) {
      const response = await country.json()
      const data = await response
      countryData.value = data
      apiData.value = data
    } else {
      countryData.value = localData.value
    }
  } catch (error) {
    countryData.value = localData.value
  }
  maxPages.value = Math.ceil(countryData.value.length / itemsPerPage.value)
  getFlags()
})

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
      class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-max p-3 pt-16 min-h-screen bg-light-background dark:bg-dark-background"
      :class="{
        'gap-0 place-items-start auto-rows-auto': countryList.length === 0 && searchText !== '',
        'gap-3.5 place-items-center': countryList.length > 1,
        'place-items-start': countryList.length === 1
      }"
    >
      <SearchBar
        @search="searchText = $event"
        @region="selectedRegion = $event"
        class="w-full col-span-full row-span-full place-content-center sm:place-content-between lg:place-content-between"
      />
      <div
        v-if="countryList.length > 0 && maxPages > 1"
        class="w-full col-span-full text-end px-4 py-1 select-none dark:text-white"
      >
        <button
          class="px-2 text-gray-500"
          :disabled="page === 1"
          :class="{
            'cursor-not-allowed': page === 1
          }"
          @click="previousPage"
        >
          <font-awesome-icon icon="fa-solid fa-angle-left" />
        </button>
        <span class="font-bold p-2">{{ page }}</span>
        <button
          class="px-2 text-gray-500"
          :class="{
            'cursor-not-allowed': page === maxPages
          }"
          :disabled="page === maxPages"
          @click="nextPage"
        >
          <font-awesome-icon icon="fa-solid fa-angle-right" />
        </button>
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
