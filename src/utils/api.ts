export interface Transaction {
	id: string;
	amount: number;
	date: string;
	status: 'completed' | 'pending' | 'failed';
	customerName: string;
}

interface LoginResponse {
	token: string;
	user: {
		id: string;
		email: string;
		name: string;
	};
}

// Mock data
export const transactions: Transaction[] = [
	{
		id: '1',
		amount: 125.5,
		date: '2024-04-02',
		status: 'completed',
		customerName: 'John Doe',
	},
	// Add more mock transactions as needed
];

export const mockApi = {
	login: async (
		email: string,
		password: string
	): Promise<LoginResponse | null> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		if (email === 'john@gmail.com' && password === 'password') {
			return {
				token: 'mock-jwt-token',
				user: {
					id: '1',
					email: 'demo@example.com',
					name: 'Demo User',
				},
			};
		}
		return null;
	},

	getTransactions: async (): Promise<Transaction[]> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 500));
		return transactions;
	},
};
