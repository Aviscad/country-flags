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
			? `Sorry, we couldn't find a country with the text `
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

const toPage = (pageNumber) => {
	if (!pageNumber) return
	page.value = pageNumber
}

const getPageNumber = (pageSegment = 1) => {
	/*
		1: First Number in Pagination
		2: Second Number in Pagination
		3: Third Number in Pagination
	*/
	if (pageSegment === 1) {
		return page.value >= maxPages.value - 2 ? maxPages.value - 2 : page.value
	} else if (pageSegment === 2) {
		return page.value >= maxPages.value - 1 ? maxPages.value - 1 : page.value + 1
	} else if (pageSegment === 3) {
		if (page.value == maxPages.value) {
			return maxPages.value
		} else if (page.value <= maxPages.value - 2) {
			return page.value + 2
		} else {
			return maxPages.value
		}
	}
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
			class="grid gap-3.5 place-items-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-max p-3 pt-16 min-h-screen bg-light-background dark:bg-dark-background"
			:class="{
				'place-items-start': countryList.length == 0 && searchText != ''
			}"
		>
			<SearchBar
				@search="searchText = $event"
				@region="selectedRegion = $event"
				class="w-full col-span-full row-span-full place-content-center sm:place-content-between lg:place-content-between"
			/>
			<div
				v-if="countryList.length > 0 && maxPages > 1"
				class="w-full col-span-full text-center px-4 py-1 select-none dark:text-white sm:text-end"
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
				<span
					v-if="getPageNumber(1) > 0"
					class="page-item"
					:class="{
						'selected-page': getPageNumber(1) == page
					}"
					@click="toPage(getPageNumber(1))"
					>{{ getPageNumber(1) }}</span
				>
				<span
					class="page-item"
					:class="{
						'selected-page': getPageNumber(2) == page
					}"
					@click="toPage(getPageNumber(2))"
					>{{ getPageNumber(2) }}</span
				>
				<span
					class="page-item"
					:class="{
						'selected-page': getPageNumber(3) == page
					}"
					@click="toPage(getPageNumber(3))"
					>{{ getPageNumber(3) }}</span
				>
				<button
					class="page-item"
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
				class="p-10 text-sm text-red-500 w-full col-span-full italic text-center"
				>{{ searchResultText() }} <span class="font-bold">{{ searchText + '...' }}</span>
			</small>
			<template v-if="countryList != null">
				<CountryCard
					v-for="country in countryList"
					:key="country.ccn3"
					:info="country"
				/>
			</template>
		</section>
	</main>
</template>
