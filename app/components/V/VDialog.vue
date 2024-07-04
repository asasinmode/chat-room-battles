<script setup lang="ts">
defineProps<{
	title: string;
}>();

const emit = defineEmits<{
	close: [boolean];
}>();

const dialog = ref<HTMLDialogElement>();

function closeDialog() {
	if (dialog.value) {
		emit('close', dialog.value.returnValue === 'cancel');
	} else {
		console.warn('dialog closed without ref value');
		emit('close', false);
	}
}

defineExpose({
	open() {
		dialog.value?.showModal();
	},
	close(returnValue?: 'save' | 'cancel') {
		dialog.value?.close(returnValue);
	},
});
</script>

<template>
	<dialog ref="dialog" class="w-xl px-4 py-3 shadow-lg" @close="closeDialog">
		<h1 class="mb-4 text-center text-6 font-700">
			{{ title }}
		</h1>
		<slot />
	</dialog>
</template>
