import { consola } from 'consola';
import { generateCode } from '~~/server/database/schema/lobby';

export default defineEventHandler(async (event) => {
	consola.withTag('lobby').debug('creating lobby');

	let code = generateCode();
	let generationCounter = 1;

	while (lobbyWithCodeExists(code)) {
		consola.withTag('lobby').debug(`duplicate code '${code}', iterations: ${generationCounter}`);

		if (generationCounter > 10) {
			consola.withTag('lobby').error(`code generation limit reached`);
			setResponseStatus(event, 508);
			return;
		}

		code = generateCode();
		generationCounter += 1;
	}

	const [lobby] = await useDrizzle()
		.insert(tables.lobby)
		.values({ code })
		.returning({
			id: tables.lobby.id,
			code: tables.lobby.code,
		});

	console.log('lobby', lobby);

	consola.withTag('lobby').debug(`generated lobby code after ${generationCounter} tries`);

	return lobby;
});

async function lobbyWithCodeExists(code: string): Promise<boolean> {
	const { lobbyExists } = await useDrizzle().get<{ lobbyExists: number }>(
		sql`SELECT EXISTS (SELECT 1 FROM ${tables.lobby} WHERE ${tables.lobby.code} = ${code}) as lobbyExists`,
	);
	return !!lobbyExists;
}
