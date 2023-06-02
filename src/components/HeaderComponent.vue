<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const setIcon = computed(() => {
  return isDark.value ? 'fa-solid fa-sun' : 'fa-solid fa-moon'
})
</script>
<template>
  <header
    class="flex py-4 px-5 justify-between bg-light-background text-light-font text-lg fixed w-full z-50 shadow-md dark:bg-dark-elements dark:text-white"
  >
    <RouterLink class="font-nunito font-bold" to="/">Where in the World?</RouterLink>
    <button @click="toggleDark()">
      <font-awesome-icon :icon="setIcon" class="w-6 h-6 text-light-font dark:text-white" />
    </button>
  </header>
</template>
