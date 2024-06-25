import { randomUUID } from 'node:crypto';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const room = sqliteTable('room', {
	id: text('id').primaryKey().$defaultFn(() => randomUUID()),
	name: text('name').notNull(),
	hasStarted: integer('hasStarted', { mode: 'boolean' }).notNull(),
	createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
});
