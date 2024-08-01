import { randomUUID } from 'node:crypto';
import type { IRoomWSResponse, IWSPayload } from '~~/types/room';

const roomManager = useRoomManager();

type Peer = Parameters<Required<Parameters<typeof defineWebSocketHandler>[0]>['message']>[0];

export default defineWebSocketHandler({
	open(peer) {
		console.log('[ws] open', peer, peer.id);
	},

	async message(peer, message) {
		const text = message.text();
		if (!text) {
			roomLogger.warn('empty message received', message);
			return;
		}

		if (text === 'ping') {
			peer.send('pong');
			return;
		}

		let data: IWSPayload;
		try {
			data = JSON.parse(text);
		} catch (e) {
			roomLogger.warn(`unparsable message received '${text}'`);
			roomLogger.error(e);
			return;
		}

		if (!data.type) {
			roomLogger.warn(`message with no type received '${data}'`);
			return;
		}

		peer.send(JSON.stringify(await handleMessage(peer, data)));
	},

	close(peer, event) {
		console.log('[ws] close', peer, peer.id, event);

		const room = roomManager.rooms.find(room => room.connectedPlayers.some(p => p.wsId === peer.id));
		if (!room) {
			return;
		}

		const playerIndex = room.connectedPlayers.findIndex(p => p.wsId === peer.id);
		if (playerIndex === -1) {
			return;
		}

		const { fullName, id } = room.connectedPlayers[playerIndex];
		const roomIdentifier = logIdentifiers(room.name, `${room.id}, ${room.code}`);

		roomLogger.debug(`player ${logIdentifiers(fullName, id)} disconnected from room ${roomIdentifier}`);

		room.connectedPlayers.splice(playerIndex, 1);
		peer.publish(room.id, {
			type: 'playerDisconnected',
			data: {
				playerCount: room.connectedPlayers.length,
				id,
			},
		} satisfies IRoomWSResponse);

		if (!room.connectedPlayers.length) {
			roomLogger.debug(`no players left in ${roomIdentifier}, removing it in 10 seconds`);
			room.removeTimeout = setTimeout(() => {
				const roomIndex = roomManager.rooms.findIndex(r => r.id === room.id);
				~roomIndex && roomManager.rooms.splice(roomIndex, 1);
				roomLogger.debug(`removed room ${roomIdentifier}`);
			}, 10000);
		}
	},

	error(peer, error) {
		console.log('[ws] error', peer, error);
	},
});

async function handleMessage(peer: Peer, payload: IWSPayload): Promise<IRoomWSResponse> {
	if (payload.type === 'reconnectRoom') {
		const room = roomManager.rooms.find(r => r.id === payload.data.id);
		if (!room) {
			return {
				type: 'error',
				data: {
					code: 'roomNotFound',
				},
			};
		}

		const player = {
			id: randomUUID(),
			fullName: 'Reconnected Randy',
			wsId: peer.id,
		};

		roomLogger.debug(`player ${logIdentifiers(player.fullName, player.id)} is reconnecting to room ${logIdentifiers(room.name, `${room.id}, ${room.code}`)}`);

		if (room.removeTimeout) {
			roomLogger.debug(`stopping remove timeout of room ${logIdentifiers(room.name, `${room.id}, ${room.code}`)}`);

			clearTimeout(room.removeTimeout);
			room.removeTimeout = undefined;
		}

		room.connectedPlayers.push(player);
		const playerCount = room.connectedPlayers.length;

		peer.publish(room.id, {
			type: 'playerJoined',
			data: {
				playerCount,
				id: player.id,
				fullName: player.fullName,
			},
		} satisfies IRoomWSResponse);
		peer.subscribe(room.id);

		return {
			type: 'reconnected',
			data: {
				id: room.id,
				code: room.code,
				name: room.name,
				playerCount,
			},
		};
	} else if (payload.type === 'shop') {
		return {
			type: 'error',
			data: {
				code: 'roomNotFound',
			},
		};
	}
	roomLogger.warn('unknown message type received', payload);
	return payload;
}
