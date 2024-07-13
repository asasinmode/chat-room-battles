<script setup lang="ts">
const props = defineProps<{
	text: string;
	isBouncing?: boolean;
	absoluteDots?: boolean;
}>();

const computedText = computed(() => (props.isBouncing ? props.text.concat('...') : props.text));
</script>

<template>
	<span class="bouncing-letters relative inline-block leading-normal">
		<span class="sr-only">{{ text }}</span>
		<span
			v-for="(letter, index) in computedText.split('')"
			:key="index"
			:class="[
				letter === ' ' ? 'w-1' : letter === '.' ? `bouncing-dot${
					absoluteDots ? ' absolute -right-1' : ''
				}` : '',
				isBouncing ? 'bouncing-letter' : '',
			]"
			:style="`--letter-index: ${index}`"
			class="inline-block transform-gpu"
			aria-hidden="true"
		>
			{{ letter }}
		</span>
	</span>
</template>

<style>
.bouncing-letters {
	> .bouncing-dot.absolute:nth-last-child(1) {
		@apply 'translate-x-[200%]';
	}

	> .bouncing-dot.absolute:nth-last-child(2) {
		@apply 'translate-x-full';
	}
}

.bouncing-letter {
	animation: letter-bounce var(--bounce-duration, 1.8s) ease-in-out
		calc(var(--letter-index) * 40ms) infinite;

	.fast & {
		animation-name: letter-bounce-fast;
	}
}

@keyframes letter-bounce {
	0% {
		translate: 0 0;
	}

	12.5% {
		translate: 0 -0.3em;
	}

	25% {
		translate: 0 0;
	}
}

@keyframes letter-bounce-fast {
	0% {
		translate: 0 0;
	}

	15% {
		translate: 0 -0.3em;
	}

	30% {
		translate: 0 0;
	}
}

@media (prefers-reduced-motion) {
	.bouncing-letter {
		animation: none;
	}

	.bouncing-dot {
		animation: reduced-motion-wavy-dot 1.2s step-start infinite !important;
	}

	@keyframes reduced-motion-wavy-dot {
		50% {
			opacity: 0;
		}
	}
}
</style>
