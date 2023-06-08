import { unref } from 'vue'
export function useGetByCCA3(cca3, countries) {
	const getCountry = () => {
		unref(countries)
		if (!countries.value) return
		return countries.value.filter((country) => country.cca3 == cca3)[0]
	}

	return { getCountry }
}
