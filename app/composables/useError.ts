class VError extends Error {
	unrecoverable: boolean;

	constructor(message: string, unrecoverable = false) {
		super(message);
		this.unrecoverable = unrecoverable;
	}
}

const errors = ref<VError[]>([]);

export function useError() {
	return {
		errors,
		clear() {
			errors.value = [];
		},
		create(message: string, unrecoverable = false) {
			errors.value.push(new VError(message, unrecoverable));
		},
	};
}
