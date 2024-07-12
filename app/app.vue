<script setup lang="ts">
useSeoMeta({
	titleTemplate: prefix => prefix ? `${prefix} - Chat Room Battles` : 'Chat Room Battles',
	description: 'A text-based auto-battler where you construct emoji messages then send them to battle with other players',
	robots: {
		none: true,
	},
});

const { ErrorDialog } = useVError();
const { TheDisconnectedStatus } = useDisconnectedStatus();
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<ErrorDialog />
	<TheDisconnectedStatus />
</template>

<style>
.wavy-letter-disconnected {
	animation: letter-bounce-disconnected 1.9s ease-in-out
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
