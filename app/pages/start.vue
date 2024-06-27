<script setup lang="ts">
useSeoMeta({ title: 'Start game' });

const roomCodeToJoin = ref('');
</script>

<template>
	<section class="h-full flex flex-col overflow-x-hidden overflow-y-auto">
		<NuxtLink to="/play?createRoom=" class="mainMenuLink interactive b-(b-2 black) dark:b-white">
			create room
		</NuxtLink>

		<div class="flex flex-col items-center b-(b-2 black) pb-4 dark:b-white">
			<h3 class="mainMenuLink col-span-full">
				join room
			</h3>
			<div class="flex items-center gap-2 px-2">
				<label for="roomCode" class="h-fit">Code or link:</label>
				<input
					id="roomCode"
					v-model="roomCodeToJoin"
					placeholder="123456"
					class="min-w-0 w-18 justify-self-center rounded-lg bg-zinc-2 px-1 py-1 text-center dark:bg-zinc-8 placeholder-zinc-5 dark:placeholder-zinc"
				>
				<NuxtLink
					:to="`/play?joinRoom=${roomCodeToJoin}`"
					class="ml-3 w-fit self-end justify-self-start button-blue-4 dark:bg-blue-6 hoverable:bg-blue-5 dark:hoverable:bg-blue-5"
				>
					Join
				</NuxtLink>
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
