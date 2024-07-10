export function useApiWebsocket<Payload, Response extends { type: string; data: any }>(
	url: string,
	messageHandlers: {
		[K in Response['type']]: (data: Extract<Response, { type: K }>['data']) => void;
	},
	reconnectCallback: () => void,
	connectCallback?: () => void,
) {
	const { protocol, host } = useRequestURL();
	const { showStatus, closeStatus } = useDisconnectedStatus();

	let hasDisconnected = false;

	const ws = useWebSocket(`${protocol === 'https' ? 'wss' : 'ws'}://${host}/api/${url}`, {
		immediate: false,
		// TMP uncomment later
		// heartbeat: {
		// 	interval: 5000,
		// 	pongTimeout: 5000
		// }
		onMessage(_ws, event) {
			const data: Response = JSON.parse(event.data);
			// @ts-expect-error types work fine
			messageHandlers[data.type]?.(data.data);
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
				reconnectCallback();
			} else {
				connectCallback?.();
			}
		},
	});

	return {
		send(data: Payload) {
			ws.send(JSON.stringify(data));
		},
		close: ws.close,
		open: ws.open,
	};
};
