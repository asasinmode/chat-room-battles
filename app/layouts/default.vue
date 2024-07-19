<template>
	<div class="mx-auto h-full max-w-xl w-full flex flex-col b-(x-2 black) dark:b-white">
		<header class="h-12 flex shrink-0 items-center gap-3 b-(b-2 black) px-2 dark:b-white">
			<img src="/logo.webp" class="size-9">
			<h2 class="mr-auto overflow-hidden whitespace-nowrap text-5 font-600">
				Chat Room Battles <sup class="rounded bg-yellow-5 px-1 uppercase dark:bg-yellow-7">alpha</sup>
			</h2>
			<NuxtLink
				v-if="!$route.meta.isHomePage"
				title="go back"
				class="aspect-1 w-10 flex-center rounded-1/2 -mr-2 base-button-hoverable"
				to="/"
			>
				<span class="sr-only">go back</span>
				<div class="i-ph-arrow-left-bold size-6" aria-hidden="true" />
			</NuxtLink>
		</header>
		<slot />
	</div>
</template>
