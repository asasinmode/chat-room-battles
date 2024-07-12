import type { IServerRoom } from '~~/types/room';

export default defineEventHandler(async (event) => {
	let room: IServerRoom;

	try {
		room = await useRoomManager().createRoom();
	} catch (e) {
		if (e instanceof VError) {
			setResponseStatus(event, e.statusCode);
			return 'roomCodeGenerationLimitReached';
		}
		roomLogger.error(e);
		setResponseStatus(event, 500);
		return;
	}

	return {
		id: room.id,
		name: room.name,
		code: room.code,
	};
});
