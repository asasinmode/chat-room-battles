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
const serverErrors = ref<string[]>();
const isDirty = ref(false);
const computedError = computed(() =>
	serverErrors.value?.[0] || errors.value[0]?.message,
);
const isInvalid = computed(() => !!(isDirty.value && computedError.value));

function handleInput(event: Event) {
	const { value } = event.target as HTMLInputElement;
	if (props.inputTransform) {
		modelValue.value = props.inputTransform(value);
	} else {
		modelValue.value = value;
	}
	if (serverErrors.value) {
		serverErrors.value = undefined;
	}
	nextTick(() => validate(isDirty.value));
}

function validate(openDialog = true): boolean {
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
		return validate();
	},
	handleServerErrors(errors?: string[]) {
		serverErrors.value = errors;
		if (errors?.length && errorDialog.value) {
			errorDialog.value.open = true;
		}
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
			:aria-invalid="isInvalid"
			:aria-describedby="`${id}ErrorMessage`"
			:aria-errormessage="`${id}ErrorMessage`"
			autocomplete="off"
			@input="handleInput"
			@focusin="handleFocusIn"
			@focusout="handleFocusOut"
		>
		<dialog
			v-if="validation"
			ref="errorDialog"
			:aria-label="`${label} error`"
			class="left-1/2 whitespace-nowrap b-(2 black) rounded-md px-2 py-1 text-3 shadow after:(absolute left-1/2 top-full b-[0.25rem] b-transparent b-t-black content-empty -ml-1) -top-1 -translate-x-1/2 -translate-y-full dark:b-white dark:after:b-t-white"
			@focusout="handleDialogFocusOut"
		>
			<p :id="`${id}ErrorMessage`" aria-live="polite">
				{{ computedError }}
			</p>
		</dialog>
	</div>
</template>

<style>
</style>
