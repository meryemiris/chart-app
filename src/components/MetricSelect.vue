<script setup>
import SelectOption from "./SelectOption.vue";

const { metrics, selectedMetric, setSelectedMetric } = defineProps({
	metrics: Array,
	selectedMetric: String,
	setSelectedMetric: Function,
});
const label = " Metric";
</script>

<template>
	<SelectOption
		:label
		:options="metrics"
		:selectedOption="selectedMetric"
		:setSelectedOption="setSelectedMetric"
	/>
</template>
