<script setup>
import { computed } from 'vue'
const props = defineProps(['info'])

const getCapitalName = computed(() => {
  return props.info.capital == undefined ? 'not found' : props.info.capital[0]
})
</script>
<template>
  <figure class="max-w-[250px] rounded-md overflow-hidden shadow-md">
    <img
      class="object-cover w-[250px] h-40"
      :src="props.info.flags.svg && props.info.flags.png"
      :alt="props.info.flags.alt && `Image of the flag of ${props.info.name.common}`"
    />
    <figcaption class="flex flex-col p-5 border-t-slate-200 border-t-[1.5px] h-44">
      <h2 class="text-lg font-bold py-1">{{ props.info.name.common }}</h2>
      <div>
        <p><span class="font-semibold">Population:</span> {{ props.info.population }}</p>
        <p><span class="font-semibold">Region:</span> {{ props.info.region }}</p>
        <p><span class="font-semibold">Capital:</span> {{ getCapitalName }}</p>
      </div>
    </figcaption>
  </figure>
</template>
