<script setup lang="ts">
const generatedRoomCode = 123456;
</script>

<template>
	<div>
		<header class="h-12 flex items-center gap-3 b-(b-2 black) px-3">
			<img src="https://loremflickr.com/200/200" class="size-6 rounded-1/2">
			<h2 class="mr-auto truncate text-5">
				Party Animals
			</h2>
			<button title="menu" class="aspect-1 w-10 flex-center rounded-1/2 -mr-3">
				<span class="sr-only" aria-hidden="true">menu</span>
				<div class="i-ph-list-bold size-5" />
			</button>
			<button title="information" class="aspect-1 w-10 flex-center rounded-1/2 -mr-2">
				<span class="sr-only" aria-hidden="true">information</span>
				<div class="i-ph-info size-6" />
			</button>
		</header>
		<div class="grid grid-cols-3 b-(b-2 black) px-2">
			<h3 class="font-center col-span-full mb-1 h-10 text-center font-600 leading-10 tracking-wider uppercase">
				create room
			</h3>
			<span class="col-span-2 w-fit justify-self-center rounded-lg px-2 py-1 text-black">
				<span class="text-zinc">{{ $config.public.appUrl }}/play?code=</span>{{ generatedRoomCode }}
			</span>
			<button class="w-fit rounded-lg bg-sky-6 px-2 py-1 font-600 uppercase">
				copy link
			</button>
			<p class="col-span-full mx-auto mt-4 w-sm">
				Send your friend the code to join the room or copy the link they can paste into their browser!
			</p>
		</div>
	</div>
</template>
