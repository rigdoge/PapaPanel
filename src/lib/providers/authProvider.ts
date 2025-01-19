import { AuthProvider } from 'react-admin';

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
    login: ({ username, password }) => {
        // 在模拟数据中查找用户
        const user = mockUsers.find(
            u => u.username === username && u.password === password
        );

        if (!user) {
            return Promise.reject(new Error('Invalid credentials'));
        }

        // 存储用户信息（不包含密码）
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('token', 'mock-token');
        
        return Promise.resolve();
    },

    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return Promise.resolve();
    },

    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    checkAuth: () => {
        const user = localStorage.getItem('user');
        return user ? Promise.resolve() : Promise.reject();
    },

    getPermissions: () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return Promise.resolve(user.role);
    },

    getIdentity: () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return Promise.resolve({
            id: user.id,
            fullName: user.username,
            avatar: undefined,
            role: user.role,
        });
    },
}; 