<script setup>
import { onMounted, ref, computed, watch } from "vue";
import Chart from "./components/Chart.vue";
import AccountSelect from "./components/AccountSelect.vue";
import MetricSelect from "./components/MetricSelect.vue";
import "./style.css";
import Integrations from "./components/Integrations.vue";
import { Toaster, toast } from "vue-sonner";

import Facebook from "./assets/facebook.svg";
import YouTube from "./assets/youtube.svg";
import Instagram from "./assets/instagram.svg";
import Shopify from "./assets/shopify.svg";
import SnapChat from "./assets/snapchat.svg";

import GoogleAnalytics from "./assets/analytics.svg";
import WordPress from "./assets/wordpress.svg";
import WooCommerce from "./assets/woo.svg";
import LinkedIn from "./assets/linkedin.svg";
import Gmail from "./assets/gmail.svg";

const leftSideLogos = [
	{ src: GoogleAnalytics, alt: "Google Analytics" },
	{ src: WordPress, alt: "WordPress" },
	{ src: LinkedIn, alt: "LinkedIn" },
	{ src: WooCommerce, alt: "WooCommerce" },
	{ src: Gmail, alt: "Gmail" },
];

const rightSideLogos = [
	{ src: Facebook, alt: "Facebook" },
	{ src: YouTube, alt: "YouTube" },
	{ src: Instagram, alt: "Instagram" },
	{ src: Shopify, alt: "Shopify" },
	{ src: SnapChat, alt: "SnapChat" },
];

const logos = [...rightSideLogos, ...leftSideLogos];

const apiData = ref(null);
const error = ref(false);
const isLoading = ref(false);

import LoadingSpinner from "./components/LoadingSpinner.vue";

// assume these metrics are  always available for all accounts
const metrics = [
	{ name: "Clicks", id: "clicks" },
	{ name: "Impressions", id: "impressions" },
	{ name: "Spend", id: "spend" },
];

const selectedAccount = ref(null);
console.log("account", selectedAccount.value);

const selectedMetric = ref(null);
console.log("metric", selectedMetric.value);

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
		console.log("data", apiData.value);
	} catch (err) {
		error.value = err.message;
		toast.error(err.message);
	} finally {
		isLoading.value = false;
	}
};

onMounted(() => {
	fetchData();
});

// update selected account and metric
function updateAccount(account) {
	selectedAccount.value = account;
}

function updateMetric(metric) {
	selectedMetric.value = metric;
}

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
		console.log(selectedMetric.value);
	});
	return { dates, values, metric: selectedMetric.value };
});

const sortedAccounts = computed(() =>
	apiData.value?.accounts
		.slice()
		.sort((a, b) => a.sort - b.sort)
		.map((account) => ({ name: account.name, id: account.id }))
);

watch(
	() => apiData.value,
	() => {
		// start first account and metric selected
		selectedAccount.value = sortedAccounts.value[0].id;
		selectedMetric.value = metrics[0].id;
	}
);
</script>

<template>
	<Toaster position="top-right" rich-colors="true" />
	<LoadingSpinner v-if="isLoading" />
	<div
		class="m-0 p-0 max-w-full max-h-full overflow-hidden font-sans font-semibold items-center justify-center flex flex-col"
	>
		<header
			class="flex flex-col w-[412.5px] lg:w-[825px] 2xl:w-[1274px] mt-[38px] lg:mt-[66px] 2xl:mt-[196px] gap-3 lg:gap-6 text-center text-2xl/[30px] lg:text-5xl/[60px]"
		>
			<h1 class="text-primary">Marketing Integrations</h1>
			<h2 class="text-secondary">Trust WASK's smart optimization features</h2>
		</header>

		<div class="flex flex-row top-0">
			<Integrations :logos="leftSideLogos" class="hidden 2xl:block" />

			<main class="flex flex-col items-center">
				<div
					class="flex flex-col xl:flex-row gap-8 lg:gap-14 mt-[31px] lg:mt-[71px] 2xl:mt-[100px] mb-[46.2px] 2xl:mb-[70px] text-sm lg:text-[16px]"
				>
					<AccountSelect
						v-if="apiData?.accounts"
						:setSelectedAccount="updateAccount"
						:selectedAccount="selectedAccount"
						:accounts="sortedAccounts"
					/>
					<div
						class="hidden xl:block h-full border-[1.5px] border-[#D0D5DD]"
					></div>
					<MetricSelect
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
				/>
			</main>
			<Integrations :logos="rightSideLogos" class="hidden 2xl:block" />
		</div>
		<Integrations :logos="logos" class="clock 2xl:hidden" />
	</div>
</template>
