import React, { useEffect, useState } from 'react';
import { Transaction } from '../utils/api';
import { websocketService } from '../utils/websocket';
import { SummaryStats } from './SummaryStats';
import { PaymentList } from './PaymentList';
import { TransactionCard } from './TransactionCard';

export const Dashboard: React.FC = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Subscribe to WebSocket updates
		const unsubscribe = websocketService.subscribe((newTransactions) => {
			setTransactions(newTransactions);
			setIsLoading(false);
		});

		// Cleanup on unmount
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<div className="p-6 bg-gray-100 min-h-screen">
			<header className="mb-8">
				<h1 className="text-3xl font-bold text-gray-800">Payment Dashboard</h1>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<SummaryStats />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2">
					<PaymentList transactions={transactions} />
				</div>
				<div>
					<TransactionCard />
				</div>
			</div>
		</div>
	);
};
