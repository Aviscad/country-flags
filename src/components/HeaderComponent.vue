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
		class="flex py-4 px-5 justify-between bg-light-background text-light-font text-lg fixed w-full z-30 shadow-md dark:bg-dark-elements dark:text-white"
	>
		<RouterLink
			class="font-nunito font-bold"
			to="/"
			>Where in the World?</RouterLink
		>
		<label class="flex text-sm items-center gap-2 select-none">
			Dark Mode
			<button
				@click="toggleDark()"
				@keydown.space="toggleDark()"
				class="bg w-12 flex items-center p-1 rounded-2xl border border-gray-300 dark:border-none dark:bg-dark-background"
				:class="{
					'justify-start': !isDark,
					'justify-end': isDark
				}"
				type="button"
				role="switch"
				:aria-checked="isDark"
				tabindex="0"
			>
				<font-awesome-icon
					:icon="setIcon"
					class="w-4 h-4 rounded-full p-0.5"
				/></button
		></label>
	</header>
</template>
