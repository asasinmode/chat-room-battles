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
			'base-button-hoverable': 'hoverable:bg-zinc-2 dark:hoverable:bg-zinc-8',
		},
		[/^button[:-](.+)$/, ([, c]) => `px-3 py-1 font-600 uppercase rounded-lg bg-${c}`],
	],
	variants: [
		(matcher) => {
			if (matcher.slice(0, 10) !== 'hoverable:') {
				return matcher;
			}

			return {
				matcher: matcher.slice(10),
				selector: s => `${s}:hover, ${s}:focus-visible`,
			};
		},
	],
});
