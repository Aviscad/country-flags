<script setup>
import { useRouter } from 'vue-router'
import { useGetCapital } from '../composables/useGetCapitalName'
import { useFormatNum } from '../composables/useFormatNum'

const props = defineProps(['info'])
const router = useRouter()
const { getCapitalName } = useGetCapital()
const { formatNum } = useFormatNum()

const toCountryDetails = () => {
	router.push({ name: 'country', params: { name: props.info.name.common } })
}
</script>
<template>
	<figure
		class="max-w-[250px] text-light-font rounded-md overflow-hidden shadow-md transition-transform cursor-pointer hover:-translate-y-2 dark:text-white"
		@click="toCountryDetails"
		@keydown.enter="toCountryDetails"
		role="button"
		tabindex="0"
	>
		<img
			class="object-cover w-[250px] h-40"
			:src="props.info.flags.svg || props.info.flags.png"
			:alt="props.info.flags.alt || `Image of the flag of ${props.info.name.common}`"
		/>
		<figcaption
			class="flex flex-col p-5 border-t-slate-200 border-t-[1.5px] h-48 leading-loose bg-white dark:bg-dark-elements dark:border-t-dark-elements"
		>
			<h2 class="text-lg font-bold py-1">{{ props.info.name.common }}</h2>
			<div>
				<p><span class="font-semibold">Population:</span> {{ formatNum(props.info.population) }}</p>
				<p><span class="font-semibold">Region:</span> {{ props.info.region }}</p>
				<p><span class="font-semibold">Capital:</span> {{ getCapitalName(props.info.capital) }}</p>
			</div>
		</figcaption>
	</figure>
</template>
