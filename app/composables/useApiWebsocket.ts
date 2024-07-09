export function useApiWebsocket<Payload, Response extends { type: string; data: any }>(
	url: string,
	messageHandlers: {
		[K in Response['type']]: (data: Extract<Response, { type: K }>['data']) => void;
	},
) {
	const { protocol, host } = useRequestURL();

	const ws = useWebSocket(`${protocol === 'https' ? 'wss' : 'ws'}://${host}/api/${url}`, {
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
	});

	return {
		send: (data: Payload) => {
			ws.send(JSON.stringify(data));
		},
		close: ws.close,
		open: ws.open,
	};
};
