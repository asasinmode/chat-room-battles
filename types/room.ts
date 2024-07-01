interface ICreateRoomPayload {
	type: 'create';
}

interface IJoinRoomPayload {
	type: 'join';
	data: string;
}

export type IRoomWSPayload = ICreateRoomPayload | IJoinRoomPayload;

interface IRoomCreatedResponse {
	type: 'roomCreated';
	data: {
		code: string;
	};
}

export type IRoomWSResponse = IRoomCreatedResponse;
