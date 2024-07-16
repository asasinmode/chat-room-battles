import * as v from 'valibot';
import { roomCodeValidation } from '~/utils/validation';

export default defineEventHandler(async (event) => {
	const code = await readRawBody(event);
	const validationResult = v.safeParse(roomCodeValidation, code);

	if (!validationResult.success) {
		setResponseStatus(event, 400);
		return {
			code: validationResult.issues.map(issue => issue.message),
		};
	}

	console.log('joining room', code, validationResult.output);

	return 'a room :)';
});
