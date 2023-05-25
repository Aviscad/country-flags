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

const getTopLvlDomains = (domains) => {
  let helper = []
  domains.forEach((domain) => {
    helper.push(domain)
  })
  return helper.join(', ').trim()
}

const getCurrencies = (currencies) => {
  let helper = []
  Object.values(currencies).forEach((currency) => {
    helper.push(`${currency.name} (${currency.symbol})`)
  })
  return helper.join(', ').trim()
}

const getLanguages = (languages) => {
  let helper = []
  Object.values(languages).forEach((language) => {
    helper.push(language)
  })
  return helper.join(', ').trim()
}

window.scrollTo(0, 0)

const close = () => {
  router.push({ name: 'home' })
}
</script>
<template>
  <div class="relative min-h-screen w-full bg-slate-200 z-10 p-5 outline-none pt-20">
    <button @click="close" class="border border-gray-500 rounded-md px-2">&#8592; Back</button>
    <div class="flex flex-col gap-5 p-5 leading-loose">
      <img
        class="object-cover"
        :src="country.flags.svg && country.flags.png"
        :alt="country.flags.alt && `Image of the flag of ${country.name.common}`"
      />
      <h3 class="font-semibold text-lg">{{ country.name.common }}</h3>

      <div>
        <p>....</p>
        <p>
          <span class="font-semibold">Population:</span>
          {{ formatNum(country.population) }}
        </p>
        <p><span class="font-semibold">Region:</span> {{ country.region }}</p>
        <p><span class="font-semibold">Sub-Region:</span> {{ country.subregion }}</p>
        <p><span class="font-semibold">Capital:</span> {{ getCapitalName(country.capital) }}</p>
      </div>
      <div>
        <p>
          <span class="font-semibold">Top Level Domain:</span>
          {{ getTopLvlDomains(country.tld) }}
        </p>
        <p>
          <span class="font-semibold">Currencies:</span> {{ getCurrencies(country.currencies) }}
        </p>
        <p><span class="font-semibold">Languagues:</span> {{ getLanguages(country.languages) }}</p>
      </div>
    </div>
  </div>
</template>
