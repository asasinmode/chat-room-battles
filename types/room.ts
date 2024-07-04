interface IPayloadCreateRoom {
	type: 'createRoom';
}

interface IPayloadJoinRoom {
	type: 'joinRoom';
	data: {
		code: string;
	};
}

interface IPayloadReconnectRoom {
	type: 'reconnectRoom';
	data: {
		id: string;
	};
}

export type IWSPayload = IPayloadCreateRoom | IPayloadJoinRoom | IPayloadReconnectRoom;

export type IErrorCode = 'roomNotFound' | 'codeGenerationLimitReached';

interface IResponseError {
	type: 'error';
	data: {
		code: IErrorCode;
	};
}

interface IResponseRoomCreated {
	type: 'roomCreated';
	data: IClientRoom;
}

interface IResponsePlayerJoined {
	type: 'playerJoined';
	data: {
		playerCount: number;
		id: string;
		fullName: string;
	};
}

interface IResponsePlayerDisconnected {
	type: 'playerDisconnected';
	data: {
		playerCount: number;
		id: string;
	};
}

export type IRoomWSResponse = IResponseError | IResponseRoomCreated | IResponsePlayerJoined | IResponsePlayerDisconnected;

export interface IRoom {
	id: string;
	code: string;
	name: string;
}

export interface IServerRoom extends IRoom {
	removeTimeout?: NodeJS.Timeout;
	connectedPlayers: {
		id: string;
		wsId: string;
		fullName: string;
	}[];
}

export interface IClientRoom extends IRoom {
	playerCount: number;
}
