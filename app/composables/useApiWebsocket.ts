export function useApiWebsocket() {
	const { protocol, host } = useRequestURL();

	const ws = useWebSocket(`${protocol === 'https' ? 'wss' : 'ws'}://${host}/_ws`, {
		// TMP
		// heartbeat: {
		// 	message: 'ping',
		// },
		// TODO toast successfully reconnected if previously disconnected
		onConnected: (ws) => {
			console.log('connected', ws);
		},
		// TODO toast something wrong with connection
		onError: (ws, ev) => {
			console.log('errored', ws, ev);
		},
		// TODO probably custom reconnect instead of builtin one to show toast instantly on connection loss
		// also can do it in increments, like 3, 5, 15
		onDisconnected: (ws, ev) => {
			console.log('disconnected', ws, ev);
		},
		// TODO globally provide adding callbacks for specific messages, handle reconnects, return callback to be called on unmount?
		onMessage: (ws, ev) => {
			console.log('got message', ws, ev);
		},
	});

	return ws;
};
