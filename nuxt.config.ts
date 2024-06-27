import { version } from './package.json';

export default defineNuxtConfig({
	future: { compatibilityVersion: 4 },
	hub: {
		database: true,
	},
	nitro: {
		experimental: {
			openAPI: true,
			websocket: true,
		},
	},
	experimental: {
		typedPages: true,
	},
	devtools: { enabled: true },
	eslint: {
		config: {
			standalone: false,
		},
	},
	colorMode: {
		classSuffix: '',
		storageKey: 'chat-room-battles-color-mode',
	},
	modules: [
		'@nuxthub/core',
		'@nuxt/eslint',
		'@unocss/nuxt',
		'@nuxtjs/color-mode',
		'@vueuse/nuxt',
	],
	css: [
		'@unocss/reset/tailwind.css',
		'~/assets/index.css',
	],
	appConfig: {
		version,
	},
});
