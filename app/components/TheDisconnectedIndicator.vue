<template>
	<article class="fixed right-2 top-2 b-(2 black) bg-white px-4 py-2 shadow-lg dark:b-white dark:bg-black">
		<h1 class="mb-0.5 text-5 font-600">
			Disconnected
		</h1>
		<p v-once class="text-zinc-5 dark:text-zinc">
			<span
				v-for="(letter, index) of 'Attemping to reconnect...'.split('')"
				:key="index"
				class="wavy-letter-disconnected inline-block"
				:class="letter === ' ' ? 'w-1' : letter === '.' ? 'wavy-dot' : ''"
				:style="`--wave-index: ${index}`"
			>
				{{ letter }}
			</span>
		</p>
	</article>
</template>

<style>
.wavy-letter-disconnected {
	animation: letter-bounce-disconnected 2s ease-in-out
		calc(var(--wave-index) * 40ms) infinite;
}

@keyframes letter-bounce-disconnected {
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
	.wavy-letter-disconnected {
		animation: none;
	}

	.wavy-dot {
		animation: reduced-motion-wavy-dot 1.2s step-start infinite !important;
	}

	@keyframes reduced-motion-wavy-dot {
		50% {
			opacity: 0;
		}
	}
}
</style>
