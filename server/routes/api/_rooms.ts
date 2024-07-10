import { randomUUID } from 'node:crypto';
import consola from 'consola';
import { getColor } from 'consola/utils';
import type { Peer } from 'crossws';
import { generateCode } from '~~/server/database/schema/room';
import type { IRoomWSResponse, IServerRoom, IWSPayload } from '~~/types/room';

const rooms: IServerRoom[] = [];
const roomConsola = consola.withTag('room ws');

export default defineWebSocketHandler({
	open(peer) {
		console.log('[ws] open', peer, peer.id);
	},

	async message(peer, message) {
		const text = message.text();
		if (!text) {
			roomConsola.warn('empty message received', message);
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
			roomConsola.warn(`unparsable message received '${text}'`);
			roomConsola.error(e);
			return;
		}

		if (!data.type) {
			roomConsola.warn(`message with no type received '${data}'`);
			return;
		}

		peer.send(JSON.stringify(await handleMessage(peer, data)));
	},

	close(peer, event) {
		console.log('[ws] close', peer, peer.id, event);

		const room = rooms.find(room => room.connectedPlayers.some(p => p.wsId === peer.id));
		if (!room) {
			return;
		}

		const playerIndex = room.connectedPlayers.findIndex(p => p.wsId === peer.id);
		if (playerIndex === -1) {
			return;
		}

		const { fullName, id } = room.connectedPlayers[playerIndex];
		const roomIdentifier = logIdentifiers(room.name, `${room.id}, ${room.code}`);

		roomConsola.debug(`player ${logIdentifiers(fullName, id)} disconnected from room ${roomIdentifier}`);

		room.connectedPlayers.splice(playerIndex, 1);
		peer.publish(room.id, {
			type: 'playerDisconnected',
			data: {
				playerCount: room.connectedPlayers.length,
				id,
			},
		} satisfies IRoomWSResponse);

		if (!room.connectedPlayers.length) {
			roomConsola.debug(`no players left in ${roomIdentifier}, removing it in 10 seconds`);
			room.removeTimeout = setTimeout(() => {
				const roomIndex = rooms.findIndex(r => r.id === room.id);
				~roomIndex && rooms.splice(roomIndex, 1);
				roomConsola.debug(`removed room ${roomIdentifier}`);
			}, 10000);
		}
	},

	error(peer, error) {
		console.log('[ws] error', peer, error);
	},
});

async function handleMessage(peer: Peer, payload: IWSPayload): Promise<IRoomWSResponse> {
	if (payload.type === 'createRoom') {
		const code = await createRoomCode();

		if (!code) {
			return {
				type: 'error',
				data: {
					code: 'codeGenerationLimitReached',
				},
			};
		}

		const room: IServerRoom = {
			id: randomUUID(),
			code,
			name: 'Party Animals',
			connectedPlayers: [{
				id: randomUUID(),
				wsId: peer.id,
				fullName: 'Original Omar',
			}],
		};

		rooms.push(room);
		peer.subscribe(room.id);

		roomConsola.debug(`created room ${logIdentifiers(room.name, `${room.id}, ${room.code}`)}`);

		return {
			type: 'roomCreated',
			data: {
				id: room.id,
				code: room.code,
				name: room.name,
				playerCount: 1,
			},
		};
	} else if (payload.type === 'joinRoom') {
		const room = rooms.find(room => room.code === payload.data.code);
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
			wsId: peer.id,
			fullName: 'Caring Cassidy',
		};
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

		roomConsola.debug(`player ${logIdentifiers(player.fullName, player.id)} joined room ${logIdentifiers(room.name, `${room.id}, ${room.code}`)}`);

		return {
			type: 'roomCreated',
			data: {
				id: room.id,
				code: room.code,
				name: room.name,
				playerCount,
			},
		};
	} else if (payload.type === 'reconnectRoom') {
		// TODO this and on close will have to be reworked once there are player accounts
		const room = rooms.find(r => r.id === payload.data.id);
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

		roomConsola.debug(`player ${logIdentifiers(player.fullName, player.id)} is reconnecting to room ${logIdentifiers(room.name, `${room.id}, ${room.code}`)}`);

		if (room.removeTimeout) {
			roomConsola.debug(`stopping remove timeout of room ${logIdentifiers(room.name, `${room.id}, ${room.code}`)}`);

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
			type: 'roomCreated',
			data: {
				id: room.id,
				code: room.code,
				name: room.name,
				playerCount,
			},
		};
	}
	roomConsola.warn('unknown message type received', payload);
	return payload;
}

function logIdentifiers(primary: string | number, secondary: string | number) {
	return `${getColor('cyan')(primary)} ${getColor('gray')(`(${secondary})`)}`;
}

async function createRoomCode(): Promise<string | undefined> {
	let code = generateCode();
	let generationCounter = 1;

	while (await roomWithCodeExists(code)) {
		roomConsola.debug(`duplicate code generated ${getColor('cyan')(code)}, iterations: ${getColor('yellow')(generationCounter)}`);

		if (generationCounter > 10) {
			consola.withTag('room').error(`code generation limit reached`);
			return;
		}

		code = generateCode();
		generationCounter += 1;
	}

	return code;
}

async function roomWithCodeExists(code: string): Promise<boolean> {
	// TMP
	return rooms.some(r => r.code === code);
	// const { roomExists } = await useDrizzle().get<{ roomExists: number }>(
	// 	sql`SELECT EXISTS (SELECT 1 FROM ${tables.room} WHERE ${tables.room.code} = ${code}) as roomExists`,
	// );
	// return !!roomExists;
}
