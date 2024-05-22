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
	<section class="flex items-center space-x-7">
		<h4 class="text-nowrap">Select Metric</h4>
		<img :src="arrowRight" alt="arrow-right" class="w-[21.6px] h-[21.6px]" />
		<div class="flex gap-[21.6px] overflow-x-auto no-scrollbar">
			<button
				v-for="metric in props.metrics"
				:key="metric"
				@click="setSelectedMetric(metric)"
				:class="[
					'rounded-full p-4',
					selectedMetric === metric
						? 'bg-primary text-white'
						: 'bg-[#F9FAFB] text-[#D0D5DD]',
				]"
			>
				{{ metric }}
			</button>
		</div>
	</section>
</template>
