<script setup lang="ts">
import VInput from '~/components/V/VInput.vue';

useSeoMeta({ title: 'Start game' });

const { open, setRoom } = useGameRoom();

const isCreatingRoom = ref(false);

async function createRoom() {
	isCreatingRoom.value = true;
	try {
		const room = await $fetch('/api/rooms', { method: 'post' });
		setRoom(room);
		await open();
		await navigateTo('/play');
	} catch (e) {
		useVError().handle('creating room', e);
	} finally {
		isCreatingRoom.value = false;
	}
}

const roomCode = ref('');
const isJoiningRoom = ref(false);
const isRoomCodeInvalid = ref(false);
const roomCodeInput = ref<InstanceType<typeof VInput>>();

async function joinRoom() {
	if (!roomCodeInput.value) {
		throw new VError('code input element not found', 'joining room', true);
	}

	isRoomCodeInvalid.value = !roomCodeInput.value.validate();
	if (isRoomCodeInvalid.value) {
		return;
	}

	isJoiningRoom.value = true;
	try {
		const room = await $fetch('/api/rooms/join', { method: 'post', body: '' });
		console.log('room', room);
	} catch (e) {
		useVError().handle('joining room', e, ({ code }) => roomCodeInput.value?.handleServerErrors(code));
	} finally {
		isJoiningRoom.value = false;
	}
}

const roomCodeSrError = ref<HTMLPreElement>();

function clearRoomCodeSrError() {
	if (roomCodeSrError.value) {
		roomCodeSrError.value.textContent = '';
	}
}
</script>

<template>
	<section class="h-full flex flex-col">
		<button
			class="main-menu-link b-(b-2 black) dark:b-white base-button-hoverable"
			:aria-busy="isCreatingRoom"
			@click="createRoom"
		>
			<BouncingText
				text="create room"
				class="fast"
				style="--bounce-duration: 1.5s"
				:is-bouncing="isCreatingRoom"
				absolute-dots
			/>
		</button>

		<div class="flex flex-col items-center b-(b-2 black) pb-4 dark:b-white">
			<h3 class="col-span-full main-menu-link">
				join room
			</h3>
			<form class="flex items-center gap-2 px-2" @submit.prevent="joinRoom">
				<VInput
					id="roomCode"
					ref="roomCodeInput"
					v-model="roomCode"
					label="Code or link:"
					class="w-16 text-center"
					placeholder="A1B2C"
					aria-required="true"
					sr-error-text="invalid code or link"
					sr-error-id="roomCodeSrError"
					:validation="roomCodeValidation"
					:input-transform="value => value.toUpperCase()"
				/>
				<button
					class="ml-2 w-fit self-end justify-self-start button-blue-4 dark:bg-blue-6 dark:hoverable:bg-blue-5 hoverable:bg-blue-5"
					@focusout="clearRoomCodeSrError"
				>
					Join
				</button>
				<p id="roomCodeSrError" class="sr-only" aria-live="assertive" />
			</form>
		</div>

		<p class="mx-2 my-4 w-fit self-center b-(2 yellow) rounded-lg bg-yellow-1 px-3 py-1 text-center text-5 dark:b-yellow-6 dark:bg-yellow-950">
			<span class="i-ph-warning mr-1 inline-block size-6 align-middle -mt-0.5" aria-hidden="true" />
			At the moment only 1v1 is available
			<span class="i-ph-warning ml-1 inline-block size-6 align-middle -mt-0.5" aria-hidden="true" />
		</p>

		<p class="mt-auto px-1 text-end text-3 text-zinc-5 dark:text-zinc">
			v{{ useAppConfig().version }}
		</p>
	</section>
</template>
