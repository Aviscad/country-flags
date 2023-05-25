<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useGetCountry } from '../composables/useGetCountry'
import { useGetCountries } from '../composables/useGetCountries'
import { useGetCapital } from '../composables/useGetCapitalName'
import { useFormatNum } from '../composables/useFormatNum'

const route = useRoute()
const router = useRouter()

const { info } = useGetCountries()
const { country } = useGetCountry(route.params.name, info)
const { getCapitalName } = useGetCapital()
const { formatNum } = useFormatNum()

const close = () => {
  router.push({ name: 'home' })
}
</script>
<template>
  <div class="relative min-h-screen w-full bg-slate-200 z-10 p-5 outline-none pt-20">
    <button @click="close" class="border border-gray-500 rounded-md px-2">&#8592; Back</button>
    <div class="flex flex-col items-center justify-center p-5">
      <img
        class="object-cover"
        :src="country.flags.svg && country.flags.png"
        :alt="country.flags.alt && `Image of the flag of ${country.name.common}`"
      />
      <h3 class="font-semibold text-lg">{{ country.name.common }}</h3>

      <div>
        <p>
          <span class="font-semibold">Population:</span>
          {{ formatNum(country.population) }}
        </p>
        <p><span class="font-semibold">Region:</span> {{ country.region }}</p>
        <p>
          <span class="font-semibold">Capital:</span> {{ getCapitalName(country.value.capital) }}
        </p>
        <p></p>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit obcaecati repudiandae
        pariatur ad, voluptatibus dolorum beatae quia, nisi repellendus optio dolor eius ipsum odit
        sapiente est nesciunt. Quo, quaerat aut.
      </p>
    </div>
  </div>
</template>
