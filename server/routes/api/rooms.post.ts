import type { IClientRoom, IServerRoom } from '~~/types/room';

type IResponse = IClientRoom;

export default defineEventHandler(async (event): Promise<IResponse> => {
	let room: IServerRoom;

	try {
		room = await useRoomManager().createRoom();
	} catch (e) {
		if (e instanceof VError) {
			setResponseStatus(event, e.statusCode);
			return e.message as unknown as IResponse;
		}
		roomLogger.error(e);
		setResponseStatus(event, 500);
		return undefined as unknown as IResponse;
	}

	return {
		id: room.id,
		name: room.name,
		code: room.code,
		playerCount: 0,
	};
});
