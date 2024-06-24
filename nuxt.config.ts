export default defineNuxtConfig({
	future: { compatibilityVersion: 4 },
	hub: {
		database: true,
	},
	nitro: {
		experimental: {
			openAPI: true,
		},
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
	],
	css: [
		'@unocss/reset/tailwind.css',
		'~/assets/index.css',
	],
	runtimeConfig: {
		public: {
			appUrl: 'http://localhost:3000',
		},
	},
});
