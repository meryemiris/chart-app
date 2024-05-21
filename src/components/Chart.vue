<script setup>
import { ref, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps({
	data: Array,
});

const chartInstance = ref(null);

const createChart = () => {
	if (chartInstance.value) {
		chartInstance.value.destroy(); // Destroy existing chart instance if any
	}
	console.log("chart data from chart", props.data);

	const chartLabels = props.data.map((item) => item.date_start);
	const spendData = props.data.map((item) => parseFloat(item.spend));
	const clicksData = props.data.map((item) => parseInt(item.clicks));
	const impressionsData = props.data.map((item) => parseInt(item.impressions));

	const ctx = document.getElementById("myChart").getContext("2d");
	chartInstance.value = new Chart(ctx, {
		type: "line",
		data: {
			labels: chartLabels,
			datasets: [
				{
					label: "Spend",
					data: spendData,
					borderColor: "rgb(75, 192, 192)",
					backgroundColor: "rgba(75, 192, 192, 0.2)",
					borderWidth: 1,
				},
				{
					label: "Clicks",
					data: clicksData,
					borderColor: "rgb(54, 162, 235)",
					backgroundColor: "rgba(54, 162, 235, 0.2)",
					borderWidth: 1,
				},
				{
					label: "Impressions",
					data: impressionsData,
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

onMounted(createChart);

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
