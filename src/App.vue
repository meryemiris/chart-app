<script setup>
import { onMounted, ref, computed, watch } from "vue";
import Chart from "./components/Chart.vue";
import SelectAccount from "./components/SelectAccount.vue";
import SelectMetric from "./components/SelectMetric.vue";
import "./style.css";
import Integrations from "./components/Integrations.vue";

const apiData = ref(null);
const error = ref(null);
const isLoading = ref(false);

// assume these metrics are  always available for all accounts
const metrics = ["clicks", "impressions", "spend"];

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
			throw new Error("Failed to fetch data");
		}
		const result = await response.json();
		apiData.value = result;
	} catch (err) {
		error.value = err.message;
	} finally {
		isLoading.value = false;
	}
};

onMounted(() => {
	fetchData();
});

// filter data based on account

const selectedAccountData = computed(() => {
	if (!apiData.value) return [];

	const account = apiData.value.accounts.find(
		(a) => a.id === selectedAccount.value
	);

	if (!account) return [];
	return account.insights.data;
});

const selectedMetricData = computed(() => {
	const dates = [];
	const values = [];

	selectedAccountData.value?.forEach((dataPoint) => {
		dates.push(dataPoint.date_start);
		values.push(dataPoint[selectedMetric.value]);
	});
	return { dates, values };
});

function updateAccount(accountId) {
	selectedAccount.value = accountId;
}

function updateMetric(metric) {
	selectedMetric.value = metric;
}

watch(
	() => apiData.value,
	(newValue) => {
		if (newValue && newValue.accounts.length > 0) {
			// Select the first account in the data
			selectedAccount.value = newValue.accounts[0].id;
			// Select the first metric in the metrics array
			selectedMetric.value = metrics[0];
		}
	}
);
</script>

<template>
	<div
		class="m-0 p-0 max-w-full max-h-full overflow-hidden font-sans font-semibold"
	>
		<header
			class="flex ml-[9px] lg:ml-[99px] w-[412.5px] lg:w-[825px] mt-[38px] lg:mt-[66px] flex-col gap-3 lg:gap-6 text-center text-2xl/[30px] lg:text-5xl/[60px]"
		>
			<h1 class="text-primary">Marketing Integrations</h1>
			<h2 class="text-secondary">Trust WASK's smart optimization features</h2>
		</header>

		<main>
			<div
				class="flex flex-col gap-8 lg:gap-14 mt-[31px] lg:mt-[71px] ml-[33px] mb-[46.2px] text-sm"
			>
				<SelectAccount
					v-if="apiData?.accounts"
					:setSelectedAccount="updateAccount"
					:selectedAccount="selectedAccount"
					:accounts="apiData?.accounts || []"
				/>
				<SelectMetric
					v-if="metrics"
					:setSelectedMetric="updateMetric"
					:selectedMetric="selectedMetric"
					:metrics="metrics"
				/>
			</div>
			<Chart
				v-if="selectedMetricData"
				:data="selectedMetricData"
				:options="chartOptions"
				:metric="selectedMetric"
			/>

			<div v-if="isLoading">Loading...</div>
			<div v-if="error">{{ error }}</div>
		</main>
		<Integrations />
	</div>
</template>
