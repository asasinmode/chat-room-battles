<script setup lang="ts">
const roomCodeToJoin = ref('');
const isCreatingRoom = ref(false);
const generatedRoomCode = 123456;
</script>

<template>
	<section class="h-full flex flex-col overflow-x-hidden overflow-y-auto">
		<div class="flex flex-col items-center b-(b-2 black) dark:b-white" :class="isCreatingRoom ? 'pb-4' : ''">
			<button
				class="col-span-full h-[calc(3rem_-_2px)] w-full text-center font-600 leading-11 tracking-wider uppercase"
				:class="isCreatingRoom ? '' : 'hoverable:bg-zinc-2 dark:hoverable:bg-zinc-8'"
				:disabled="isCreatingRoom"
				@click="isCreatingRoom = true"
			>
				Create room
			</button>
			<template v-if="isCreatingRoom">
				<div class="flex flex-wrap justify-center gap-x-5 gap-y-2 px-2">
					<span class="col-span-2 w-fit justify-self-center rounded-lg bg-zinc-2 px-2 py-1 dark:bg-zinc-8">
						<span class="text-zinc-5 dark:text-zinc">{{ $config.public.appUrl }}/play?code=</span>{{ generatedRoomCode }}
					</span>
					<button class="w-fit button-blue-4 rounded-lg px-2 py-1 font-600 uppercase dark:bg-blue-6 hoverable:bg-blue-5 dark:hoverable:bg-blue-5">
						copy link
					</button>
				</div>
				<p class="col-span-full mt-4 max-w-sm px-2 text-center leading-snug">
					Send it to your friend! <br>
					They should paste the whole link into their browser or paste it in the "Join room" input.
				</p>
				<p class="mt-2 text-zinc tracking-tight">
					<span
						v-for="(letter, index) of 'Waiting for another player to join the room...'.split('')"
						:key="index"
						class="wavy-letter inline-block"
						:class="letter === ' ' ? 'w-1' : ''"
						:style="`--wave-index: ${index}`"
					>
						{{ letter }}
					</span>
				</p>
			</template>
		</div>

		<div class="flex flex-col items-center b-(b-2 black) pb-4 dark:b-white">
			<h3 class="font-center col-span-full h-12 w-full px-2 text-center font-600 leading-11 tracking-wider uppercase">
				join room
			</h3>
			<div class="flex items-center gap-2 px-2">
				<label for="roomCode" class="h-fit">Code or link:</label>
				<input
					id="roomCode"
					v-model="roomCodeToJoin"
					placeholder="123456"
					class="min-w-0 w-18 justify-self-center rounded-lg bg-zinc-2 px-1 py-1 text-center dark:bg-zinc-8 placeholder-zinc-5 dark:placeholder-zinc-4"
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

		<p class="mt-auto px-1 text-end text-3 text-zinc">
			v{{ useAppConfig().appVersion }}
		</p>
	</section>
</template>

<style>
.wavy-letter {
	--reduced-animation-wavy-brightness-modifier: -0.2;
	animation: letter-bounce 2s ease-in-out infinite;
	animation-delay: calc(var(--wave-index) * 40ms);
}

.dark .wavy-letter {
	--reduced-animation-wavy-brightness-modifier: 1;
}

@keyframes letter-bounce {
	0% {
		translate: 0 0;
	}

	12.5% {
		translate: 0 -15%;
	}

	25% {
		translate: 0 0;
	}
}

@media (prefers-reduced-motion) {
	@keyframes letter-bounce {
		0% {
			filter: brightness(1);
		}

		12.5% {
			filter: brightness(
				calc(0.7 + var(--reduced-animation-wavy-brightness-modifier))
			);
		}

		25% {
			filter: brightness(1);
		}
	}
}
</style>
