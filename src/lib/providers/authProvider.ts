import { AuthProvider } from 'react-admin';

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
        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Invalid credentials');
            }

            const { token, user } = await response.json();
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error instanceof Error ? error : new Error('Network error'));
        }
    },

    logout: async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await fetch(`${apiUrl}/auth/logout`, {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }),
                });
            }
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return Promise.resolve();
        }
    },

    checkError: async (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) return Promise.reject();

        try {
            const response = await fetch(`${apiUrl}/auth/check`, {
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                }),
            });

            if (!response.ok) {
                throw new Error('Authentication failed');
            }

            return Promise.resolve();
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return Promise.reject(error);
        }
    },

    getPermissions: async () => {
        const token = localStorage.getItem('token');
        if (!token) return Promise.reject();

        try {
            const response = await fetch(`${apiUrl}/auth/permissions`, {
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get permissions');
            }

            const { permissions } = await response.json();
            return Promise.resolve(permissions);
        } catch (error) {
            return Promise.reject(error);
        }
    },

    getIdentity: async () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return Promise.resolve({
            id: user.id,
            fullName: user.username,
            avatar: user.avatar,
            role: user.role,
        });
    },
}; 