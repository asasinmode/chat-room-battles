<script setup lang="ts">
const props = defineProps<{
	text: string;
	isBouncing?: boolean;
}>();

const computedText = computed(() => (props.isBouncing ? props.text.concat('...') : props.text));
</script>

<template>
	<span class="sr-only">{{ text }}</span>
	<span
		v-for="(letter, index) in computedText.split('')"
		:key="index"
		:class="[letter === ' ' ? 'w-1' : letter === '.' ? 'bouncing-dot' : '', isBouncing ? 'bouncing-letter' : '']"
		:style="`--letter-index: ${index}`"
		class="inline-block"
		aria-hidden="true"
	>
		{{ letter }}
	</span>
</template>

<style>
.bouncing-letter {
	animation: letter-bounce var(--bounce-duration, 1.9s) ease-in-out
		calc(var(--letter-index) * 40ms) infinite;
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
