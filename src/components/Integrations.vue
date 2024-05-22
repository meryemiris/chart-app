<script setup>
const { logos } = defineProps({
	logos: {
		type: Array,
		required: true,
	},
});
</script>

<template>
	<div
		class="2xl:h-[891px] overflow-hidden inline-flex flex-nowrap mt-[25px] [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] 2xl:[mask-image:_linear-gradient(to_top,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] lg:mt-[60px] 2xl:mt-0"
	>
		<template v-for="count in 2">
			<ul
				class="flex 2xl:flex-col items-center justify-center 2xl:justify-start animate-infinite-scroll-x 2xl:animate-infinite-scroll-y"
				:aria-hidden="count === 2"
			>
				<template v-for="logo in logos">
					<li
						class="flex items-center justify-center bg-[#F9FAFB] w-[75.03px] h-[74.62px] lg:w-[132.39px] lg:h-[132.66px] rounded-[6.75px] mx-[14px] lg:mx-6 2xl:my-6 2xl:mx-0"
					>
						<img
							:src="logo.src"
							:alt="logo.alt"
							class="h-[30.38px] w-[30.38px] lg:w-[54px] lg:h-[54px] max-w-none"
						/>
					</li>
				</template>
			</ul>
		</template>
	</div>
</template>
