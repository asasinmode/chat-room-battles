import { randomUUID } from 'node:crypto';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const lobby = sqliteTable('lobby', {
	id: text('id').primaryKey().$defaultFn(() => randomUUID()),
	name: text('name').notNull(),
	code: text('code').notNull(),
	startedAt: integer('startedAt', { mode: 'timestamp' }),
	finishedAt: integer('finishedAt', { mode: 'timestamp' }),
	createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
});
