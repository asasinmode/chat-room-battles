export default defineNuxtConfig({
	future: { compatibilityVersion: 4 },
	modules: ['@nuxthub/core', '@nuxt/eslint', '@unocss/nuxt'],
	hub: {
		database: true,
		kv: true,
		blob: true,
		cache: true,
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
});
