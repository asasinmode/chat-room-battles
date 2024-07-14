<script setup lang="ts">
import type { UnknownSchema } from 'valibot';

defineOptions({
	inheritAttrs: false,
});

defineProps<{
	id: string;
	label: string;
	classInputContainer?: any;
	validation?: UnknownSchema;
}>();

const value = defineModel<string>({ required: true });
const errorDialog = ref<HTMLDialogElement>();
</script>

<template>
	<label :for="id" class="h-fit">{{ label }}</label>
	<div class="relative" :class="classInputContainer">
		<input
			:id="id"
			v-model="value"
			v-bind="$attrs"
			class="min-w-0 b-(2 black) rounded-lg bg-zinc-2 px-1 py-1 dark:b-white dark:bg-zinc-8 placeholder-zinc-5 dark:placeholder-zinc"
		>
		<dialog v-if="validation" ref="errorDialog">
			error message
		</dialog>
	</div>
</template>
