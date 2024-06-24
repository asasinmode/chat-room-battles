<script setup lang="ts">
const roomCodeToJoin = ref('');
</script>

<template>
	<nav class="flex flex-col">
		<NuxtLink to="/play?createRoom" class="mainMenuLink">
			Create room
		</NuxtLink>
		<div class="flex flex-col items-center b-(b-2 black) px-3 pb-4">
			<h3 class="font-center col-span-full h-12 text-center font-600 leading-11 tracking-wider uppercase">
				join room
			</h3>
			<div class="flex items-end justify-self-end gap-2">
				<label for="roomCode" class="text-5">Code:</label>
				<input
					id="roomCode"
					v-model="roomCodeToJoin"
					placeholder="123456"
					class="min-w-0 w-18 justify-self-center rounded-lg px-1 py-1 text-center"
				>
				<NuxtLink
					:to="`/play?joinRoom=${roomCodeToJoin}`"
					class="button-blue-6 ml-3 w-fit self-end justify-self-start hoverable:bg-blue-5"
				>
					Join
				</NuxtLink>
			</div>
		</div>

		<p class="mx-auto my-4 w-fit b-(2 yellow) rounded-lg bg-yellow-1 px-3 py-1 text-center text-5">
			<span class="i-ph-warning mr-1 inline-block size-6 align-middle -mt-0.5" aria-hidden="true" />
			At the moment only 1v1 is available
			<span class="i-ph-warning ml-1 inline-block size-6 align-middle -mt-0.5" aria-hidden="true" />
		</p>
	</nav>
</template>
