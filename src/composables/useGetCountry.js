import { ref } from 'vue'

export function useGetCountry(name, countries) {
  const country = ref([])

  //console.log(countries.value)
  const getCountry = () => {
    if (!countries.value) return
    country.value = countries.value.filter((country) => country.name.common == name)[0]
  }

  getCountry()
  // expose managed state as return value
  return { country }
}
