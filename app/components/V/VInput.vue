<script setup lang="ts">
import * as v from 'valibot';

defineOptions({
	inheritAttrs: false,
});

const props = defineProps<{
	id: string;
	label: string;
	classInputContainer?: any;
	validation?: v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>;
	inputTransform?: (value: string) => string;
}>();

const modelValue = defineModel<string>({ required: true });
const errorDialog = ref<HTMLDialogElement>();
const input = ref<HTMLInputElement>();
const errors = ref<v.BaseIssue<unknown>[]>([]);
const isDirty = ref(false);
const isInvalid = computed(() => isDirty.value && !!errors.value.length);

function handleInput(event: Event) {
	const { value } = event.target as HTMLInputElement;
	if (props.inputTransform) {
		modelValue.value = props.inputTransform(value);
	} else {
		modelValue.value = value;
	}
	validate(isDirty.value);
}

function validate(openDialog = true) {
	if (!props.validation || (!isDirty.value && !openDialog)) {
		return true;
	}

	const result = v.safeParse(props.validation, modelValue.value);
	if (result.success) {
		errors.value = [];
		errorDialog.value?.close();
	} else {
		errors.value = result.issues;
		if (openDialog && errorDialog.value) {
			errorDialog.value.open = true;
		}
	}

	return result.success;
}

function handleFocusOut(event: FocusEvent) {
	if (errorDialog.value && event.relatedTarget !== errorDialog.value) {
		errorDialog.value.close();
	}
}

function handleFocusIn() {
	if (errorDialog.value && isDirty.value && errors.value.length) {
		errorDialog.value.open = true;
	}
}

function handleDialogFocusOut(event: FocusEvent) {
	if (input.value && event.relatedTarget !== input.value) {
		errorDialog.value?.close();
	}
}

defineExpose({
	validate() {
		isDirty.value = true;
		validate();
	},
});
</script>

<template>
	<label :for="id" class="h-fit">{{ label }}</label>
	<div class="relative" :class="classInputContainer">
		<input
			:id="id"
			ref="input"
			:value="modelValue"
			v-bind="$attrs"
			class="min-w-0 b-(2 black) rounded-lg bg-zinc-2 px-1 py-1 dark:b-white dark:bg-zinc-8 placeholder-zinc-5 dark:placeholder-zinc"
			:class="isInvalid ? '!b-red-5 !bg-red-1 dark:!b-red-6 dark:!bg-red-950' : ''"
			:aria-describedby="`${id}ErrorDialog`"
			@input="handleInput"
			@focusin="handleFocusIn"
			@focusout="handleFocusOut"
		>
		<dialog
			v-if="validation"
			:id="`${id}ErrorDialog`"
			ref="errorDialog"
			:aria-label="`${label}`"
			class="left-1/2 translate-y-full whitespace-nowrap b-(2 black) rounded-md px-2 py-1 text-3 shadow-sm after:(absolute bottom-full left-1/2 b-[0.25rem] b-transparent b-b-black content-empty -ml-1) -bottom-1 -translate-x-1/2 dark:b-white dark:after:b-b-white"
			@focusout="handleDialogFocusOut"
		>
			{{ errors[0]?.message }}
		</dialog>
	</div>
</template>

<style>
</style>
