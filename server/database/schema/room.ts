import { randomUUID } from 'node:crypto';
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const room = sqliteTable('room', {
	id: text('id').primaryKey().$defaultFn(randomUUID),
	name: text('name').notNull().$defaultFn(() => 'Party Animals'),
	code: text('code').notNull().$defaultFn(generateCode),
	startedAt: integer('startedAt', { mode: 'timestamp' }),
	finishedAt: integer('finishedAt', { mode: 'timestamp' }),
	createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().default(sql`NOW()`),
});

const codeCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generateCode(): string {
	let code = '';
	for (let i = 0; i < 5; i++) {
		code += codeCharacters[Math.floor(Math.random() * codeCharacters.length)];
	}
	return code;
}
