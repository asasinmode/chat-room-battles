import { consola } from 'consola';
import { migrate } from 'drizzle-orm/d1/migrator';

export default defineNitroPlugin(async () => {
	if (!import.meta.dev) {
		return;
	}

	onHubReady(async () => {
		consola.withTag('db').info('running migrations');
		try {
			await migrate(useDrizzle(), { migrationsFolder: 'server/database/migrations' });
			consola.withTag('db').success('migrations finished');
		} catch (e) {
			consola.withTag('db').error('migrations failed', e);
		}
	});
});
