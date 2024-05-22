<script setup>
import { computed } from "vue";
import arrowRight from "../assets/arrow-right-line.svg";

const props = defineProps({
	accounts: Array,
	selectedAccount: String,
	setSelectedAccount: Function,
});

const sortedAccounts = computed(() =>
	props.accounts
		.slice()
		.sort((a, b) => a.sort - b.sort)
		.map((account) => ({ name: account.name, id: account.id }))
);

// start with the first account in the sorted list
</script>

<template>
	<section class="flex items-center space-x-7">
		<h4 class="text-nowrap">Select Ad Account</h4>
		<img :src="arrowRight" alt="arrow-right" class="w-[21.6px] h-[21.6px]" />
		<div class="flex gap-[21.6px] 2xl:gap-6 overflow-x-auto no-scrollbar">
			<button
				v-for="account in sortedAccounts"
				:key="account.id"
				@click="() => setSelectedAccount(account.id)"
				:class="[
					'rounded-full  text-nowrap p-4',
					selectedAccount === account.id
						? 'bg-primary text-white'
						: 'bg-[#F9FAFB] text-[#D0D5DD]',
				]"
			>
				{{ account.name }}
			</button>
		</div>
	</section>
</template>
