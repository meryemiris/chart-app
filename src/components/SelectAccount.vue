<script setup>
import arrowRight from "../assets/arrow-right-line.svg";
</script>
<template>
	<div
		class="font-sans flex flex-col gap-[32px] mt-[31px] text-[14.4px] font-semibold ml-[33px]"
	>
		<section class="flex items-center space-x-[28.8px] w-full">
			<h4>Select Ad Account</h4>
			<img :src="arrowRight" alt="arrow-right" class="w-[16px] h-[16px]" />
			<div class="flex gap-[28.8px] overflow-x-auto no-scrollbar">
				<button class="rounded-full p-4 bg-black text-white">account1</button>
				<button class="rounded-full p-4 bg-black text-white">account2</button>
				<button class="rounded-full p-4 bg-black text-white">account3</button>
			</div>
		</section>

		<section class="flex items-center space-x-[28.8px]">
			<h4 class="font-semibold">Select Metric</h4>
			<img :src="arrowRight" alt="arrow-right" class="w-[16px] h-[16px]" />

			<div class="flex gap-[28.8px] overflow-x-auto no-scrollbar">
				<button class="rounded-full p-4 bg-black text-white">Click</button>
				<button class="rounded-full p-4 bg-black text-white">Impression</button>
				<button class="rounded-full p-4 bg-black text-white">Spend</button>
			</div>
		</section>
	</div>
</template>
