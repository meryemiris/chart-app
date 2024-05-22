<script setup>
import arrowRight from "../assets/arrow-right-line.svg";

const { label, options, selectedOption, setSelectedOption } = defineProps({
	label: String,
	options: Array,
	selectedOption: String,
	setSelectedOption: Function,
});
</script>

<template>
	<section class="flex items-center space-x-7">
		<h4 class="text-nowrap">Select {{ label }}</h4>
		<img
			:src="arrowRight"
			alt="arrow-right"
			class="w-[21.6px] h-[21.6px] 2xl:w-6 2xl:h-6"
		/>
		<div class="flex gap-[21.6px] 2xl:gap-6 overflow-x-auto no-scrollbar">
			<button
				v-for="option in options"
				:key="option.id"
				@click="setSelectedOption(option.id)"
				:class="[
					'rounded-full text-nowrap p-4',
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
