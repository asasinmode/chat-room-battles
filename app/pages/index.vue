<script setup lang="ts">
definePageMeta({
	isHomePage: true,
});
</script>

<template>
	<nav class="flex flex-col">
		<NuxtLink to="/start" class="mainMenuLink">
			play
		</NuxtLink>
		<button class="mainMenuLink">
			settings
		</button>
	</nav>
</template>
