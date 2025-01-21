import { AuthProvider } from 'ra-core';
import { signIn, signOut, getSession } from 'next-auth/react';

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
        const result = await signIn('credentials', {
            username,
            password,
            redirect: false,
        });

        if (result?.error) {
            throw new Error(result.error);
        }
    },

    logout: async () => {
        await signOut({ redirect: false });
        return Promise.resolve();
    },

    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            return Promise.reject();
        }
        return Promise.resolve();
    },

    checkAuth: async () => {
        const session = await getSession();
        return session ? Promise.resolve() : Promise.reject();
    },

    getPermissions: async () => {
        const session = await getSession();
        return session?.user?.role ? Promise.resolve(session.user.role) : Promise.reject();
    },

    getIdentity: async () => {
        const session = await getSession();
        if (!session?.user) {
            throw new Error('No user session found');
        }

        return Promise.resolve({
            id: session.user.id || '0',
            fullName: session.user.name || 'Unknown',
            avatar: session.user.image,
        });
    },
}; 