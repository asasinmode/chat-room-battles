<script setup lang="ts">
import TheSettings from '~/components/TheSettings.vue';

definePageMeta({ isHomePage: true });

const settings = ref<InstanceType<typeof TheSettings>>();
</script>

<template>
	<div class="h-full flex flex-col">
		<nav class="flex flex-col">
			<NuxtLink to="/start" class="mainMenuLink interactive b-(b-2 black) dark:b-white">
				play
			</NuxtLink>
			<button class="mainMenuLink interactive b-(b-2 black) dark:b-white" @click="settings?.openDialog()">
				settings
			</button>
			<TheSettings ref="settings" />
		</nav>

		<p class="mt-auto px-1 text-end text-3 text-zinc-5 dark:text-zinc">
			v{{ useAppConfig().version }}
		</p>
	</div>
</template>
