<script setup>
import { onMounted, ref } from "vue";
import Chart from "./components/Chart.vue";
import SelectAccount from "./components/SelectAccount.vue";
import SelectMetric from "./components/SelectMetric.vue";
import "./style.css";

const data = ref(null);
const error = ref(null);
const isLoading = ref(false);

const selectedAccount = ref(0);
const selectedMetrics = ref([]);

// assume these metrics are  always available for all accounts
const metrics = ["Click", "Impression", "Spend"];

const fetchData = async () => {
	try {
		isLoading.value = true;
		const response = await fetch(import.meta.env.VITE_BASE_URL, {
			method: "GET",
			headers: {
				token: import.meta.env.VITE_ACCESS_TOKEN,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}
		const result = await response.json();
		data.value = result;

		console.log("initial data", result);
	} catch (err) {
		error.value = err.message;
	} finally {
		isLoading.value = false;
	}
};
onMounted(() => {
	fetchData();
});
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
			<div
				class="font-sans flex flex-col gap-8 mt-8 text-sm font-semibold ml-8"
			>
				<SelectAccount
					v-if="data?.accounts"
					v-model="selectedAccount"
					:accounts="data?.accounts || []"
				/>
				<SelectMetric v-model="selectedMetrics" :metrics="metrics" />
			</div>
			<Chart :data="data?.accounts[selectedAccount]?.insights.data || []" />

			<div v-if="isLoading">Loading...</div>
			<div v-if="error">{{ error }}</div>
		</main>
	</div>
</template>
