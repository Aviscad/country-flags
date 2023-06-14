<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
	<div
		class="min-h-screen w-full text-center pt-20 pb-10 flex flex-col gap-2 items-center justify-center dark:bg-dark-background sm:flex-row"
	>
		<img
			class="max-w-[275px] md:max-w-[350px]"
			src="@/assets/404.png"
			alt="Image of a Broken Robot with a not Found Error"
		/>
		<div class="flex flex-col items-center md:max-w-[500px] md:items-start">
			<p class="text-lg text-gray-600 p-3 dark:text-gray-300 md:text-xl md:text-left">
				We're not sure how you got here, but we couldn't find what you were looking for...
			</p>
			<RouterLink
				to="/"
				class="btn"
				><font-awesome-icon
					icon="fa-solid fa-chevron-left"
					class="h-3.5 w-3.5"
				/>Go Back Home</RouterLink
			>
		</div>
	</div>
</template>
