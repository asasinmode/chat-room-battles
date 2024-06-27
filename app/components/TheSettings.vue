<script setup lang="ts">
const colorMode = useColorMode();

const dialog = ref<HTMLDialogElement>();

let initialValues = {
	colorMode: colorMode.preference,
};

function openDialog() {
	dialog.value?.showModal();

	initialValues = {
		colorMode: colorMode.preference,
	};
}

function closeSettings() {
	if (!dialog.value) {
		console.warn('dialog closed without ref value');
		return;
	}

	if (dialog.value.returnValue === 'cancel') {
		colorMode.preference = initialValues.colorMode;
	}
}

defineExpose({
	openDialog,
});
</script>

<template>
	<dialog ref="dialog" class="w-xl px-4 py-3 shadow-lg" @close="closeSettings">
		<h1 class="mb-4 text-center text-6 font-700">
			Settings
		</h1>
		<form class="grid grid-cols-2 gap-x-4 gap-y-2">
			<fieldset class="col-span-full">
				<legend>Color mode</legend>
				<input v-model="colorMode.preference" type="radio" name="colorMode" value="light">
				<input v-model="colorMode.preference" type="radio" name="colorMode" value="dark">
				<input v-model="colorMode.preference" type="radio" name="colorMode" value="system">
			</fieldset>
			<button value="cancel" formmethod="dialog" class="w-fit justify-self-end button-zinc-2 -mr-2 dark:bg-zinc-8 hoverable:bg-zinc-3 dark:hoverable:bg-zinc-7">
				cancel
			</button>
			<button value="default" class="ml-2 w-fit button-emerald-4 uppercase dark:bg-emerald-7 hoverable:bg-emerald-5 dark:hoverable:bg-emerald-6" @click.prevent="dialog?.close('save')">
				save
			</button>
		</form>
	</dialog>
</template>
