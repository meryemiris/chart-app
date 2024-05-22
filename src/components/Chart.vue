<script setup>
import { Line } from "vue-chartjs";
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	LineElement,
	PointElement,
	CategoryScale,
	LinearScale,
} from "chart.js";

import { computed, reactive } from "vue";

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	LineElement,
	PointElement,
	CategoryScale,
	LinearScale
);

const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
	options: {
		type: Object,
		default: () => ({}),
	},
	style: {
		type: Object,
		default: () => ({}),
	},
});

// Data and Options
const chartData = computed(() => ({
	labels: props.data.dates,
	datasets: [
		{
			label: props.data.metric,
			backgroundColor: "rgba(75, 192, 192, 0.2)",
			borderColor: "rgba(75, 192, 192, 1)",
			borderWidth: 5,
			pointBackgroundColor: "rgba(75, 192, 192, 1)",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(75, 192, 192, 1)",
			data: props.data.values,
		},
	],
}));

const chartOptions = computed(() => ({
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Chart.js Line Chart",
		},
	},
	scales: {
		x: {
			beginAtZero: true,
		},
		y: {
			beginAtZero: true,
		},
	},
}));

const myStyles = reactive({
	// mobile
	height: "423px",
	width: "338px",

	// tablet-lg
	// height: "481px",
	// width: "897px",

	// desktop-2xl
	// height: "499px",
	// width: "1195px",

	backgroundColor: "white",
	position: "relative",
});
</script>

<template>
	<div
		class="flex items-center justify-center bg-[#F9FAFB] w-[371px] h-[452px] lg:w-[956px] 2xl:w-[1274px] lg:h-[537px] 2xl:h-[573px] rounded-[4.5px] 2xl:rounded-xl mb-[25px] lg:mb-[59px] 2xl:mb-0"
	>
		<div>
			<Line :data="chartData" :options="chartOptions" :style="myStyles" />
		</div>
	</div>
</template>
