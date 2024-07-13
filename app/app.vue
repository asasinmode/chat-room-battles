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
