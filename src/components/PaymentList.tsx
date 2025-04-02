import React from 'react';

export const PaymentList: React.FC = () => {
	const payments = [
		{
			id: 1,
			customer: 'John Doe',
			amount: '$123.45',
			status: 'Completed',
			date: '2024-04-02',
		},
		// Add more payment data as needed
	];

	return (
		<div className="bg-white rounded-lg shadow">
			<div className="p-6">
				<h2 className="text-xl font-bold text-gray-800 mb-4">
					Recent Payments
				</h2>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b">
								<th className="text-left py-3">Customer</th>
								<th className="text-left py-3">Amount</th>
								<th className="text-left py-3">Status</th>
								<th className="text-left py-3">Date</th>
							</tr>
						</thead>
						<tbody>
							{payments.map((payment) => (
								<tr key={payment.id} className="border-b">
									<td className="py-3">{payment.customer}</td>
									<td className="py-3">{payment.amount}</td>
									<td className="py-3">{payment.status}</td>
									<td className="py-3">{payment.date}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
