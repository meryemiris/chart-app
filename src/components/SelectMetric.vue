<script setup>
import { defineProps } from "vue";
import arrowRight from "../assets/arrow-right-line.svg";

const props = defineProps({
	metrics: Array,
	selectedMetric: String,
	setSelectedMetric: Function,
});
</script>

<template>
	<section class="flex items-center space-x-7 font-semibold">
		<h4 class="text-nowrap">Select Metric</h4>
		<img :src="arrowRight" alt="arrow-right" class="w-4 h-4" />
		<div class="flex space-x-4 overflow-x-auto no-scrollbar">
			<button
				v-for="metric in props.metrics"
				:key="metric"
				@click="setSelectedMetric(metric)"
				:class="[
					'rounded-full p-4',
					selectedMetric === metric
						? 'bg-black text-white'
						: 'bg-gray-200 text-black',
				]"
			>
				{{ metric }}
			</button>
		</div>
	</section>
</template>
