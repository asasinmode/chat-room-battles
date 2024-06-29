export default defineEventHandler(async () => {
	console.log('creating lobby');

	const code = generateCode();
	const a = (await useDrizzle().get<{ isExists: boolean }>(sql`SELECT EXISTS (SELECT 1 FROM ${tables.lobby} WHERE ${tables.lobby.id} = '${code}') as isExists`));

	console.log('does lobby with code', code, 'exist', a);

	return code;
});

const codeCharacters = 'ABCDEFGHIJKLMNOQPRSTUWXYZ0123456789';

function generateCode() {
	let code = '';
	for (let i = 0; i < 5; i++) {
		code += codeCharacters[Math.floor(Math.random() * codeCharacters.length)];
	}
	return code;
}
