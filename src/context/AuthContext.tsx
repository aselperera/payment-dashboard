'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { mockApi } from '../utils/api';

interface AuthContextType {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: { name: string; email: string } | null;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState<{ name: string; email: string } | null>(
		null
	);

	const login = async (email: string, password: string): Promise<boolean> => {
		setIsLoading(true);
		try {
			const response = await mockApi.login(email, password);
			if (response) {
				setIsAuthenticated(true);
				setUser({
					name: response.user.name,
					email: response.user.email,
				});
				sessionStorage.setItem('auth_token', response.token);
				return true;
			}
			return false;
		} catch (error) {
			console.error('Login error:', error);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		setIsAuthenticated(false);
		setUser(null);
		sessionStorage.removeItem('auth_token');
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, isLoading, user, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
