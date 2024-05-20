<script setup>
import Chart from "./components/Chart.vue";
import SelectAccount from "./components/SelectAccount.vue";
import "./style.css";
</script>

<template>
	<div class="m-0 p-0 w-full h-full">
		<header
			class="flex mt-[38px] flex-col gap-3 text-center font-sans font-semibold w-full text-2xl"
		>
			<h1 class="text-primary">Marketing Integrations</h1>
			<h2 class="text-secondary">Trust WASK's smart optimization features</h2>
		</header>

		<main>
			<SelectAccount />
			<Chart />
		</main>
	</div>
</template>
