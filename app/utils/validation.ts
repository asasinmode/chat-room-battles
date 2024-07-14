import * as v from 'valibot';

v.setGlobalConfig({ lang: 'en' });

v.setSpecificMessage(v.string, () => 'Invalid type, expected string', 'en');
v.setSpecificMessage(v.length, issue => `Invalid length, should be ${issue.expected}`, 'en');

export const roomCodeValidation = v.pipe(v.string(), v.trim(), v.length(5));
