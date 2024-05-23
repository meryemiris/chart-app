<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { Toaster, toast } from "vue-sonner";
import "./style.css";

import Chart from "./components/Chart.vue";
import AccountSelect from "./components/AccountSelect.vue";
import MetricSelect from "./components/MetricSelect.vue";
import Integrations from "./components/Integrations.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";

const apiData = ref(null);
const isLoading = ref(false);

// Assumed these metrics are  always available for all accounts
const metrics = [
	{ name: "Clicks", id: "clicks" },
	{ name: "Impressions", id: "impressions" },
	{ name: "Spend", id: "spend" },
];

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

// Update selected account and metric.
function updateAccount(account) {
	selectedAccount.value = account;
}

function updateMetric(metric) {
	selectedMetric.value = metric;
}

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
		selectedMetric.value = metrics[0].id;
	}
);
</script>

<template>
	<Toaster position="top-right" rich-colors />
	<LoadingSpinner v-if="isLoading" />

	<main
		class="font-sans font-semibold flex flex-col 2xl:flex-row my-9 lg:my-[66px] 2xl:my-[196px] 2xl:max-w-[1920px] 2xl:m-auto"
	>
		<Integrations
			:logos="logos"
			:direction="'reverse'"
			class="hidden 2xl:block 2xl:px-[100px]"
		/>

		<div class="flex flex-col">
			<header
				class="flex flex-col mx-2 text-center text-2xl/[30px] lg:text-5xl/[60px] gap-3 lg:gap-6 lg:mx-[100px]"
			>
				<h1 class="text-primary">Marketing Integrations</h1>
				<h2 class="text-secondary">Trust WASK's smart optimization features</h2>
			</header>

			<section id="content" class="mx-[33px]">
				<section
					id="selects"
					class="flex flex-col mt-8 mb-12 mr-[-33px] gap-8 lg:my-[71px] lg:pl-[17px] lg:gap-14 lg:text-[16px]/[38px] 2xl:flex-row 2xl:mx-9"
				>
					<AccountSelect
						v-if="apiData?.accounts"
						:setSelectedAccount="updateAccount"
						:selectedAccount="selectedAccount"
						:accounts="sortedAccounts"
					/>

					<!-- seperator -->
					<div class="hidden 2xl:block border-[1.5px] border-[#D0D5DD]"></div>

					<MetricSelect
						v-if="metrics"
						:setSelectedMetric="updateMetric"
						:selectedMetric="selectedMetric"
						:metrics="metrics"
					/>
				</section>
				<Chart v-if="chartInsights" :data="chartInsights" />
			</section>
		</div>
		<Integrations
			:logos="logos"
			:direction="'direct'"
			class="hidden 2xl:block 2xl:px-[100px]"
		/>
		<Integrations :logos="logos" class="block 2xl:hidden" />
	</main>
</template>
