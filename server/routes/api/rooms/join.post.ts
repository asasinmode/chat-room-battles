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

	const roomManager = useRoomManager();
	const room = roomManager.rooms.find(r => r.code === validationResult.output.toUpperCase());

	if (!room) {
		setResponseStatus(event, 404);
		return { code: ['Room with given code not found'] };
	}

	return room;
});
