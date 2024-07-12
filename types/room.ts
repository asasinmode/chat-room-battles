interface IPayloadReconnectRoom {
	type: 'reconnectRoom';
	data: {
		id: string;
	};
}

export type IWSPayload = IPayloadReconnectRoom;

export type IErrorCode = 'unknown';

interface IResponseError {
	type: 'error';
	data: {
		code: IErrorCode;
	};
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

export type IRoomWSResponse = IResponseError | IResponsePlayerJoined | IResponsePlayerDisconnected;

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
