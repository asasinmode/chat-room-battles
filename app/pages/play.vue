<script setup lang="ts">
import type { IClientRoom, IRoomWSResponse, IWSPayload } from '~~/types/room';

definePageMeta({ layout: 'game' });
useSeoMeta({ title: 'Play' });

const { origin } = useRequestURL();
const route = useRoute();
// const router = useRouter();

const isCodeInvalid = ref(false);
const hasGameStarted = ref(false);

const room = ref<IClientRoom>();

const ws = useApiWebsocket<IWSPayload, IRoomWSResponse>('_rooms', {
	roomCreated(data) {
		console.log('room created', data);
		room.value = data;
	},
	playerJoined(data) {
		if (!room.value) {
			// TODO alert error somehow
			console.error('player joined but room doesn\'t exist');
			return;
		}

		console.log('player joined', data);
		room.value.playerCount = data.playerCount;
	},
	playerDisconnected(data) {
		if (!room.value) {
			// TODO alert error somehow
			console.error('disconnected with no room set');
			return;
		}

		console.log('player disconnected', data);
		room.value.playerCount = data.playerCount;
	},
	error(data) {
		console.log('oopsie error', data);
		if (data.code === 'roomNotFound') {
			isCodeInvalid.value = true;
		}
	},
}, () => {
	if (!room.value) {
		console.error('reconnected with no room set');
		return;
	}
	ws.send({ type: 'reconnectRoom', data: { id: room.value.id } });
});

if ('createRoom' in route.query) {
	ws.send({ type: 'createRoom' });
} else if (route.query.join) {
	ws.send({
		type: 'joinRoom',
		data: {
			code: route.query.join as string,
		},
	});
} else {
	navigateTo('/start', { replace: true });
}

// router.replace({ query: {} });

const copyTooltip = ref<HTMLDialogElement>();

function copyRoomCodeLink() {
	useClipboard().copy(`${origin}/play?join=${room.value?.code || ''}`);
	copyTooltip.value?.show();
}
</script>

<template>
	<main class="">
		<div v-if="!hasGameStarted" class="flex flex-col items-center pb-4">
			<h1 class="main-menu-link">
				Room code
			</h1>
			<div class="flex flex-wrap justify-center gap-x-5 gap-y-2 px-2">
				<span class="col-span-2 w-fit justify-self-center rounded-lg bg-zinc-2 px-2 py-1 dark:bg-zinc-8">
					{{ room?.code }}
				</span>
				<div class="relative">
					<button class="relative w-fit button-blue-4 rounded-lg px-2 py-1 font-600 uppercase dark:bg-blue-6 hoverable:bg-blue-5 dark:hoverable:bg-blue-5" @click.stop="copyRoomCodeLink">
						copy link
					</button>
					<dialog
						ref="copyTooltip"
						class="rounded-md px-2 py-1 text-3 -top-1 -translate-y-full"
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
				<span class="sr-only">Waiting for players...</span>
				<span
					v-for="(letter, index) of 'Waiting for players...'.split('')"
					:key="index"
					:class="letter === ' ' ? 'w-1' : letter === '.' ? 'wavy-dot' : ''"
					:style="`--wave-index: ${index}`"
					class="wavy-letter-waiting-for-players inline-block"
					aria-hidden="true"
				>
					{{ letter }}
				</span>
				<span class="ml-1">
					{{ room?.playerCount ?? 0 }} / 2
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
