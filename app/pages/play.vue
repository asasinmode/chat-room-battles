<script setup lang="ts">
definePageMeta({ layout: 'game' });
useSeoMeta({ title: 'Play' });

const { origin } = useRequestURL();

const gameRoom = useGameRoom({
	playerJoined(data) {
		if (!gameRoom.room.value) {
			useVError().create('received player joined event but room isn\'t set', 'room');
			return;
		}
		console.log('player joined', data);
		gameRoom.room.value.playerCount = data.playerCount;
	},
	playerDisconnected(data) {
		if (!gameRoom.room.value) {
			useVError().create('received player disconnected event but room isn\'t set', 'room');
			return;
		}
		console.log('player disconnected', data);
		gameRoom.room.value.playerCount = data.playerCount;
	},
	reconnected(data) {
		console.log('reconnected', data);
		gameRoom.room.value = data;
	},
	error(data) {
		console.log('oopsie error', data);
	},
});

if (!gameRoom.room.value) {
	navigateTo('/');
}

const copyTooltip = ref<HTMLDialogElement>();

function copyRoomCodeLink() {
	useClipboard().copy(`${origin}/play?join=${gameRoom.room.value?.code || ''}`);
	copyTooltip.value?.show();
}
</script>

<template>
	<main class="">
		<div v-if="!gameRoom.hasGameStarted.value" class="flex flex-col items-center pb-4">
			<h1 id="roomCodeTitle" class="main-menu-link">
				Room code
			</h1>
			<div class="flex flex-wrap justify-center gap-x-4 gap-y-2 px-2">
				<span class="col-span-2 w-fit justify-self-center b-(2 black) rounded-lg bg-zinc-2 px-2 py-1 dark:b-white dark:bg-zinc-8" aria-labelledby="roomCodeTitle">
					{{ gameRoom.room.value?.code }}
				</span>
				<div class="relative">
					<button class="relative w-fit b-(2 black) rounded-lg px-2 py-1 font-600 uppercase button-blue-4 dark:b-white dark:bg-blue-6 dark:hoverable:bg-blue-5 hoverable:bg-blue-5" @click.stop="copyRoomCodeLink">
						copy link
					</button>
					<dialog
						ref="copyTooltip"
						class="b b-black rounded-md px-2 py-1 text-3 shadow-sm -top-1 -translate-y-full dark:b-white"
						@focusout="copyTooltip?.close()"
						@keydown.esc="copyTooltip?.close()"
					>
						Copied!
					</dialog>
				</div>
			</div>
			<p class="col-span-full mt-4 max-w-sm px-2 text-center leading-snug">
				Send it to your friend! <br>
				They should paste the whole link into their browser or paste the code into the <b>Join room</b> input.
			</p>
			<p class="mt-2 text-zinc-5 tracking-tight dark:text-zinc" style="--wave-duration: 1.5s">
				<BouncingText is-bouncing text="Waiting for players" />
				<span class="ml-1">
					{{ gameRoom.room.value?.playerCount ?? 0 }} / 2
				</span>
			</p>
		</div>
	</main>
</template>
