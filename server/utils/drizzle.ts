import { drizzle } from 'drizzle-orm/d1';

import { player } from '../database/schema/player';
import { lobby } from '../database/schema/lobby';

export { sql, eq, and, or } from 'drizzle-orm';

export const tables = {
	player,
	lobby,
};

export function useDrizzle() {
	return drizzle(hubDatabase(), { schema: tables });
}
