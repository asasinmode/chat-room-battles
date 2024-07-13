interface IPayloadReconnectRoom {
	type: 'reconnectRoom';
	data: {
		id: string;
	};
}

interface IPayloadShop {
	type: 'shop';
	data: {
		tmp: string;
	};
}

export type IWSPayload = IPayloadReconnectRoom | IPayloadShop;

export type IErrorCode = 'roomNotFound';

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

interface IResponseReconnected {
	type: 'reconnected';
	data: IClientRoom;
}

export type IRoomWSResponse = IResponseError | IResponsePlayerJoined | IResponsePlayerDisconnected | IResponseReconnected;

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
