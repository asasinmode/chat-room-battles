import {
	defineConfig,
	presetIcons,
	presetUno,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';

export default defineConfig({
	presets: [
		presetUno({
			dark: 'media',
		}),
		presetIcons(),
	],
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
	],
	shortcuts: [
		{
			'flex-center': 'flex justify-center items-center',
			'translate-center': 'translate-x--1/2 translate-y--1/2',
		},
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
	blocklist: ['container'],
});
