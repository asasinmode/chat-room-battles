import type { IClientRoom, IRoomWSResponse, IWSPayload } from '~~/types/room';

let ws: ReturnType<typeof useWebSocket>;

let hasDisconnected = false;
let openResolve: (() => void) | undefined;
let openReject: ((reason?: any) => void) | undefined;

const room = ref<IClientRoom>();
const hasGameStarted = ref(false);

export function useGameRoom(
	messageHandlers?: {
		[K in IRoomWSResponse['type']]: (data: Extract<IRoomWSResponse, { type: K }>['data']) => void;
	},
) {
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
				console.error('websockets closed with error', event);
				hasDisconnected = true;
				showStatus();
			},

			onConnected(_ws) {
				if (hasDisconnected) {
					hasDisconnected = false;
					closeStatus();
				} else {
					openResolve?.();
					openResolve = undefined;
					openReject = undefined;
				}
			},

			onError(_ws, event) {
				console.error('websocket error', event);
				if (!hasDisconnected) {
					openReject?.(new VError('failed to connect to the server', 'creating/joining room'));
					openResolve = undefined;
					openReject = undefined;
				}
			},
		});
	}

	return {
		send(data: IWSPayload) {
			ws.send(JSON.stringify(data));
		},
		close: ws.close,
		open: () => new Promise<void>((resolve, reject) => {
			openResolve = resolve;
			openReject = reject;
			ws.open();
		}),
		setRoom(data: IClientRoom) {
			room.value = data;
		},
		room,
		hasGameStarted,
	};
};
