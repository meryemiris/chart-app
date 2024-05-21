<script setup>
import { ref, defineProps, defineEmits } from "vue";
import arrowRight from "../assets/arrow-right-line.svg";

const props = defineProps({
	metrics: Array,
});

const emit = defineEmits(["update-metrics"]);

// start with first metric selected
const selected = ref(props.metrics[0]);

function handleSelect(metric) {
	if (selected.value.includes(metric)) {
		selected.value = selected.value.filter((item) => item !== metric);
	} else {
		selected.value = [...selected.value, metric];
	}
	emit("update-metrics", [...selected.value]);
}

function isSelected(metric) {
	return selected.value.includes(metric);
}
</script>

<template>
	<section class="flex items-center space-x-7 font-semibold">
		<h4 class="text-nowrap">Select Metric</h4>
		<img :src="arrowRight" alt="arrow-right" class="w-4 h-4" />
		<div class="flex space-x-4 overflow-x-auto no-scrollbar">
			<button
				v-for="metric in props.metrics"
				:key="metric"
				@click="handleSelect(metric)"
				:class="[
					'rounded-full p-4',
					isSelected(metric) ? 'bg-black text-white' : 'bg-gray-200 text-black',
				]"
			>
				{{ metric }}
			</button>
		</div>
	</section>
</template>
