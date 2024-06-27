<script setup lang="ts">
useSeoMeta({
	titleTemplate: prefix => prefix ? `${prefix} - Chat Room Battles` : 'Chat Room Battles',
	description: 'A text-based auto-battler where you construct emoji messages then send them to battle with other players',
	robots: {
		none: true,
	},
});
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
