<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useGetByCCA3 } from '../composables/useGetByCCA3'
import { useGetCountries } from '../composables/useGetCountries'

const router = useRouter()

const props = defineProps(['border'])

const countryName = ref('')

const goToBorder = () => {
  router.push({ name: 'country', params: { name: countryName.value } })
}

watchEffect(async () => {
  try {
    const country = await fetch(
      'https://restcountries.com/v3.1/alpha/' + props.border + '?fields=name'
    )
    if (country.ok) {
      const response = await country.json()
      countryName.value = await response.name.common
    } else {
      const { info } = useGetCountries()
      const { getCountry } = useGetByCCA3(props.border, info)
      countryName.value = getCountry().name.common
    }
  } catch (error) {
    const { info } = useGetCountries()
    const { getCountry } = useGetByCCA3(props.border, info)
    countryName.value = getCountry().name.common
  }
})
</script>
<template>
  <button
    class="flex-grow text-center bg-white px-3 py-1 rounded-md font-light shadow shadow-slate-400 dark:bg-dark-elements dark:text-white dark:shadow-slate-500"
    @click="goToBorder"
  >
    {{ countryName }}
  </button>
</template>
