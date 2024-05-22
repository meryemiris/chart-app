<script setup>
import SelectOption from "./SelectOption.vue";

const { accounts, selectedAccount, setSelectedAccount } = defineProps({
	accounts: Array,
	selectedAccount: String,
	setSelectedAccount: Function,
});
const label = " Ad Account";
</script>

<template>
	<SelectOption
		:label
		:options="accounts"
		:selectedOption="selectedAccount"
		:setSelectedOption="setSelectedAccount"
	/>
</template>
