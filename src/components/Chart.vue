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

import { computed, ref, watch } from "vue";

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
});

const color = ref("#ffafcc");

watch(
	() => props.data.metric,
	() => {
		if (props.data.metric === "clicks") color.value = "#ffafcc";
		else if (props.data.metric === "impressions") color.value = "#a2d2ff";
		else color.value = "#cdb4db";
	}
);

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
	pointRadius: 2,
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
			beginAtZero: false,
		},
		y: {
			beginAtZero: false,
		},
	},
}));
</script>

<template>
	<div
		class="bg-[#F9FAFB] p-4 lg:p-7 2xl:p-10 rounded-[4.5px] lg:rounded-[9px] 2xl:rounded-xl"
	>
		<div class="bg-red-50 h-[423px] lg:[481px] 2xl:[499px]">
			<Line :data="chartData" :options="chartOptions" />
		</div>
	</div>
</template>
