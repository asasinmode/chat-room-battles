import { consola } from 'consola';
import { migrate } from 'drizzle-orm/d1/migrator';

export default defineNitroPlugin(() => {
	import.meta.dev && onHubReady(async () => {
		consola.withTag('db').info('running migrations');
		await migrate(useDrizzle(), { migrationsFolder: 'server/database/migrations' })
			.then(() => consola.withTag('db').success('migrations finished'))
			.catch(e => consola.withTag('db').error('migrations failed', e));
	});
});
