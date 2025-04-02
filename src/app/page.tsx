'use client';

import { useAuth } from '@/context/AuthContext';
import { Dashboard } from '../components/Dashboard';
import { Login } from '../components/Login';

export default function Home() {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Login />;
	}

	return (
		<div className="min-h-screen bg-gray-100">
			<Dashboard />
		</div>
	);
}
