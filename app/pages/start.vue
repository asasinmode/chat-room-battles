<script setup lang="ts">
useSeoMeta({ title: 'Start game' });

const isCreatingRoom = ref(false);

const { open } = useGameRoom();

async function createRoom() {
	isCreatingRoom.value = true;
	try {
		const room = await $fetch('/api/rooms', { method: 'post' });
		console.log('created', room);
	} catch (e) {
		useVError().handle('creating room', e);
	} finally {
		isCreatingRoom.value = false;
	}
}

const roomCode = ref('');

function uppercaseRoomCode() {
	roomCode.value = roomCode.value.toUpperCase();
}

const isJoiningRoom = ref(false);

async function joinRoom() {
	console.log('joining room');
	isJoiningRoom.value = true;
	try {
		const room = await $fetch('/api/rooms/join', { method: 'post', body: roomCode.value });
		console.log('joined', room);
	} catch (e) {
		useVError().handle('joining room', e);
	} finally {
		isJoiningRoom.value = false;
	}
}
</script>

<template>
	<section class="h-full flex flex-col overflow-x-hidden overflow-y-auto">
		<button class="main-menu-link b-(b-2 black) dark:b-white base-button-hoverable" @click="createRoom">
			create room
		</button>

		<div class="flex flex-col items-center b-(b-2 black) pb-4 dark:b-white">
			<h3 class="col-span-full main-menu-link">
				join room
			</h3>
			<div class="flex items-center gap-2 px-2">
				<label for="roomCode" class="h-fit">Code or link:</label>
				<input
					id="roomCode"
					v-model="roomCode"
					placeholder="A1B2C"
					class="min-w-0 w-16 justify-self-center b-(2 black) rounded-lg bg-zinc-2 px-1 py-1 text-center dark:b-white dark:bg-zinc-8 placeholder-zinc-5 dark:placeholder-zinc"
					maxlength="5"
					@input="uppercaseRoomCode"
				>
				<button
					class="ml-2 w-fit self-end justify-self-start button-blue-4 dark:bg-blue-6 hoverable:bg-blue-5 dark:hoverable:bg-blue-5"
					@click="joinRoom"
				>
					Join
				</button>
			</div>
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
