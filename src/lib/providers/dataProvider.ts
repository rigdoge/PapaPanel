import { DataProvider, RaRecord, Identifier, GetListResult, GetOneResult, GetManyResult, GetManyReferenceResult, CreateResult, UpdateResult, DeleteResult } from 'react-admin';

interface User extends RaRecord {
  username: string;
  email: string;
  password: string;
  role: string;
  department: string;
  position: string;
  phone: string;
  is_active: boolean;
  created_at: string;
  last_login: string;
}

interface Server extends RaRecord {
  name: string;
  ip: string;
  status: string;
  os: string;
  cpu: string;
  memory: string;
  disk: string;
  created_at: string;
  updated_at: string;
}

interface Site extends RaRecord {
  name: string;
  domain: string;
  status: string;
  server_id: number;
  php_version: string;
  created_at: string;
  updated_at: string;
}

interface Backup extends RaRecord {
  name: string;
  type: string;
  status: string;
  size: string;
  site_id: number;
  created_at: string;
}

interface Monitoring extends RaRecord {
  name: string;
  type: string;
  status: string;
  target_id: number;
  target_type: string;
  last_check: string;
  next_check: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// 模拟数据
const mockData = {
    users: [
        {
            id: 1,
            username: 'admin',
            password: 'admin',
            email: 'admin@example.com',
            role: 'admin',
            department: '技术部',
            position: '系统管理员',
            phone: '13800138000',
            is_active: true,
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
        },
        {
            id: 2,
            username: 'devops',
            password: 'devops',
            email: 'devops@example.com',
            role: 'devops',
            department: '运维部',
            position: '运维工程师',
            phone: '13800138001',
            is_active: true,
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
        },
        {
            id: 3,
            username: 'developer',
            password: 'developer',
            email: 'developer@example.com',
            role: 'developer',
            department: '研发部',
            position: '开发工程师',
            phone: '13800138002',
            is_active: true,
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
        }
    ] as User[],
    servers: [
        {
            id: 1,
            name: 'Web Server 1',
            ip: '192.168.1.100',
            status: 'running',
            os: 'Ubuntu 22.04 LTS',
            cpu: '4 cores',
            memory: '8GB',
            disk: '100GB',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
    ] as Server[],
    sites: [
        {
            id: 1,
            name: 'Example Site',
            domain: 'example.com',
            status: 'running',
            server_id: 1,
            php_version: '8.2',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
    ] as Site[],
    backups: [
        {
            id: 1,
            name: 'Daily Backup',
            type: 'full',
            status: 'completed',
            size: '1.2GB',
            site_id: 1,
            created_at: new Date().toISOString(),
        }
    ] as Backup[],
    monitoring: [
        {
            id: 1,
            name: 'HTTP Check',
            type: 'http',
            status: 'up',
            target_id: 1,
            target_type: 'site',
            last_check: new Date().toISOString(),
            next_check: new Date(Date.now() + 300000).toISOString(),
        }
    ] as Monitoring[],
};

type ResourceType = {
    users: User;
    servers: Server;
    sites: Site;
    backups: Backup;
    monitoring: Monitoring;
};

export const dataProvider: DataProvider = {
    getList: async <RecordType extends RaRecord>(resource: string, params: any): Promise<GetListResult<RecordType>> => {
        if (resource in mockData) {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const { filter } = params;

            let items = mockData[resource as keyof typeof mockData];

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
                        return (item as any)[key] === filter[key];
                    });
                });
            }

            // 处理排序
            items = [...items].sort((a, b) => {
                if (order === 'ASC') {
                    return (a as any)[field] > (b as any)[field] ? 1 : -1;
                } else {
                    return (a as any)[field] < (b as any)[field] ? 1 : -1;
                }
            });

            // 处理分页
            const start = (page - 1) * perPage;
            const end = page * perPage;
            const paginatedItems = items.slice(start, end);

            return {
                data: paginatedItems as unknown as RecordType[],
                total: items.length,
            };
        }

        throw new Error(`Unknown resource: ${resource}`);
    },

    getOne: async <RecordType extends RaRecord>(resource: string, params: any): Promise<GetOneResult<RecordType>> => {
        if (resource in mockData) {
            const items = mockData[resource as keyof typeof mockData];
            const item = items.find(i => i.id === Number(params.id));
            if (!item) throw new Error(`${resource} not found: ${params.id}`);
            return { data: item as unknown as RecordType };
        }

        throw new Error(`Unknown resource: ${resource}`);
    },

    getMany: async <RecordType extends RaRecord>(resource: string, params: any): Promise<GetManyResult<RecordType>> => {
        if (resource in mockData) {
            const items = mockData[resource as keyof typeof mockData];
            const filteredItems = items.filter(i => params.ids.includes(i.id));
            return { data: filteredItems as unknown as RecordType[] };
        }

        throw new Error(`Unknown resource: ${resource}`);
    },

    getManyReference: async <RecordType extends RaRecord>(resource: string, params: any): Promise<GetManyReferenceResult<RecordType>> => {
        if (resource in mockData) {
            const { page, perPage } = params.pagination;
            const items = mockData[resource as keyof typeof mockData]
                .filter(item => (item as any)[params.target] === params.id)
                .slice((page - 1) * perPage, page * perPage);
            
            return {
                data: items as unknown as RecordType[],
                total: items.length,
            };
        }

        throw new Error(`Unknown resource: ${resource}`);
    },

    create: async <RecordType extends Omit<RaRecord, "id">>(resource: string, params: any): Promise<CreateResult<RecordType & { id: Identifier }>> => {
        if (resource in mockData) {
            const items = mockData[resource as keyof typeof mockData];
            const newId = Math.max(0, ...items.map(i => Number(i.id))) + 1;
            const newItem = {
                ...params.data,
                id: newId,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            items.push(newItem as any);
            return { data: newItem as unknown as RecordType & { id: Identifier } };
        }

        throw new Error(`Unknown resource: ${resource}`);
    },

    update: async <RecordType extends RaRecord>(resource: string, params: any): Promise<UpdateResult<RecordType>> => {
        if (resource in mockData) {
            const items = mockData[resource as keyof typeof mockData];
            const index = items.findIndex(i => i.id === Number(params.id));
            if (index === -1) throw new Error(`${resource} not found: ${params.id}`);
            const updatedItem = { 
                ...items[index], 
                ...params.data,
                updated_at: new Date().toISOString(),
            };
            items[index] = updatedItem as any;
            return { data: updatedItem as unknown as RecordType };
        }

        throw new Error(`Unknown resource: ${resource}`);
    },

    updateMany: async <RecordType extends RaRecord>(resource: string, params: any): Promise<{ data: Identifier[] }> => {
        if (resource in mockData) {
            const items = mockData[resource as keyof typeof mockData];
            const updates = items.map(item => {
                if (params.ids.includes(item.id)) {
                    return { 
                        ...item, 
                        ...params.data,
                        updated_at: new Date().toISOString(),
                    };
                }
                return item;
            });
            items.splice(0, items.length, ...(updates as any));
            return { data: params.ids };
        }

        throw new Error(`Unknown resource: ${resource}`);
    },

    delete: async <RecordType extends RaRecord>(resource: string, params: any): Promise<DeleteResult<RecordType>> => {
        if (resource in mockData) {
            const items = mockData[resource as keyof typeof mockData];
            const index = items.findIndex(i => i.id === Number(params.id));
            if (index === -1) throw new Error(`${resource} not found: ${params.id}`);
            const [deletedItem] = items.splice(index, 1);
            return { data: deletedItem as unknown as RecordType };
        }

        throw new Error(`Unknown resource: ${resource}`);
    },

    deleteMany: async (resource: string, params: any): Promise<{ data: Identifier[] }> => {
        if (resource in mockData) {
            const items = mockData[resource as keyof typeof mockData];
            const remaining = items.filter(i => !params.ids.includes(i.id));
            items.splice(0, items.length, ...(remaining as any));
            return { data: params.ids };
        }

        throw new Error(`Unknown resource: ${resource}`);
    },
}; 