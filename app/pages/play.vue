<script setup lang="ts">
import type { IRoomWSPayload, IRoomWSResponse } from '~~/types/room';

definePageMeta({ layout: 'game' });
useSeoMeta({ title: 'Play' });

const { origin } = useRequestURL();
const route = useRoute();
// const router = useRouter();

const ws = useApiWebsocket<IRoomWSPayload, IRoomWSResponse>('_rooms', {
	roomCreated(data) {
		console.log('i got back', data);
	},
});

ws.send('');

// if ('createRoom' in route.query) {
// 	ws.send('createRoom');
// } else if (route.query.join) {
// 	ws.send(`joinRoom=${route.query.join}`);
// }

// router.replace({ query: {} });

const isWaitingForPlayers = ref(true);

function copyRoomCodeLink() {
	console.log('copying', `${origin}?join=<code-goes-here>`);
}
</script>

<template>
	<main class="">
		<div v-if="isWaitingForPlayers" class="flex flex-col items-center pb-4">
			<h1 class="main-menu-link">
				Room code
			</h1>
			<div class="flex flex-wrap justify-center gap-x-5 gap-y-2 px-2">
				<span class="col-span-2 w-fit justify-self-center rounded-lg bg-zinc-2 px-2 py-1 dark:bg-zinc-8">
					{{ 'A1B2C' }}
				</span>
				<button class="w-fit button-blue-4 rounded-lg px-2 py-1 font-600 uppercase dark:bg-blue-6 hoverable:bg-blue-5 dark:hoverable:bg-blue-5" @click="copyRoomCodeLink">
					copy link
				</button>
			</div>
			<p class="col-span-full mt-4 max-w-sm px-2 text-center leading-snug">
				Send it to your friend! <br>
				They should paste the whole link into their browser or paste the code into the <b>Join room</b> input.
			</p>
			<p v-once class="mt-2 text-zinc-5 tracking-tight dark:text-zinc" style="--wave-duration: 1.5s">
				<span
					v-for="(letter, index) of 'Waiting for players...'.split('')"
					:key="index"
					class="wavy-letter-waiting-for-players inline-block"
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

<style>
.wavy-letter-waiting-for-players {
	animation: letter-bounce-waiting-for-players 1.8s ease-in-out
		calc(var(--wave-index) * 40ms) infinite;
}

@keyframes letter-bounce-waiting-for-players {
	0% {
		translate: 0 0;
	}

	12% {
		translate: 0 -15%;
	}

	24% {
		translate: 0 0;
	}
}

@media (prefers-reduced-motion) {
	.wavy-letter-waiting-for-players {
		animation: none;
	}
}
</style>
