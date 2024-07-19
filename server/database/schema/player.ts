import { randomUUID } from 'node:crypto';
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const player = sqliteTable('player', {
	id: text('id').primaryKey().$defaultFn(() => randomUUID()),
	name: text('name').notNull(),
	createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});
