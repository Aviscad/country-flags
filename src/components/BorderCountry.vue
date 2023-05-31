<script setup>
import { useRouter } from 'vue-router'
import { useGetByCCA3 } from '../composables/useGetByCCA3'
import { useGetCountries } from '../composables/useGetCountries'

const props = defineProps(['border'])
const { info } = useGetCountries()
const { getCountry } = useGetByCCA3(props.border, info)
const router = useRouter()

const goToBorder = () => {
  let country = getCountry().name.common
  router.push({ name: 'country', params: { name: country } })
}
</script>
<template>
  <button
    class="flex-grow text-center px-3 py-1 rounded-md font-light shadow shadow-slate-400"
    @click="goToBorder"
  >
    {{ getCountry().name.common }}
  </button>
</template>
