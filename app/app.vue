<script setup lang="ts">
import VDialog from '~/components/V/VDialog.vue';

useSeoMeta({
	titleTemplate: prefix => prefix ? `${prefix} - Chat Room Battles` : 'Chat Room Battles',
	description: 'A text-based auto-battler where you construct emoji messages then send them to battle with other players',
	robots: {
		none: true,
	},
});

const router = useRouter();
const { TheDisconnectedStatus } = useDisconnectedStatus();

const errorDialog = ref<InstanceType<typeof VDialog>>();
const errorMessages = ref<string[]>([]);

onErrorCaptured((error) => {
	if (error instanceof VError) {
		errorMessages.value.push(error.message);
	} else {
		errorMessages.value.push('Unknown error occured');
	}
	errorDialog.value?.showModal();
});

function closeErrorDialog() {
	errorDialog.value?.close();
	router.go(0);
}
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<VDialog id="error" ref="errorDialog" title="Something went wrong 😓" class="text-center" @keydown.esc.prevent="closeErrorDialog">
		<p class="mb-4 leading-snug -mt-2">
			Chat Room Battles has most likely broken. <br>
			Below is the list of errors and all we know about them.
		</p>
		<ul class="mb-4 flex flex-col list-disc gap-2 pl-4 text-start">
			<li v-for="(message, index) in errorMessages" :key="index" class="leading-snug">
				{{ message }}
			</li>
		</ul>
		<button class="mx-auto w-fit button-red-5 dark:bg-red-7 hoverable:bg-red-7 dark:hoverable:bg-red-6" @click.prevent="closeErrorDialog">
			refresh
		</button>
	</VDialog>
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
