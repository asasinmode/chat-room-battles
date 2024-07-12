import consola from 'consola';
import { getColor } from 'consola/utils';

export class VError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

export function logIdentifiers(primary: string | number, secondary: string | number) {
	return `${getColor('cyan')(primary)} ${getColor('gray')(`(${secondary})`)}`;
}

export const roomLogger = consola.withTag('room');
