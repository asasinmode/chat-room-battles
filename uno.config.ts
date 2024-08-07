import {
	defineConfig,
	presetIcons,
	presetUno,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';

export default defineConfig({
	presets: [
		presetUno(),
		presetIcons(),
	],
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
	],
	blocklist: ['container'],
	shortcuts: [
		{
			'flex-center': 'flex justify-center items-center',
			'translate-center': 'translate-x--1/2 translate-y--1/2',
			'main-menu-link': 'h-12 font-600 leading-11 tracking-wider uppercase block px-2 text-center',
			'base-button-hoverable': 'hover:bg-zinc-2 focus-visible:bg-zinc-2 dark:hover:bg-zinc-8 dark:focus-visible:bg-zinc-8',
		},
		[/^button[:-](.+)$/, ([, c]) => `px-3 py-1 font-600 uppercase rounded-lg bg-${c} b-2 b-black dark:b-white`],
		[/^hoverable[:-](.+)$/, ([, c]) => `hover:${c} focus-visible:${c}`],
	],
});
