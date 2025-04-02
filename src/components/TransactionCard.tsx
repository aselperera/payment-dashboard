import React from 'react';

export const TransactionCard: React.FC = () => {
	return (
		<div className="bg-white rounded-lg shadow p-6">
			<h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
			<div className="space-y-4">
				<button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
					New Transaction
				</button>
				<button className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded hover:bg-gray-200">
					View Reports
				</button>
				<button className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded hover:bg-gray-200">
					Settings
				</button>
			</div>
		</div>
	);
};
