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
	metric: {
		type: String,
	},
});

// Data and Options
const chartData = computed(() => ({
	labels: props.data.dates,
	datasets: [
		{
			label: props.metric,
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
	height: "423px",
	width: "338px",
	backgroundColor: "white",
	position: "relative",
});
</script>

<template>
	<div
		class="flex items-center justify-center bg-[#F9FAFB] w-[371px] h-[452px] rounded-[4.5px] ml-[33px]"
	>
		<div>
			<Line
				v-if="chartData && chartOptions"
				:data="chartData"
				:options="chartOptions"
				:style="myStyles"
			/>
		</div>
	</div>
</template>
