// @ts-check
import antfu from '@antfu/eslint-config';
import unocss from '@unocss/eslint-config/flat';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
	antfu({
		stylistic: {
			semi: true,
			indent: 'tab',
		},
		rules: {
			'curly': ['error', 'all'],
			'no-labels': 'off',
			'style/brace-style': ['error', '1tbs'],
			'ts/no-unused-expressions': 'off',
		},
		formatters: true,
	}, unocss),
);
