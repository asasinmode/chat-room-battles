<script setup lang="ts">
import TheSettings from '~/components/TheSettings.vue';

definePageMeta({ isHomePage: true });

const settings = ref<InstanceType<typeof TheSettings>>();
</script>

<template>
	<div class="h-full flex flex-col">
		<nav class="flex flex-col">
			<NuxtLink to="/start" class="main-menu-link b-(b-2 black) dark:b-white base-button-hoverable">
				play
			</NuxtLink>
			<button class="main-menu-link b-(b-2 black) dark:b-white base-button-hoverable" @click="settings?.openDialog()">
				settings
			</button>
			<TheSettings ref="settings" />
		</nav>

		<p class="mt-auto px-1 text-end text-3 text-zinc-5 dark:text-zinc">
			v{{ useAppConfig().version }}
		</p>
	</div>
</template>
