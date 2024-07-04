import { randomUUID } from 'node:crypto';
import consola from 'consola';
import type { Peer } from 'crossws';

import type { IRoomWSResponse, IWSPayload } from '~~/types/room';

export default defineWebSocketHandler({
	open(peer) {
		console.log('[ws] open', peer, peer.id);
	},

	message(peer, message) {
		const text = message.text();
		if (!text) {
			consola.withTag('room ws').warn('empty message received', message);
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
			consola.withTag('room ws').warn(`unparsable message received '${text}'`);
			consola.withTag('room ws').error(e);
			return;
		}

		if (!data.type) {
			consola.withTag('room ws').warn('message with no type received', data);
			return;
		}

		peer.send(JSON.stringify(handleMessage(peer, data)));
	},

	close(peer, event) {
		console.log('[ws] close', peer, peer.id, event);
	},

	error(peer, error) {
		console.log('[ws] error', peer, error);
	},
});

interface IRoom {
	id: string;
	code: string;
	connectedPlayers: {
		id: string;
		wsId: string;
		fullName: string;
	}[];
}

const rooms: IRoom[] = [];

function handleMessage(peer: Peer, data: IWSPayload): IRoomWSResponse {
	if (data.type === 'createRoom') {
		const room: IRoom = {
			id: randomUUID(),
			code: 'CR3AT3D',
			connectedPlayers: [{
				id: randomUUID(),
				wsId: peer.id,
				fullName: 'Original Omar',
			}],
		};
		rooms.push(room);

		peer.subscribe(room.id);

		return {
			type: 'roomCreated',
			data: {
				code: 'CR3AT3D',
				playerCount: 1,
			},
		};
	} else if (data.type === 'joinRoom') {
		const room = rooms.find(room => room.code);
		if (!room) {
			return {
				type: 'error',
				data: {
					type: 'roomNotFound',
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
				player: {
					id: player.id,
					fullName: player.fullName,
				},
			},
		} satisfies IRoomWSResponse);
		peer.subscribe(room.id);

		return {
			type: 'roomCreated',
			data: {
				code: 'J01N3D',
				playerCount,
			},
		};
	}
	consola.withTag('room ws').warn('unknown message type received', data);
	return data;
}

// export default defineEventHandler(async (event) => {
// 	consola.withTag('room').debug('creating room');

// 	let code = generateCode();
// 	let generationCounter = 1;

// 	while (roomWithCodeExists(code)) {
// 		consola.withTag('room').debug(`duplicate code '${code}', iterations: ${generationCounter}`);

// 		if (generationCounter > 10) {
// 			consola.withTag('room').error(`code generation limit reached`);
// 			setResponseStatus(event, 508);
// 			return;
// 		}

// 		code = generateCode();
// 		generationCounter += 1;
// 	}

// 	const [room] = await useDrizzle()
// 		.insert(tables.room)
// 		.values({ code })
// 		.returning({
// 			id: tables.room.id,
// 			code: tables.room.code,
// 		});

// 	console.log('room', room);

// 	consola.withTag('room').debug(`generated room code after ${generationCounter} tries`);

// 	return room;
// });

// async function roomWithCodeExists(code: string): Promise<boolean> {
// 	const { roomExists } = await useDrizzle().get<{ roomExists: number }>(
// 		sql`SELECT EXISTS (SELECT 1 FROM ${tables.room} WHERE ${tables.room.code} = ${code}) as roomExists`,
// 	);
// 	return !!roomExists;
// }
