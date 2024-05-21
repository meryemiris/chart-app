<script setup>
import { ref, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps({
	data: Array,
});

const chartLabels = ref([]);
const spendData = ref([]);
const clicksData = ref([]);
const impressionsData = ref([]);

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

		createChart();
	} catch (err) {
		error.value = err.message;
	} finally {
		isLoading.value = false;
	}
};

const createChart = () => {
	const insightsData = props.data;

	chartLabels.value = insightsData.map((item) => item.date_start);
	spendData.value = insightsData.map((item) => parseFloat(item.spend));
	clicksData.value = insightsData.map((item) => parseInt(item.clicks));
	impressionsData.value = insightsData.map((item) =>
		parseInt(item.impressions)
	);
	const ctx = document.getElementById("myChart").getContext("2d");
	new Chart(ctx, {
		type: "line",
		data: {
			labels: chartLabels.value,
			datasets: [
				{
					label: "Spend",
					data: spendData.value,
					borderColor: "rgb(75, 192, 192)",
					backgroundColor: "rgba(75, 192, 192, 0.2)",
					borderWidth: 1,
				},
				{
					label: "Clicks",
					data: clicksData.value,
					borderColor: "rgb(54, 162, 235)",
					backgroundColor: "rgba(54, 162, 235, 0.2)",
					borderWidth: 1,
				},
				{
					label: "Impressions",
					data: impressionsData.value,
					borderColor: "rgb(255, 206, 86)",
					backgroundColor: "rgba(255, 206, 86, 0.2)",
					borderWidth: 1,
				},
			],
		},
		options: {
			responsive: true,
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
	});
};

watch(
	() => props.data,
	(newData) => {
		if (newData && newData.length) {
			createChart();
		}
	}
);
</script>

<template>
	<div class="bg-slate-100 flex-auto">
		<div class="relative flex items-center justify-center p-[33px] h-350-px">
			<canvas id="myChart" width="400" height="400"></canvas>
		</div>
	</div>
</template>

<style scoped></style>
