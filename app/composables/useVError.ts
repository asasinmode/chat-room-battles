// @unocss-include
import { FetchError } from 'ofetch';
import VDialog from '~/components/V/VDialog.vue';
import type { IErrorCode } from '~~/types/error';

interface IError {
	message: string;
	prefix?: string;
	unrecoverable?: boolean;
}

export class VError extends Error implements IError {
	prefix?: string;
	unrecoverable?: boolean;

	constructor(message: string, prefix?: string, unrecoverable?: boolean) {
		super(message);
		this.prefix = prefix;
		this.unrecoverable = unrecoverable;
	}
}

const errors = ref<VError[]>([]);
const errorCodesToData: Record<IErrorCode, IError> = {
	roomCodeGenerationLimitReached: { message: 'code generation limit reached' },
};
const unknownError = new VError('unknown error', undefined, true);

let open: (() => void) | undefined;

function create(message: string, prefix?: string, unrecoverable = false) {
	errors.value.push(new VError(message, prefix, unrecoverable));
	open?.();
}

function handle(
	prefix: string,
	error: unknown,
	errorResponseHandlers: Record<number, (body: any) => void> = {},
) {
	console.error(error);
	if (error instanceof FetchError) {
		if (error.statusCode && error.statusCode in errorResponseHandlers) {
			errorResponseHandlers[error.statusCode]?.(error.data);
			return;
		}

		const knownError = errorCodesToData[error.data as IErrorCode];
		if (knownError) {
			errors.value.push(new VError(knownError.message, prefix, knownError.unrecoverable));
		} else {
			errors.value.push(unknownError);
		}
	} else if (error instanceof VError) {
		errors.value.push(error);
	} else {
		errors.value.push(unknownError);
	}
	open?.();
}

const ErrorDialog = defineComponent(() => {
	const router = useRouter();

	const dialog = ref<InstanceType<typeof VDialog>>();
	const anyUnrecoverable = computed(() => errors.value.some(e => e.unrecoverable));

	onErrorCaptured((error) => {
		create(error.message, undefined, true);
		dialog.value?.showModal();
	});

	onMounted(() => {
		open = dialog.value?.showModal;
	});

	function closeDialog() {
		dialog.value?.close();
		if (anyUnrecoverable.value) {
			router.go(0);
		}
		errors.value = [];
	}

	return () =>
		h(
			VDialog,
			{
				ref: dialog,
				id: 'error',
				title: 'Something went wrong 😓',
				class: 'text-center',
				onKeydown: (event: KeyboardEvent) => {
					if (event.code === 'Escape') {
						event.preventDefault();
						closeDialog();
					}
				},
			},
			{
				default: () => [
					h(
						'p',
						{ class: 'mb-4 leading-snug -mt-2' },
						[...(anyUnrecoverable.value ? ['Chat room Battles has most likely broken', h('br')] : []), 'Below is the list of errors and all we know about them'],
					),
					h(
						'ul',
						{ class: 'mb-4 flex flex-col list-disc gap-2 pl-4 text-start' },
						errors.value.map(({ message, prefix }, index) => h('li', { key: index, class: 'leading-snug' }, prefix ? [h('b', {}, prefix), `: ${message}`] : message),
						),
					),
					h(
						'button',
						{ class: 'mx-auto w-fit button-red-5 dark:bg-red-7 hoverable:bg-red-7 dark:hoverable:bg-red-6', onClick: () => closeDialog() },
						anyUnrecoverable.value ? 'refresh' : 'close',
					),
				],
			},
		);
});

export function useVError() {
	return {
		create,
		handle,
		ErrorDialog,
	};
}
