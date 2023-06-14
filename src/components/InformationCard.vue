<script setup>
import { computed, watchEffect, ref } from 'vue'
import BorderCountry from './BorderCountry.vue'
import { useRouter, useRoute } from 'vue-router'
import { useGetCountry } from '../composables/useGetCountry'
import { useGetCountries } from '../composables/useGetCountries'
import { useGetCapital } from '../composables/useGetCapitalName'
import { useFormatNum } from '../composables/useFormatNum'

const route = useRoute()
const router = useRouter()
const { info } = useGetCountries()
const { getCapitalName } = useGetCapital()
const { formatNum } = useFormatNum()

const countryData = ref([])

const getTopLvlDomains = (domains) => {
	let helper = []
	domains.forEach((domain) => {
		helper.push(domain)
	})
	return helper.join(', ').trim()
}

const getCurrencies = (currencies) => {
	if (currencies === undefined) return '---'
	let helper = []
	Object.values(currencies).forEach((currency) => {
		helper.push(`${currency.name} (${currency.symbol})`)
	})
	return helper.join(', ').trim()
}

const getLanguages = (languages) => {
	if (languages === undefined) return '---'
	let helper = []
	Object.values(languages).forEach((language) => {
		helper.push(language)
	})
	return helper.join(', ').trim()
}

const back = () => {
	router.go(-1)
}

const toNotFound = () => {
	router.push({ name: 'notfound' })
}

const getNativeName = computed(() => {
	if (countryData.value.name.nativeName == undefined) return '---'
	return Object.keys(countryData.value.name.nativeName)[0] != undefined
		? countryData.value.name.nativeName[Object.keys(countryData.value.name.nativeName)[0]].official
		: '---'
})

watchEffect(async () => {
	try {
		const country = await fetch('https://restcountries.com/v3.1/name/' + route.params.name)
		if (country.ok) {
			const response = await country.json()
			countryData.value = await response[0]
		} else {
			const { country } = useGetCountry(route.params.name, info)
			countryData.value = country.value
			if (!countryData.value) toNotFound()
		}
	} catch (error) {
		const { country } = useGetCountry(route.params.name, info)
		countryData.value = country.value
		if (!countryData.value) toNotFound()
	}
})
</script>
<template>
	<div
		v-if="countryData.length != 0"
		class="min-h-screen w-full pt-20 bg-light-background grid place-content-center dark:bg-dark-background"
	>
		<button
			@click="back"
			class="btn"
		>
			<font-awesome-icon
				icon="fa-solid fa-chevron-left"
				class="h-3.5 w-3.5"
			/>
			Back
		</button>
		<div
			class="flex flex-col items-center p-5 pt-10 gap-10 md:flex-row md:items-center lg:items-center xl:gap-28 dark:text-white"
		>
			<div>
				<img
					class="object-cover h-[200px] w-[300px] md:h-[250px] md:w-[450px] lg:w-[700px] lg:h-[400px] border border-slate-300 dark:border-none"
					:src="countryData.flags.svg || countryData.flags.png"
					:alt="countryData.flags.alt || `Image of the flag of ${countryData.name.common}`"
				/>
			</div>
			<div class="grid gap-3 w-[300px] p-5 md:grid-cols-2 md:gap-7 lg:w-[550px]">
				<h3 class="font-semibold text-2xl mb-1 md:col-span-full lg:text-3xl">
					{{ countryData.name.common }}
				</h3>
				<div>
					<p><span class="font-medium">Native Name:</span> {{ getNativeName }}</p>
					<p>
						<span class="font-medium">Population:</span>
						{{ formatNum(countryData.population) }}
					</p>
					<p><span class="font-medium">Region:</span> {{ countryData.region }}</p>
					<p><span class="font-medium">Sub-Region:</span> {{ countryData.subregion }}</p>
					<p><span class="font-medium">Capital:</span> {{ getCapitalName(countryData.capital) }}</p>
				</div>
				<div>
					<p>
						<span class="font-medium">Top Level Domain: </span>
						<i>{{ getTopLvlDomains(countryData.tld) }}</i>
					</p>
					<p>
						<span class="font-medium">Currencies:</span> {{ getCurrencies(countryData.currencies) }}
					</p>
					<p>
						<span class="font-medium">Languagues:</span> {{ getLanguages(countryData.languages) }}
					</p>
				</div>
				<div class="md:col-span-full">
					<p>
						<span class="font-medium"
							>Border Countries: {{ countryData.borders == undefined ? '---' : '' }}</span
						>
					</p>
					<div class="flex flex-row gap-1.5 flex-wrap py-2">
						<BorderCountry
							v-for="border in countryData.borders"
							:key="countryData.name.common + '-' + border"
							:border="border"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div
		v-else
		class="relative min-h-screen w-full bg-light-background grid place-content-center place-items-center dark:bg-dark-background"
	>
		<div class="flex items-center justify-center p-5 gap-1 text-light-font dark:text-white">
			<font-awesome-icon
				icon="fa-solid fa-spinner"
				size="lg"
				class="animate-spin"
			/>
			<span class="italic">Loading...</span>
		</div>
	</div>
</template>
