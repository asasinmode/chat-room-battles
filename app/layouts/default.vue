<script setup lang="ts">
const settingsRotationCount = ref(0);
</script>

<template>
	<div class="mx-auto h-full max-w-xl w-full b-(x-2 black)">
		<header class="h-12 flex items-center gap-3 b-(b-2 black) px-3">
			<img src="/logo.webp" class="size-9">
			<h2 class="mr-auto overflow-hidden whitespace-nowrap text-5 font-600">
				Chat Room Battles <sup class="rounded bg-yellow-5 px-1 uppercase">alpha</sup>
			</h2>
			<button
				title="settings"
				class="hoverable:bg-button-hover aspect-1 w-10 flex-center rounded-1/2 -mr-2"
				@click="settingsRotationCount++"
			>
				<span class="sr-only">settings</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 256 256"
					class="transition-transform"
					aria-hidden="true"
					:style="{
						'--rotation-count': settingsRotationCount,
						'transform': `rotate(calc(var(--rotation-count,_0) * 180deg))`,
					}"
				>
					<path fill="currentColor" d="M237.94 107.21a8 8 0 0 0-3.89-5.4l-29.83-17l-.12-33.62a8 8 0 0 0-2.83-6.08a111.9 111.9 0 0 0-36.72-20.67a8 8 0 0 0-6.46.59L128 41.85L97.88 25a8 8 0 0 0-6.47-.6a111.9 111.9 0 0 0-36.68 20.75a8 8 0 0 0-2.83 6.07l-.15 33.65l-29.83 17a8 8 0 0 0-3.89 5.4a106.5 106.5 0 0 0 0 41.56a8 8 0 0 0 3.89 5.4l29.83 17l.12 33.63a8 8 0 0 0 2.83 6.08a111.9 111.9 0 0 0 36.72 20.67a8 8 0 0 0 6.46-.59L128 214.15L158.12 231a7.9 7.9 0 0 0 3.9 1a8.1 8.1 0 0 0 2.57-.42a112.1 112.1 0 0 0 36.68-20.73a8 8 0 0 0 2.83-6.07l.15-33.65l29.83-17a8 8 0 0 0 3.89-5.4a106.5 106.5 0 0 0-.03-41.52M128 168a40 40 0 1 1 40-40a40 40 0 0 1-40 40" />
				</svg>
			</button>
		</header>

		<slot />
	</div>
</template>
