// @unocss-include
import VDialog from '~/components/V/VDialog.vue';

type IVDialog = InstanceType<typeof VDialog>;

let showModal: IVDialog['showModal'] | undefined;
let close: IVDialog['close'] | undefined;

const reconnectingText = [
	h('span', { class: 'sr-only' }, 'Attempting to reconnect...'),
	...'Attemping to reconnect...'.split('').map((letter, index) => {
		const classes = ['wavy-letter-disconnected inline-block'];

		if (letter === ' ') {
			classes.push('w-1');
		} else if (letter === '.') {
			classes.push('wavy-dot');
		}

		return h('span', { 'key': index, 'class': classes, 'style': `--wave-index: ${index}`, 'aria-hidden': true }, letter);
	}),
];

const TheDisconnectedStatus = defineComponent(() => {
	const dialog = ref<IVDialog>();

	onMounted(() => {
		if (dialog.value) {
			showModal = dialog.value.showModal;
			close = dialog.value.close;
		}
	});

	return () =>
		h(
			VDialog,
			{
				ref: dialog,
				id: 'disconnectedStatus',
				title: 'Disconnected',
				onKeydown: (event: KeyboardEvent) => {
					event.code === 'Escape' && event.preventDefault();
				},
			},
			{
				default: () => [
					h('p', { class: 'text-center' }, reconnectingText),
				],
			},
		);
});

export function useDisconnectedStatus() {
	return {
		TheDisconnectedStatus,
		showStatus: () => showModal?.(),
		closeStatus: () => close?.(),
	};
}
