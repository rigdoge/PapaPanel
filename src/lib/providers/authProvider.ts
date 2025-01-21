import { AuthProvider } from 'ra-core';

// 使用当前窗口的 origin 作为 API URL 的基础
const apiUrl = typeof window !== 'undefined' 
    ? window.location.origin + '/api'
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// 模拟用户数据
const mockUsers = [
    {
        id: 1,
        username: 'admin',
        password: 'admin',
        role: 'admin',
        email: 'admin@example.com',
    },
    {
        id: 2,
        username: 'devops',
        password: 'devops',
        role: 'devops',
        email: 'devops@example.com',
    },
    {
        id: 3,
        username: 'developer',
        password: 'developer',
        role: 'developer',
        email: 'developer@example.com',
    },
];

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const { token } = await response.json();
        localStorage.setItem('token', token);
    },

    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },

    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    checkAuth: () => {
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    },

    getPermissions: () => {
        const token = localStorage.getItem('token');
        if (!token) return Promise.reject();
        return Promise.resolve();
    },

    getIdentity: async () => {
        const response = await fetch('/api/auth/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get user identity');
        }

        const user = await response.json();
        return Promise.resolve({
            id: user.id,
            fullName: user.username,
        });
    },
}; 