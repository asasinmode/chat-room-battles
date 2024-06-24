<script setup lang="ts">
const dialog = ref<HTMLDialogElement>();

function closeAndSave() {
	dialog.value?.close();
}
</script>

<template>
	<button class="mainMenuLink" @click="dialog?.showModal()">
		settings
	</button>
	<dialog ref="dialog" class="w-xl px-4 py-3 shadow-lg">
		<h1 class="mb-4 text-center text-6 font-700">
			Settings
		</h1>
		<form class="grid grid-cols-2 gap-x-4 gap-y-2">
			<button value="cancel" formmethod="dialog" class="button-zinc-7 w-fit justify-self-end -mr-2 hoverable:bg-zinc-6">
				cancel
			</button>
			<button class="button-emerald-6 ml-2 w-fit uppercase hoverable:bg-emerald-5" @click.prevent="closeAndSave">
				save
			</button>
		</form>
	</dialog>
</template>
