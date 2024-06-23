<script setup lang="ts">
const generatedRoomCode = 123456;
const roomCodeToJoin = ref('');
</script>

<template>
	<nav class="flex flex-col">
		<p class="mx-auto my-4 w-fit b-(2 yellow) rounded-lg bg-yellow-1 px-3 py-1 text-center dark:bg-yellow-950">
			<span class="i-ph-warning inline-block size-6" aria-hidden="true" />
			At the moment only 1v1 is available
		</p>

		<div class="grid grid-cols-3 b-(b-2 black) px-3">
			<h3 class="font-center col-span-full h-10 text-center font-600 leading-10 tracking-wider uppercase">
				create room
			</h3>
			<span class="bg-button-hover col-span-2 w-fit justify-self-center rounded-lg px-2 py-1 text-black dark:text-white">
				<span class="select-none text-zinc">{{ $config.public.appUrl }}/</span>{{ generatedRoomCode }}
			</span>
			<button class="bg-button-hover w-fit rounded-lg px-2 py-1 uppercase">
				copy link
			</button>
		</div>
		<div class="flex flex-col b-(b-2 black) px-3">
			<h3 class="font-center h-10 text-center font-600 leading-10 tracking-wider uppercase">
				join room
			</h3>
			<label for="roomCode">Room code</label>
			<input id="roomCode" v-model="roomCodeToJoin" placeholder="123456">
		</div>
	</nav>
</template>
