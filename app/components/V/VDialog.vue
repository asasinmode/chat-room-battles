<script setup lang="ts">
const props = defineProps<{
	title: string;
	id: string;
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

const id = computed(() => `${props.id}DialogTitle`);

defineExpose({
	showModal() {
		dialog.value?.showModal();
	},
	close(returnValue?: 'save' | 'cancel') {
		dialog.value?.close(returnValue);
	},
});
</script>

<template>
	<dialog ref="dialog" class="w-xl px-4 py-3 shadow-lg" :aria-labelledby="id" @close="closeDialog">
		<h1 :id="id" class="mb-4 text-center text-6 font-700">
			{{ title }}
		</h1>
		<slot />
	</dialog>
</template>
