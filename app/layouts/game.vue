<template>
	<div class="mx-auto h-full max-w-xl w-full flex flex-col b-(x-2 black) dark:b-white">
		<header class="h-12 flex shrink-0 items-center gap-3 b-(b-2 black) px-2 dark:b-white">
			<img src="https://loremflickr.com/200/200" class="size-9 rounded-1/2">
			<h2 class="mr-auto truncate text-5 font-600">
				Party Animals
			</h2>
			<button title="menu" class="aspect-1 w-10 flex-center rounded-1/2 -mr-3 base-button-hoverable">
				<span class="sr-only" aria-hidden="true">menu</span>
				<div class="i-ph-list-bold size-7" />
			</button>
			<button title="information" class="aspect-1 w-10 flex-center rounded-1/2 -mr-2 base-button-hoverable">
				<span class="sr-only" aria-hidden="true">information</span>
				<div class="i-ph-info-bold size-7" />
			</button>
		</header>
		<slot />
	</div>
</template>
