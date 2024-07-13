// @unocss-include
import VDialog from '~/components/V/VDialog.vue';
import BouncingText from '~/components/BouncingText.vue';

type IVDialog = InstanceType<typeof VDialog>;

let showModal: IVDialog['showModal'] | undefined;
let close: IVDialog['close'] | undefined;

const reconnectingText = h(BouncingText, { isBouncing: true, text: 'Attempting to reconnect' });

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
