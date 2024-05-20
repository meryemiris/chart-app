<script setup>
import Chart from "./components/Chart.vue";
</script>

<template>
	<div class="flex flex-col items-center">
		<header
			class="flex mt-[38px] w-[412.5px] flex-col gap-3 text-center font-sans font-semibold text-2xl"
		>
			<h1 class="text-primary">Marketing Integrations</h1>
			<h2 class="text-secondary">Trust WASK's smart optimization features</h2>
		</header>

		<main>
			<Chart />
		</main>
	</div>
</template>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
