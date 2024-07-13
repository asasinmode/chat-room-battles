import type { IClientRoom, IRoomWSResponse, IWSPayload } from '~~/types/room';

let ws: ReturnType<typeof useWebSocket>;
const room = ref<IClientRoom>();
const hasGameStarted = ref(false);

export function useGameRoom(
	messageHandlers?: {
		[K in IRoomWSResponse['type']]: (data: Extract<IRoomWSResponse, { type: K }>['data']) => void;
	},
) {
	let hasDisconnected = false;

	if (!ws) {
		const { protocol, host } = useRequestURL();
		const { showStatus, closeStatus } = useDisconnectedStatus();

		ws = useWebSocket(`${protocol === 'https' ? 'wss' : 'ws'}://${host}/api/rooms/ws`, {
			immediate: false,
			// TMP uncomment later
			// heartbeat: {
			// 	interval: 5000,
			// 	pongTimeout: 5000
			// }
			onMessage(_ws, event) {
				const data: Response = JSON.parse(event.data);
				// @ts-expect-error types work fine
				messageHandlers?.[data.type]?.(data.data);
			},

			// TODO handle disconnecting and errors showing
			onDisconnected(_ws, event) {
				if (event.code === 1000) {
					return;
				}
				console.error('websockets closed with error');
				console.error(event);
				hasDisconnected = true;
				showStatus();
			},

			onConnected(_ws) {
				if (hasDisconnected) {
					hasDisconnected = false;
					closeStatus();
				}
			},
		});
	}

	return {
		send(data: IWSPayload) {
			ws.send(JSON.stringify(data));
		},
		close: ws.close,
		open: ws.open,
		setRoom(data: IClientRoom) {
			room.value = data;
		},
		room,
		hasGameStarted,
	};
};
