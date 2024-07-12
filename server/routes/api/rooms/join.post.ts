export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	console.log('joining room', body);

	return `joining ${body}`;
});
