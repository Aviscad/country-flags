<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useGetCountry } from '../composables/useGetCountry'
import { useGetCountries } from '../composables/useGetCountries'
const route = useRoute()
const router = useRouter()

const { info } = useGetCountries()
const { country } = useGetCountry(route.params.name, info)

const close = () => {
  router.push({ name: 'home' })
}
</script>
<template>
  <div class="fixed left-0 bottom-0 top-[60px] h-full w-full bg-slate-200 z-10 p-5 outline-none">
    <button @click="close" class="border border-gray-500 rounded-md px-2">Back</button>
    <div class="flex flex-col items-center justify-center">
      <img
        class="object-cover"
        :src="country.flags.svg && country.flags.png"
        :alt="country.flags.alt && `Image of the flag of ${country.name.common}`"
      />
    </div><h3>{{ props.info.name.common }}</h3> -->
    </div>
    <h3>{{ country.name.common }}</h3>
  </div>
</template>
