import * as v from 'valibot';

v.setSpecificMessage(v.string, () => 'Invalid type, expected string', 'en');
v.setSpecificMessage(v.minLength, issue => `Invalid length, min: ${issue.expected}`, 'en');
v.setSpecificMessage(v.maxLength, issue => `Invalid length, max: ${issue.expected}`, 'en');

export const roomCodeValidation = v.pipe(v.string(), v.trim(), v.minLength(5), v.maxLength(5));
