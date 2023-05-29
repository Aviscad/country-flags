<script setup>
import { useGetByCCA3 } from '../composables/useGetByCCA3';
import { useGetCountries } from '../composables/useGetCountries'

const props = defineProps(['border']);
const { info } = useGetCountries()
const { getCountry } = useGetByCCA3(props.border, info)

</script>
<template>
  <div class="bg-gray-700 flex-grow text-center px-3 rounded-md font-light">
    {{  getCountry().name.common }}
  </div>
</template>
