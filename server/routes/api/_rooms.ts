import consola from 'consola';

import type { IRoomWSPayload, IRoomWSResponse } from '~~/types/room';

export default defineWebSocketHandler({
	open(peer) {
		console.log('[ws] open', peer);
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

		let data: IRoomWSPayload;
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

		peer.send(JSON.stringify(handleMessage(data)));
	},

	close(peer, event) {
		console.log('[ws] close', peer, event);
	},

	error(peer, error) {
		console.log('[ws] error', peer, error);
	},
});

function handleMessage(data: IRoomWSPayload): IRoomWSResponse {
	switch (data.type) {
		case 'create':
			return {
				type: 'roomCreated',
				data: {
					code: 'CR3AT3D',
				},
			};
		case 'join':
			return {
				type: 'roomCreated',
				data: {
					code: 'J01N3D',
				},
			};
		default:
			consola.withTag('room ws').warn('unknown message type received', data);
			return data;
	}
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
