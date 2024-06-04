<script setup>
import SelectOption from "./SelectOption.vue";

const selectedMetric = defineModel();

const { metrics } = defineProps({
	metrics: Array,
});
const label = " Metric";
</script>

<template>
	<SelectOption :label :options="metrics" v-model="selectedMetric" />
</template>
