<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { Toaster, toast } from "vue-sonner";
import "./style.css";

import Chart from "./components/Chart.vue";
import Integrations from "./components/Integrations.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";

import ChartControlButtons from "./components/ChartControlButtons.vue";

const apiData = ref(null);
const isLoading = ref(false);

// Assumed these metrics are  always available for all accounts
const metrics = ref([
	{ name: "Clicks", id: "clicks" },
	{ name: "Impressions", id: "impressions" },
	{ name: "Spend", id: "spend" },
]);

const selectedAccount = ref(null);
const selectedMetric = ref(null);

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
			toast.error("Failed to fetch data");
			throw new Error("Failed to fetch data");
		}
		const result = await response.json();
		apiData.value = result;
	} catch (err) {
		toast.error(err.message);
	} finally {
		isLoading.value = false;
	}
};

onMounted(() => {
	fetchData();
});

// Processes API data to extract dates and values for the selected
// account and metric, returning the data formatted for charting.
const chartInsights = computed(() => {
	if (!apiData.value) {
		toast.error("Error: Failed to load API data.");
		return [];
	}

	const dates = [];
	const values = [];

	const account = apiData.value.accounts.find(
		(a) => a.id === selectedAccount.value
	);

	if (!account) {
		toast.error("Error: Selected account not found.");
		return [];
	}

	const insights = account.insights.data;
	insights?.forEach((dataPoint) => {
		dates.push(dataPoint.date_start);
		values.push(dataPoint[selectedMetric.value]);
	});

	return { dates, values, metric: selectedMetric.value };
});

const sortedAccounts = computed(() =>
	apiData.value?.accounts
		.slice()
		.sort((a, b) => a.sort - b.sort)
		.map((account) => ({ name: account.name, id: account.id }))
);

// Start first account and metric selected
watch(
	() => apiData.value,
	() => {
		selectedAccount.value = sortedAccounts.value[0].id;
		selectedMetric.value = metrics.value[0].id;
	}
);
</script>

<template>
	<Toaster position="top-right" rich-colors />
	<LoadingSpinner v-if="isLoading" />

	<main
		v-if="apiData"
		class="font-sans font-semibold flex flex-col 2xl:flex-row my-9 lg:my-[66px] 2xl:my-[196px] 2xl:max-w-[1920px] 2xl:m-auto"
	>
		<Integrations
			:direction="'reverse'"
			class="hidden 2xl:block 2xl:px-[100px]"
		/>

		<div class="flex flex-col flex-shrink">
			<header
				class="flex flex-col mx-2 text-center text-2xl/[30px] lg:text-5xl/[60px] gap-3 lg:gap-6 lg:mx-[100px]"
			>
				<h1 class="text-primary">Marketing Integrations</h1>
				<h2 class="text-secondary">Trust WASK's smart optimization features</h2>
			</header>
			<div class="mx-[33px]">
				<section
					id="ChartControlButtonsGroup"
					class="flex flex-col mt-8 mb-12 mr-[-33px] lg:mr-0 gap-8 lg:my-[71px] lg:pl-[17px] lg:gap-14 lg:text-[16px]/[38px] 2xl:flex-row"
				>
					<ChartControlButtons
						label="Ad Account"
						v-model="selectedAccount"
						:options="sortedAccounts"
					/>

					<!-- seperator -->
					<div class="hidden 2xl:block border-[1.5px] border-[#D0D5DD]"></div>

					<ChartControlButtons
						label="Metric"
						v-model="selectedMetric"
						:options="metrics"
					/>
				</section>
				<Chart v-if="chartInsights" :data="chartInsights" />
			</div>
		</div>
		<Integrations :direction="'direct'" class="2xl:block 2xl:px-[100px]" />
	</main>
</template>
