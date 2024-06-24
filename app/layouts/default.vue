<template>
	<div class="mx-auto h-full max-w-xl w-full b-(x-2 black)">
		<header class="h-12 flex items-center gap-3 b-(b-2 black) px-3">
			<img src="/logo.webp" class="size-9">
			<h2 class="mr-auto overflow-hidden whitespace-nowrap text-5 font-600">
				Chat Room Battles <sup class="rounded bg-yellow-5 px-1 uppercase">alpha</sup>
			</h2>
			<button
				v-if="!$route.meta.isHomePage"
				title="go back"
				class="hoverable:bg-button-hover aspect-1 w-10 flex-center rounded-1/2 -mr-2"
				@click="$router.back()"
			>
				<span class="sr-only">go back</span>
				<div class="i-ph-arrow-left-bold size-6" aria-hidden="true" />
			</button>
		</header>
		<slot />
	</div>
</template>

<style>
.mainMenuLink {
	@apply 'hoverable:bg-button-hover block h-12 b-(b-2 black) px-3 text-center font-600 leading-11 tracking-wider uppercase';
}
</style>
