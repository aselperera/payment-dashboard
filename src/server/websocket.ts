import { WebSocketServer } from 'ws';
import { transactions as initialTransactions } from '../utils/api';

const wss = new WebSocketServer({ port: 8080 });

// Create a local copy of transactions for this WebSocket instance
let transactions = [...initialTransactions];

wss.on('connection', (ws) => {
	console.log('Client connected');

	// Send initial transactions
	ws.send(
		JSON.stringify({
			type: 'transactions',
			data: transactions,
		})
	);

	// Simulate new transactions every 10 seconds
	const interval = setInterval(() => {
		const newTransaction = {
			id: Math.random().toString(36).substr(2, 9),
			amount: Math.random() * 1000,
			date: new Date().toISOString(),
			status: ['completed', 'pending', 'failed'][
				Math.floor(Math.random() * 3)
			] as 'completed' | 'pending' | 'failed',
			customerName: 'New Customer',
		};

		// Create a new array with the new transaction
		transactions = [...transactions, newTransaction];

		ws.send(
			JSON.stringify({
				type: 'transactions',
				data: transactions,
			})
		);
	}, 10000);

	ws.on('close', () => {
		clearInterval(interval);
		console.log('Client disconnected');
	});
});
