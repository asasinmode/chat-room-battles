interface IPayloadCreateRoom {
	type: 'createRoom';
	data: {
		playerId: string;
	};
}

interface IPayloadJoinRoom {
	type: 'joinRoom';
	data: {
		code: string;
	};
}

export type IWSPayload = IPayloadCreateRoom | IPayloadJoinRoom;

export type IErrorCode = 'roomNotFound';

interface IResponseError {
	type: 'error';
	data: {
		type: IErrorCode;
	};
}

interface IResponseRoomCreated {
	type: 'roomCreated';
	data: {
		code: string;
		playerCount: number;
	};
}

interface IResponsePlayerJoined {
	type: 'playerJoined';
	data: {
		playerCount: number;
		player: {
			id: string;
			fullName: string;
		};
	};
}

export type IRoomWSResponse = IResponseError | IResponseRoomCreated | IResponsePlayerJoined;
