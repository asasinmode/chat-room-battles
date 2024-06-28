export default defineEventHandler((event) => {
	const code = getRouterParam(event, 'code');

	return code;
});
