import { randomUUID } from 'node:crypto';
import { getColor } from 'consola/utils';
import { generateCode } from '~~/server/database/schema/room';
import type { IServerRoom } from '~~/types/room';

class RoomManager {
	rooms: IServerRoom[];

	constructor() {
		this.rooms = [];
	}

	/**
	 * @throws Throws if creating room fails
	 */
	async createRoom(): Promise<IServerRoom> {
		const code = await this.createRoomCode();

		const room: IServerRoom = {
			id: randomUUID(),
			code,
			name: 'Party Animals',
			connectedPlayers: [],
		};

		this.rooms.push(room);
		roomLogger.debug(`created room ${logIdentifiers(room.name, `${room.id}, ${room.code}`)}`);

		return room;
	}

	/**
	 * @throws Throws if creating new code fails 10 times
	 */
	async createRoomCode(): Promise<string> {
		let code = generateCode();
		let generationCounter = 1;

		while (await this.roomWithCodeExists(code)) {
			roomLogger.debug(`duplicate code generated ${getColor('cyan')(code)}, iterations: ${getColor('yellow')(generationCounter)}`);

			if (generationCounter > 10) {
				roomLogger.debug(`code generation limit reached`);
				throw new VError('roomCodeGenerationLimitReached', 508);
			}

			code = generateCode();
			generationCounter += 1;
		}

		return code;
	}

	async roomWithCodeExists(code: string): Promise<boolean> {
		return this.rooms.some(r => r.code === code);
		// const { roomExists } = await useDrizzle().get<{ roomExists: number }>(
		// 	sql`SELECT EXISTS (SELECT 1 FROM ${tables.room} WHERE ${tables.room.code} = ${code}) as roomExists`,
		// );
		// return !!roomExists;
	}
}

const roomManager = new RoomManager();

export function useRoomManager() {
	return roomManager;
}
