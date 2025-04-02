'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const login = async (email: string, password: string): Promise<boolean> => {
		// This is a mock authentication - replace with real API call
		if (email === 'john.doe@gmail.com' && password === 'password') {
			setIsAuthenticated(true);
			// Store auth token in session storage
			sessionStorage.setItem('isAuthenticated', 'true');
			return true;
		}
		return false;
	};

	const logout = () => {
		setIsAuthenticated(false);
		sessionStorage.removeItem('isAuthenticated');
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
