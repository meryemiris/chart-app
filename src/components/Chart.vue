<script setup>
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts/core";
import {
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	GridComponent,
	LegendComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	GridComponent,
	LegendComponent,
	LineChart,
	CanvasRenderer,
]);

const props = defineProps({
	data: Array,
});

const chartInstance = ref(null);

const createChart = () => {
	const chartDom = document.getElementById("main");
	if (chartInstance.value) {
		chartInstance.value.dispose(); // Dispose existing chart instance if any
	}
	chartInstance.value = echarts.init(chartDom);

	const chartLabels = props.data.map((item) => item.date_start);
	const spendData = props.data.map((item) => parseFloat(item.spend));
	const clicksData = props.data.map((item) => parseInt(item.clicks));
	const impressionsData = props.data.map((item) => parseInt(item.impressions));

	const option = {
		// title: {
		// 	text: "Chart Data",
		// },
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "cross",
				label: {
					backgroundColor: "rgba(0, 0, 0, 0.8)",
				},
			},
		},
		legend: {
			data: ["Spend", "Clicks", "Impressions"],
		},
		toolbox: {
			feature: {
				saveAsImage: {},
				// dataView: { readOnly: false },
			},
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true,
		},
		xAxis: {
			type: "category",
			boundaryGap: false,
			data: chartLabels,
		},
		yAxis: [
			{
				type: "value",
				name: "Spend/Clicks",
				position: "left",
			},
			{
				type: "value",
				name: "Impressions",
				position: "right",
			},
		],
		series: [
			{
				name: "Spend",
				type: "line",
				stack: "Total",
				data: spendData,
				emphasis: {
					focus: "series",
				},
				areaStyle: {},
				yAxisIndex: 0,
			},
			{
				name: "Clicks",
				type: "line",
				stack: "Total",
				data: clicksData,
				emphasis: {
					focus: "series",
				},
				areaStyle: {},
				yAxisIndex: 0,
			},
			{
				name: "Impressions",
				type: "line",
				stack: "Total",
				data: impressionsData,
				emphasis: {
					focus: "series",
				},
				areaStyle: {},
				yAxisIndex: 1,
			},
		],
	};

	chartInstance.value.setOption(option);
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
	<div
		class="flex items-center justify-center bg-[#F9FAFB] flex-auto m-[33px] lg:w-[956px] lg:h-[537px] rounded-[4.5px]"
	>
		<div
			class="relative flex justify-center items-center p-[33px] h-[452px] w-[371px] lg:w-[897px] lg:h-[481px]"
		>
			<div
				id="main"
				class="w-[338px] h-[423px] lg:w-[897px] lg:h-[481px]"
			></div>
		</div>
	</div>
</template>
