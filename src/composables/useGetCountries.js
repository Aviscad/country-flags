import { ref } from 'vue'
import { countries } from '../data/countriesV3.1.json'

export function useGetCountries() {
  const info = ref([])

  if (info.value.length === 0) {
    Object.entries(countries).forEach((c) => info.value.push(c[1]))
  }

  return { info }
}
