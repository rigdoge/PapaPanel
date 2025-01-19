import { DataProvider } from 'react-admin';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// 模拟数据
const mockData = {
    users: [
        {
            id: 1,
            username: 'admin',
            email: 'admin@example.com',
            role: 'admin',
            is_active: true,
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
        },
        {
            id: 2,
            username: 'devops',
            email: 'devops@example.com',
            role: 'devops',
            is_active: true,
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
        },
        {
            id: 3,
            username: 'developer',
            email: 'developer@example.com',
            role: 'developer',
            is_active: true,
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
        }
    ],
};

export const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        // 如果是用户资源，使用模拟数据
        if (resource === 'users') {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const { filter } = params;

            let items = mockData.users;

            // 处理筛选
            if (filter) {
                items = items.filter(item => {
                    return Object.keys(filter).every(key => {
                        if (key === 'q') {
                            const searchStr = filter[key].toLowerCase();
                            return Object.values(item).some(
                                value => value && value.toString().toLowerCase().includes(searchStr)
                            );
                        }
                        return item[key] === filter[key];
                    });
                });
            }

            // 处理排序
            items = [...items].sort((a, b) => {
                if (order === 'ASC') {
                    return a[field] > b[field] ? 1 : -1;
                } else {
                    return a[field] < b[field] ? 1 : -1;
                }
            });

            // 处理分页
            const start = (page - 1) * perPage;
            const end = page * perPage;
            const paginatedItems = items.slice(start, end);

            return Promise.resolve({
                data: paginatedItems,
                total: items.length,
            });
        }

        // 其他资源使用 API
        const query = {
            sort: JSON.stringify([params.sort.field, params.sort.order]),
            range: JSON.stringify([(params.pagination.page - 1) * params.pagination.perPage, params.pagination.page * params.pagination.perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = new URL(`${apiUrl}/${resource}`);
        Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));

        const token = localStorage.getItem('token');
        const response = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await response.json();
        return {
            data: json.data,
            total: json.total,
        };
    },

    getOne: async (resource, params) => {
        // 如果是用户资源，使用模拟数据
        if (resource === 'users') {
            const user = mockData.users.find(u => u.id === Number(params.id));
            return Promise.resolve({
                data: user || { id: params.id },
            });
        }

        // 其他资源使用 API
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl}/${resource}/${params.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await response.json();
        return {
            data: json,
        };
    },

    getMany: async (resource, params) => {
        // 如果是用户资源，使用模拟数据
        if (resource === 'users') {
            const users = mockData.users.filter(u => params.ids.includes(u.id));
            return Promise.resolve({
                data: users,
            });
        }

        // 其他资源使用 API
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = new URL(`${apiUrl}/${resource}`);
        Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));

        const token = localStorage.getItem('token');
        const response = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await response.json();
        return {
            data: json,
        };
    },

    getManyReference: async (resource, params) => {
        // 如果是用户资源，使用模拟数据
        if (resource === 'users') {
            const { page, perPage } = params.pagination;
            const items = mockData.users
                .filter(item => item[params.target] === params.id)
                .slice((page - 1) * perPage, page * perPage);
            
            return Promise.resolve({
                data: items,
                total: items.length,
            });
        }

        // 其他资源使用 API
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = new URL(`${apiUrl}/${resource}`);
        Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));

        const token = localStorage.getItem('token');
        const response = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await response.json();
        return {
            data: json.data,
            total: json.total,
        };
    },

    create: async (resource, params) => {
        // 如果是用户资源，使用模拟数据
        if (resource === 'users') {
            const newId = Math.max(0, ...mockData.users.map(u => u.id)) + 1;
            const newUser = {
                ...params.data,
                id: newId,
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString(),
            };
            mockData.users.push(newUser);
            return Promise.resolve({
                data: newUser,
            });
        }

        // 其他资源使用 API
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await response.json();
        return {
            data: { ...params.data, id: json.id },
        };
    },

    update: async (resource, params) => {
        // 如果是用户资源，使用模拟数据
        if (resource === 'users') {
            const index = mockData.users.findIndex(u => u.id === Number(params.id));
            if (index === -1) return Promise.reject();
            const updatedUser = { ...mockData.users[index], ...params.data };
            mockData.users[index] = updatedUser;
            return Promise.resolve({
                data: updatedUser,
            });
        }

        // 其他资源使用 API
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await response.json();
        return {
            data: json,
        };
    },

    updateMany: async (resource, params) => {
        // 如果是用户资源，使用模拟数据
        if (resource === 'users') {
            const updatedUsers = mockData.users.map(user =>
                params.ids.includes(user.id) ? { ...user, ...params.data } : user
            );
            mockData.users = updatedUsers;
            return Promise.resolve({
                data: params.ids,
            });
        }

        // 其他资源使用 API
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl}/${resource}`, {
            method: 'PUT',
            body: JSON.stringify({ ids: params.ids, data: params.data }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await response.json();
        return {
            data: json,
        };
    },

    delete: async (resource, params) => {
        // 如果是用户资源，使用模拟数据
        if (resource === 'users') {
            const index = mockData.users.findIndex(u => u.id === Number(params.id));
            if (index === -1) return Promise.reject();
            const deletedUser = mockData.users[index];
            mockData.users = [
                ...mockData.users.slice(0, index),
                ...mockData.users.slice(index + 1),
            ];
            return Promise.resolve({
                data: deletedUser,
            });
        }

        // 其他资源使用 API
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await response.json();
        return {
            data: json,
        };
    },

    deleteMany: async (resource, params) => {
        // 如果是用户资源，使用模拟数据
        if (resource === 'users') {
            const deletedUsers = mockData.users.filter(u => params.ids.includes(u.id));
            mockData.users = mockData.users.filter(u => !params.ids.includes(u.id));
            return Promise.resolve({
                data: deletedUsers,
            });
        }

        // 其他资源使用 API
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl}/${resource}`, {
            method: 'DELETE',
            body: JSON.stringify({ ids: params.ids }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await response.json();
        return {
            data: json,
        };
    },
}; 