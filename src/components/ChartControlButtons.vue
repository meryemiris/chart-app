<script setup>
import arrowRight from "../assets/arrow-right-line.svg";

const selectedOption = defineModel();

const { label, options } = defineProps({
	label: String,
	options: Array,
});

const updateSelect = (option) => {
	selectedOption.value = option;
};
</script>

<template>
	<section
		class="flex items-center gap-8 overflow-auto text-[14.4px]/[34.2px] lg:text-[16px]/[38px]"
	>
		<div class="flex flex-row items-center gap-[14.4px] lg:gap-4 mr-7">
			<h4 class="text-nowrap">Select {{ label }}</h4>
			<img
				:src="arrowRight"
				alt="arrow-right"
				class="w-[21.6px] h-[21.6px] lg:w-6 lg:h-6"
			/>
		</div>
		<div class="flex gap-[21.6px] lg:gap-6 overflow-x-auto no-scrollbar">
			<button
				v-for="option in options"
				:key="option.id"
				@click="updateSelect(option.id)"
				:class="[
					'rounded-[180px] lg:rounded-[200px] text-nowrap py-[7px] px-[18px] lg:px-[20px] lg:py-[8px] hover:bg-primary hover:text-white',
					selectedOption === option.id
						? 'bg-primary text-white'
						: 'bg-[#F9FAFB] text-[#D0D5DD]',
				]"
			>
				{{ option.name }}
			</button>
		</div>
	</section>
</template>
