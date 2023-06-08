import { ref } from 'vue'

export function useGetCountry(name, countries) {
	const country = ref([])

	if (countries.value) {
		country.value = countries.value.filter((country) => country.name.common == name)[0]
	}

	return { country }
}
