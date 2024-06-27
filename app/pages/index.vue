<script setup lang="ts">
definePageMeta({
	isHomePage: true,
});
</script>

<template>
	<div class="h-full flex flex-col">
		<nav class="flex flex-col">
			<NuxtLink to="/start" class="mainMenuLink">
				play
			</NuxtLink>
			<TheSettings />
		</nav>

		<p class="mt-auto px-1 text-end text-3 text-zinc-5 dark:text-zinc">
			v{{ useAppConfig().version }}
		</p>
	</div>
</template>
