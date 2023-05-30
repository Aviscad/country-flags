<script setup>
import { computed, watchEffect, ref } from 'vue'
import BorderCountry from './BorderCountry.vue'
import { useRouter, useRoute } from 'vue-router'
import { useGetCountry } from '../composables/useGetCountry'
import { useGetCountries } from '../composables/useGetCountries'
import { useGetCapital } from '../composables/useGetCapitalName'
import { useFormatNum } from '../composables/useFormatNum'

const route = useRoute()
const router = useRouter()
const { info } = useGetCountries()
const { getCapitalName } = useGetCapital()
const { formatNum } = useFormatNum()

const countryData = ref([])

watchEffect(()=>{
  const { country } = useGetCountry(route.params.name, info)
  countryData.value = country.value
})

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

const getNativeName = computed(()=>{
  return Object.keys(countryData.value.name.nativeName)[0] != undefined ? countryData.value.name.nativeName[Object.keys(countryData.value.name.nativeName)[0]].official : '---'
})

const back = () => {
  router.go(-1)
}

</script>
<template>
  <div class="relative min-h-screen w-full bg-slate-200 z-10 p-5 outline-none pt-20">
    <button @click="back" class="border border-gray-500 rounded-md px-3 py-0.5 text-center">&#8592; Back</button>
    <div class="flex flex-col gap-5 p-5 leading-loose">
      <img
        class="object-cover max-w-[300px] max-h-[200px]"
        :src="countryData.flags.svg && countryData.flags.png"
        :alt="countryData.flags.alt && `Image of the flag of ${countryData.name.common}`"
      />
      <h3 class="font-semibold text-2xl">{{ countryData.name.common }}</h3>

      <div>
        <p><span class="font-medium">Native Name:</span> {{ getNativeName }}</p>
        <p>
          <span class="font-medium">Population:</span>
          {{ formatNum(countryData.population) }}
        </p>
        <p><span class="font-medium">Region:</span> {{ countryData.region }}</p>
        <p><span class="font-medium">Sub-Region:</span> {{ countryData.subregion }}</p>
        <p><span class="font-medium">Capital:</span> {{ getCapitalName(countryData.capital) }}</p>
      </div>
      <div>
        <p>
          <span class="font-medium">Top Level Domain: </span>
          <i>{{ getTopLvlDomains(countryData.tld) }}</i>
        </p>
        <p>
          <span class="font-medium">Currencies:</span> {{ getCurrencies(countryData.currencies) }}
        </p>
        <p><span class="font-medium">Languagues:</span> {{ getLanguages(countryData.languages) }}</p>
      </div>
      <div>
        <p>
          <span class="font-medium">Border Countries: {{  countryData.borders.length===0 ? '---' : '' }}</span>
        </p>
        <div class="flex flex-row gap-1.5 flex-wrap">
           <BorderCountry v-for="(border, i) in countryData.borders" :key="i" :border="border" /> 
        </div>
       
      </div>
    </div>
  </div>
</template>
