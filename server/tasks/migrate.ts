import { migrate } from 'drizzle-orm/d1/migrator';
import { consola } from 'consola';

export default defineTask({
	meta: {
		name: 'db:migrate',
		description: 'run database migrations',
	},
	async run() {
		consola.withTag('db').info('running migrations');
		try {
			await migrate(useDrizzle(), { migrationsFolder: 'server/database/migrations' });
			consola.withTag('db').success('migrations finished');
			return { result: 'success' };
		} catch (e) {
			consola.withTag('db').error('migrations failed', e);
			return { result: 'failure' };
		}
	},
});
