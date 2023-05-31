<script setup>
import CountryCard from './CountryCard.vue'
import SearchBar from './SearchBar.vue'
import { useGetCountries } from '../composables/useGetCountries'
import { ref, watch } from 'vue'

const { info } = useGetCountries()

const data = ref(info)
const countryList = ref(null)
const searchText = ref('')
const selectedRegion = ref('All')

countryList.value = data.value

const filterByRegion = () => {
  if (!selectedRegion.value) return
  if (selectedRegion.value == 'All') {
    countryList.value = data.value
  } else {
    countryList.value = data.value.filter((country) => country.region === selectedRegion.value)
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
      ? `We couldn't find a contry called ${searchText.value}`
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
      class="grid gap-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center p-3 pt-16 w-full"
    >
      <SearchBar
        @search="searchText = $event"
        @region="selectedRegion = $event"
        class="w-full col-span-full row-span-full place-content-center sm:place-content-start lg:place-content-between"
      />
      {{ searchResultText() }}
      <CountryCard v-for="country in countryList" :key="country.ccn3" :info="country" />
    </section>
  </main>
</template>
