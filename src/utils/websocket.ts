import { Transaction } from './api';

type WebSocketMessage = {
	type: 'transactions' | 'error';
	data: Transaction[] | string;
};

export class WebSocketService {
	private ws: WebSocket | null = null;
	private reconnectAttempts = 0;
	private maxReconnectAttempts = 5;
	private listeners: ((transactions: Transaction[]) => void)[] = [];

	constructor() {
		this.connect();
	}

	private connect() {
		// In production, use wss:// for secure WebSocket connection
		this.ws = new WebSocket('ws://localhost:8080');

		this.ws.onopen = () => {
			console.log('WebSocket connected');
			this.reconnectAttempts = 0;
		};

		this.ws.onmessage = (event) => {
			try {
				const message: WebSocketMessage = JSON.parse(event.data);
				if (message.type === 'transactions' && Array.isArray(message.data)) {
					this.notifyListeners(message.data as Transaction[]);
				}
			} catch (error) {
				console.error('WebSocket message error:', error);
			}
		};

		this.ws.onclose = () => {
			console.log('WebSocket disconnected');
			this.attemptReconnect();
		};

		this.ws.onerror = (error) => {
			console.error('WebSocket error:', error);
		};
	}

	private attemptReconnect() {
		if (this.reconnectAttempts < this.maxReconnectAttempts) {
			this.reconnectAttempts++;
			setTimeout(() => this.connect(), 5000 * this.reconnectAttempts);
		}
	}

	public subscribe(callback: (transactions: Transaction[]) => void) {
		this.listeners.push(callback);
		return () => {
			this.listeners = this.listeners.filter(
				(listener) => listener !== callback
			);
		};
	}

	private notifyListeners(transactions: Transaction[]) {
		this.listeners.forEach((listener) => listener(transactions));
	}

	public disconnect() {
		if (this.ws) {
			this.ws.close();
		}
	}
}

export const websocketService = new WebSocketService();
