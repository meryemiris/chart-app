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

import {
	computed,
	onBeforeUnmount,
	onMounted,
	reactive,
	ref,
	watch,
} from "vue";
import { layout } from "@chakra-ui/react";

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

const color = ref("#ffafcc"); // default color

// change color when metric is changed
watch(
	() => props.data.metric,
	() => {
		if (props.data.metric === "clicks") color.value = "#ffafcc";
		else if (props.data.metric === "impressions") color.value = "#a2d2ff";
		else color.value = "#cdb4db";
	}
);

const updateChartSize = () => {
	const width = window.innerWidth;
	if (width < 768) {
		// Mobile
		myStyles.height = "423px";
		myStyles.width = "338px";
	} else if (width < 1025) {
		// Tablet
		myStyles.height = "481px";
		myStyles.width = "897px";
	} else if (width > 1024) {
		// Desktop
		myStyles.height = "499px";
		myStyles.width = "1195px";
	}
};

onMounted(() => {
	window.addEventListener("resize", updateChartSize);
	updateChartSize(); // initial size
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", updateChartSize);
});

const chartData = computed(() => ({
	labels: props.data.dates,
	datasets: [
		{
			label: props.data.metric,
			backgroundColor: color.value,
			borderColor: color.value,
			borderWidth: 5,
			pointBackgroundColor: color.value,
			pointBorderColor: color.value,
			pointHoverBackgroundColor: "rgba(220,220,220,1)",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			data: props.data.values,
		},
	],
}));

const chartOptions = computed(() => ({
	responsive: true,
	maintainAspectRatio: false,

	lineTension: 0.3,
	pointRadius: 2,

	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: "top",
			labels: {
				color: "131313",
				boxWidth: 10,
				boxHeight: 10,
				font: {
					weight: "lighter",
					size: 16,
				},
			},
		},
	},

	scales: {
		x: {
			beginAtZero: true,
			ticks: {
				fontSize: 40,
			},
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
		class="flex items-center bg-[#F9FAFB] justify-center w-[371px] h-[452px] lg:w-[956px] 2xl:w-[1274px] lg:h-[537px] 2xl:h-[573px] rounded-[4.5px] 2xl:rounded-xl mb-[25px] lg:mb-[59px] 2xl:mb-0"
	>
		<div :style="myStyles">
			<Line :data="chartData" :options="chartOptions" />
		</div>
	</div>
</template>
