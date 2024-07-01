import { consola } from 'consola';

export default defineTask({
	meta: {
		name: 'db:drop',
		description: 'drop database',
	},
	async run() {
		consola.withTag('db').info('dropping database');
		try {
			const db = hubDatabase();
			// TODO read from db, check if works
			const tables = ['room', 'player'];

			await db.batch([
				db.prepare('SET FOREIGN_KEY_CHECKS = 0'),
				...tables.map(table => db.prepare(`DROP TABLE ${table}`)),
				db.prepare('SET FOREIGN_KEY_CHECKS = 1'),
			]);

			consola.withTag('db').success('dropping finished');
			return { result: 'success' };
		} catch (e) {
			consola.withTag('db').error('dropping failed', e);
			return { result: 'failure' };
		}
	},
});
