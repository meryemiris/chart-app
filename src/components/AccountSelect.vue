<script setup>
import SelectOption from "./SelectOption.vue";

const selectedAccount = defineModel();

const { accounts } = defineProps({
	accounts: Array,
});
const label = " Ad Account";
</script>

<template>
	<SelectOption :label :options="accounts" v-model="selectedAccount" />
</template>
