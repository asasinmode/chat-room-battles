import { drizzle } from 'drizzle-orm/d1';

import { player } from '../database/schema/player';
import { room } from '../database/schema/room';

export { sql, eq, and, or } from 'drizzle-orm';

export const tables = {
	player,
	room,
};

// TODO https://hub.nuxt.com/docs/recipes/drizzle#npm-run-dbgenerate
export function useDrizzle() {
	return drizzle(hubDatabase(), { schema: tables });
}
