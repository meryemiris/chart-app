<script setup>
import { ref } from "vue";
import arrowRight from "../assets/arrow-right-line.svg";

const props = defineProps({
	metrics: Array,
});

const selected = ref([]);
const isSelected = ref(false);

const handleSelect = (metric) => {
	if (selected.value.includes(metric)) {
		selected.value = selected.value.filter((item) => item !== metric);
	} else {
		selected.value = [...selected.value, metric];
	}

	const selectedMetrics = JSON.parse(JSON.stringify(selected.value));
	isSelected.value = selectedMetrics.includes(metric);
};
</script>

<template>
	<section class="flex items-center space-x-7">
		<h4 class="font-semibold">Select Metric</h4>
		<img :src="arrowRight" alt="arrow-right" class="w-4 h-4" />

		<div class="flex space-x-4 overflow-x-auto no-scrollbar">
			<button
				v-for="metric in metrics"
				:key="metric"
				@click="handleSelect(metric)"
				:class="[
					'rounded-full p-4',
					isSelected ? 'bg-black text-white' : 'bg-gray-200 text-black',
				]"
			>
				{{ metric }}
			</button>
		</div>
	</section>
</template>
