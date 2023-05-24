import { ref } from 'vue'
import { countries } from '../data/countriesV3.1.json'

export function useGetCountries() {
  const info = ref([])

  const getCountries = () => {
    if (info.value.length === 0) {
      Object.entries(countries).forEach((c) => info.value.push(c[1]))
    }
  }

  getCountries()
  // expose managed state as return value
  return { info }
}
