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

watchEffect(() => {
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

const getNativeName = computed(() => {
  return Object.keys(countryData.value.name.nativeName)[0] != undefined
    ? countryData.value.name.nativeName[Object.keys(countryData.value.name.nativeName)[0]].official
    : '---'
})

const back = () => {
  router.go(-1)
}
</script>
<template>
  <div class="relative min-h-screen w-full pt-20 grid place-content-center md:pt-10 lg:pt-0">
    <button
      @click="back"
      class="rounded-md px-4 py-1 m-1 ml-5 shadow shadow-slate-400 flex items-center justify-center gap-1 max-w-fit"
    >
      <font-awesome-icon icon="fa-solid fa-chevron-left" class="h-3.5 w-3.5" />
      Back
    </button>
    <div
      class="flex flex-col items-center p-5 pt-10 gap-10 md:flex-row md:items-center lg:items-center xl:gap-28"
    >
      <div>
        <img
          class="object-cover h-[200px] md:h-[250px] md:w-[450px] lg:w-[700px] lg:h-[400px] border border-slate-300"
          :src="countryData.flags.svg || countryData.flags.png"
          :alt="countryData.flags.alt || `Image of the flag of ${countryData.name.common}`"
        />
      </div>
      <div class="grid gap-3 w-[300px] p-5 md:grid-cols-2 md:gap-7 lg:w-[550px]">
        <h3 class="font-semibold text-2xl mb-1 md:col-span-full lg:text-3xl">
          {{ countryData.name.common }}
        </h3>
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
          <p>
            <span class="font-medium">Languagues:</span> {{ getLanguages(countryData.languages) }}
          </p>
        </div>
        <div class="md:col-span-full">
          <p>
            <span class="font-medium"
              >Border Countries: {{ countryData.borders.length === 0 ? '---' : '' }}</span
            >
          </p>
          <div class="flex flex-row gap-1.5 flex-wrap py-2">
            <BorderCountry
              v-for="border in countryData.borders"
              :key="countryData.name.common + '-' + border"
              :border="border"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
