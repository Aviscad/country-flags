<script setup>
import CountryCard from './CountryCard.vue'
import SearchBar from './SearchBar.vue'
import { useGetCountries } from '../composables/useGetCountries'
import { ref, watch, watchEffect, computed, onUpdated, onMounted, onBeforeUnmount } from 'vue'

const { info } = useGetCountries()

const localData = ref(info)
const apiData = ref(null)
const countryList = ref([])
const countryRegion = ref(null) //Countries Per Region
const countryData = ref(null) //Full Data, Local or API
const page = ref(1)
const navigation = ref(null)
const maxPages = ref(0)
const itemsPerPage = ref(20)
const showScroolTop = ref(false)
const searchText = ref('')
const isNextpage = ref(null)
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
	isNextpage.value = false
	page.value--
}

const nextPage = () => {
	if (page.value === maxPages.value) return
	isNextpage.value = true
	page.value++
}

const toPage = (pageNumber) => {
	if (!pageNumber) return
	isNextpage.value = null
	page.value = pageNumber
}

const scrollUp = () => {
	window.scrollTo(0, 0)
}

const scrollPosition = () => {
	const maxHeigth = window.document.body.offsetHeight - window.innerHeight
	const currentPosition = window.scrollY

	if (currentPosition > maxHeigth / 2 + 1) {
		showScroolTop.value = true
	} else {
		showScroolTop.value = false
	}
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

const leaveActiveClass = computed(() => {
	if (isNextpage.value == null) {
		return 'slide-from-bottom'
	} else if (isNextpage.value) {
		return 'slide-from-left'
	} else {
		return 'slide-from-right'
	}
})

watch(itemsPerPage, () => {
	isNextpage.value = null
	getFlags()
})

watchEffect(async () => {
	try {
		const country = await fetch(
			'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,ccn3'
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

	//Sort A-Z
	const collator = new Intl.Collator('en', { sensitivity: 'base' })
	countryData.value.sort((a, b) => collator.compare(a.name.common, b.name.common))

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

onMounted(() => {
	window.addEventListener('scroll', scrollPosition)
})

onUpdated(() => {
	//Handling aria-current dynamically
	if (navigation.value) {
		const children = Object.values(navigation.value.children)
		children.pop() //Removing NextPage Node
		children.shift() //Reemoving PreviousPage Node

		children.forEach((child) => {
			const childClasses = child.classList
			if (childClasses.contains('selected-page')) {
				child.setAttribute('aria-current', page.value)
			} else {
				if (child.hasAttribute('aria-current')) child.removeAttribute('aria-current')
				return
			}
		})
	}
})

onBeforeUnmount(() => {
	window.removeEventListener('scroll', scrollPosition)
})
</script>
<template>
	<main>
		<section
			class="grid gap-2 grid-cols-3 p-3 pt-16 min-h-screen bg-light-background dark:bg-dark-background"
			aria-label="List of Countries with General Information About them"
		>
			<SearchBar
				@search="searchText = $event"
				@region="selectedRegion = $event"
				class="col-span-full place-content-between xl:col-start-1 xl:col-end-3 xl:place-content-start"
			/>
			<article
				v-if="countryList.length > 0 && maxPages > 1 && searchText == ''"
				class="col-span-full flex flex-col gap-2 justify-between items-center text-center px-4 py-1 select-none dark:text-white sm:justify-end sm:flex-row xl:col-start-3"
			>
				<label class="flex items-center gap-2 dark:text-white text-sm">
					Items per Page:
					<select
						v-model="itemsPerPage"
						tabindex="0"
						class="text-light-font bg-light-background border w-14 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 h-9 dark:text-white dark:bg-dark-elements dark:border-none sm:mr-5"
					>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="20">20</option>
					</select>
				</label>
				<nav
					ref="navigation"
					aria-label="Pagination"
				>
					<button
						class="px-1 text-gray-500"
						:disabled="page === 1"
						:class="{
							'cursor-not-allowed': page === 1
						}"
						aria-label="First Page"
						@click=";(page = 1), (isNextpage = false)"
					>
						<font-awesome-icon icon="fa-solid fa-angles-left" />
					</button>
					<button
						class="px-2 text-gray-500"
						:disabled="page === 1"
						:class="{
							'cursor-not-allowed': page === 1
						}"
						@click="previousPage"
						aria-label="Previous Page"
					>
						<font-awesome-icon icon="fa-solid fa-angle-left" />
					</button>
					<button
						v-if="getPageNumber(1) > 0"
						class="page-item"
						:class="{
							'selected-page': getPageNumber(1) == page
						}"
						:aria-label="'Page ' + getPageNumber(1)"
						@keydown.enter="toPage(getPageNumber(1))"
						@click="toPage(getPageNumber(1))"
					>
						{{ getPageNumber(1) }}
					</button>
					<button
						class="page-item"
						:class="{
							'selected-page': getPageNumber(2) == page
						}"
						:aria-label="'Page ' + getPageNumber(2)"
						@keydown.enter="toPage(getPageNumber(2))"
						@click="toPage(getPageNumber(2))"
					>
						{{ getPageNumber(2) }}
					</button>
					<button
						class="page-item"
						:class="{
							'selected-page': getPageNumber(3) == page
						}"
						:aria-label="'Page ' + getPageNumber(3)"
						@keydown.enter="toPage(getPageNumber(3))"
						@click="toPage(getPageNumber(3))"
					>
						{{ getPageNumber(3) }}
					</button>
					<button
						class="px-2 text-gray-500"
						:disabled="page === maxPages"
						:class="{
							'cursor-not-allowed': page === maxPages
						}"
						@click="nextPage"
						aria-label="Next Page"
					>
						<font-awesome-icon icon="fa-solid fa-angle-right" />
					</button>
					<button
						class="px-1 text-gray-500"
						:disabled="page === maxPages"
						:class="{
							'cursor-not-allowed': page === maxPages
						}"
						aria-label="Last Page"
						@click=";(page = maxPages), (isNextpage = true)"
					>
						<font-awesome-icon icon="fa-solid fa-angles-right" />
					</button>
				</nav>
			</article>

			<small
				v-if="countryList.length === 0 && searchText !== ''"
				class="p-10 text-sm text-red-500 w-full col-span-full italic text-center"
				>{{ searchResultText() }} <span class="font-bold">{{ searchText + '...' }}</span>
			</small>

			<article
				class="col-span-full grid gap-3.5 place-items-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-max p-3 min-h-screen bg-light-background dark:bg-dark-background"
				:class="{
					'place-items-start': countryList.length == 0 && searchText != ''
				}"
				aria-label="List of Countries with General Information About them"
			>
				<TransitionGroup
					name="fade"
					:leave-active-class="leaveActiveClass"
				>
					<template v-if="countryList != null">
						<CountryCard
							v-for="country in countryList"
							:key="country.ccn3"
							:info="country"
						/>
					</template>
				</TransitionGroup>
			</article>
			<!-- Scroll Top -->
			<Transition name="fade">
				<button
					v-if="showScroolTop && countryList.length != 0"
					class="animate-bouncing w-11 h-11 border text-dark-elements fixed bottom-5 right-5 rounded-full z-30 bg-light-background dark:bg-dark-elements dark:text-white"
					@click="scrollUp"
				>
					<font-awesome-icon
						icon="fa-solid fa-arrow-up"
						size="2xl"
					/>
				</button>
			</Transition>
		</section>
	</main>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
	transition: all 0.75s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.slide-from-bottom {
	position: absolute;
	bottom: -100%;
}

.slide-from-left {
	position: absolute;
	left: -100%;
	top: 280px;
}

.slide-from-right {
	position: absolute;
	top: 280px;
	right: -100%;
}
</style>
