import { randomUUID } from 'node:crypto';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const player = sqliteTable('player', {
	id: text('id').primaryKey().$defaultFn(() => randomUUID()),
	name: text('name').notNull(),
	createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
});
