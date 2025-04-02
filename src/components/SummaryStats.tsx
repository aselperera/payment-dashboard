import React from 'react';

export const SummaryStats: React.FC = () => {
	// Dummy data for summary statistics
	const stats = [
		{
			title: 'Total Revenue',
			value: '$12,345',
			change: '+12.3%',
			isPositive: true,
		},
		{
			title: 'Transactions',
			value: '1,234',
			change: '+5.3%',
			isPositive: true,
		},
		{
			title: 'Average Order',
			value: '$123',
			change: '-2.3%',
			isPositive: false,
		},
	];

	return (
		<>
			{stats.map((stat, index) => (
				<div key={index} className="bg-white p-6 rounded-lg shadow">
					<h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
					<p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
					<span
						className={`text-sm ${
							stat.isPositive ? 'text-green-600' : 'text-red-600'
						}`}
					>
						{stat.change}
					</span>
				</div>
			))}
		</>
	);
};
