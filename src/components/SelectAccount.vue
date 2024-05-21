<script setup>
import { ref } from "vue";
import arrowRight from "../assets/arrow-right-line.svg";

const props = defineProps({
	accounts: Array,
});

const selected = ref(null);

function handleSelect(id) {
	selected.value = id;
}

const sortedAccounts = props.accounts
	.slice()
	.sort((a, b) => a.sort - b.sort)
	.map((account) => ({ name: account.name, id: account.id }));

console.log("sortedAccounts", sortedAccounts);
</script>

<template>
	<section class="flex items-center space-x-7 w-full">
		<h4>Select Ad Account</h4>
		<img :src="arrowRight" alt="arrow-right" class="w-4 h-4" />
		<div class="flex space-x-4 w-full overflow-x-auto no-scrollbar">
			<button
				v-for="account in sortedAccounts"
				:key="account.id"
				@click="handleSelect(account.id)"
				:class="[
					'rounded-full p-4 w-full',
					selected === account.id
						? 'bg-black text-white'
						: 'bg-gray-200 text-black',
				]"
			>
				{{ account.name }}
			</button>
		</div>
	</section>
</template>
