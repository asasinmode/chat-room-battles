<script setup lang="ts">
definePageMeta({ layout: 'game' });
useSeoMeta({ title: 'Play' });

const router = useRouter();
const route = useRoute();
const { origin } = useRequestURL();

const roomCode = ref<string>();

if ('createRoom' in route.query) {
	console.log('useFetch create room then set code');

	roomCode.value = 'created';
} else if (route.query.join) {
	console.log('joining room', route.query.join);
	roomCode.value = 'joined';
}

router.replace({ query: {} });

const ws = undefined;
const room = undefined;
const isWaitingForPlayers = true;

if (roomCode.value) {
	console.log('gotta try to ws into room, potentially setting isRoomInvalid');
}

let isRoomInvalid = true;

if (ws && room) {
	isRoomInvalid = false;
}

console.log('room invalid?', isRoomInvalid);
</script>

<template>
	<main class="">
		<div v-if="isWaitingForPlayers" class="flex flex-col items-center b-(b-2 black) pb-4 dark:b-white">
			<h1 class="h-12 font-600 leading-11 tracking-wider uppercase">
				Room code
			</h1>
			<div class="flex flex-wrap justify-center gap-x-5 gap-y-2 px-2">
				<span class="col-span-2 w-fit justify-self-center rounded-lg bg-zinc-2 px-2 py-1 dark:bg-zinc-8">
					<span class="text-zinc-5 dark:text-zinc">{{ origin }}?join=</span>{{ roomCode }}
				</span>
				<button class="w-fit button-blue-4 rounded-lg px-2 py-1 font-600 uppercase dark:bg-blue-6 hoverable:bg-blue-5 dark:hoverable:bg-blue-5">
					copy link
				</button>
			</div>
			<p class="col-span-full mt-4 max-w-sm px-2 text-center leading-snug">
				Send it to your friend! <br>
				They should paste the whole link into their browser or paste the code into the <b>Join room</b> input.
			</p>
			<p class="mt-2 text-zinc-5 tracking-tight dark:text-zinc">
				<span
					v-for="(letter, index) of 'Waiting for players...'.split('')"
					v-once
					:key="index"
					class="waiting-wavy-letter inline-block"
					:class="letter === ' ' ? 'w-1' : letter === '.' ? 'wavy-dot' : ''"
					:style="`--wave-index: ${index}`"
				>
					{{ letter }}
				</span>
				<span class="ml-1">
					1 / 2
				</span>
			</p>
		</div>
	</main>
</template>
