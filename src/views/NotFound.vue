<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
	<div
		class="min-h-screen w-full text-center pt-20 bg-light-background grid place-content-center place-items-center dark:bg-dark-background"
	>
		<p class="font-semibold text-gray-600 p-3 dark:text-gray-600">
			We're not sure how you got here, but we couln't find what you were looking for...
		</p>
		<img
			class="max-w-[275px]"
			src="@/assets/404.png"
			alt="Image of a Broken Robot with a not Found Error"
		/>
		<RouterLink
			to="/"
			class="bg-orange-200 rounded-full px-2 mt-2 py-1 hover:bg-orange-300"
			>Go Back Home</RouterLink
		>
	</div>
</template>

<!-- <a href="https://storyset.com/web">Web illustrations by Storyset</a>-->
