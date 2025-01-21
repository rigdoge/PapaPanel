import { DataProvider } from 'ra-core';
import { mockUsers } from '../mockData';

interface BaseRecord {
  id: number;
  [key: string]: any;
}

interface User extends BaseRecord {
  username: string;
  email: string;
  password: string;
  role: string;
  department?: string;
  position?: string;
  phone?: string;
  is_active: boolean;
  valid_until?: string;
  created_at: string;
  last_login?: string;
}

interface Server extends BaseRecord {
  name: string;
  ip: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Site extends BaseRecord {
  name: string;
  domain: string;
  server_id: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Backup extends BaseRecord {
  name: string;
  site_id: number;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Monitoring extends BaseRecord {
  server_id: number;
  type: string;
  metric: string;
  value: number;
  status: string;
  created_at: string;
  updated_at: string;
}

type ResourceType = User | Server | Site | Backup | Monitoring;
type Resources = 'users' | 'servers' | 'sites' | 'backups' | 'monitoring';

// 模拟数据
const mockData: Record<Resources, ResourceType[]> = {
  users: mockUsers,
  servers: [],
  sites: [],
  backups: [],
  monitoring: [],
};

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    let items = [...mockData[resource as Resources]];

    // 过滤
    if (params.filter) {
      items = items.filter(item => {
        return Object.keys(params.filter).every(key => {
          if (key === 'q') {
            // 全局搜索
            const searchValue = params.filter[key].toLowerCase();
            return Object.values(item).some(
              value =>
                typeof value === 'string' &&
                value.toLowerCase().includes(searchValue)
            );
          }
          return item[key] === params.filter[key];
        });
      });
    }

    // 排序
    if (params.sort) {
      const { field, order } = params.sort;
      items = [...items].sort((a, b) => {
        if (a[field] < b[field]) return order === 'ASC' ? -1 : 1;
        if (a[field] > b[field]) return order === 'ASC' ? 1 : -1;
        return 0;
      });
    }

    // 分页
    const { page, perPage } = params.pagination;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedItems = items.slice(start, end);

    return {
      data: paginatedItems,
      total: items.length,
    };
  },

  getOne: async (resource, params) => {
    const item = mockData[resource as Resources].find(
      item => item.id === params.id
    );
    return { data: item || {} };
  },

  create: async (resource, params) => {
    const items = mockData[resource as Resources];
    const newId = Math.max(...items.map(item => item.id), 0) + 1;
    const newItem = { ...params.data, id: newId };
    items.push(newItem);
    return { data: newItem };
  },

  update: async (resource, params) => {
    const items = mockData[resource as Resources];
    const index = items.findIndex(item => item.id === params.id);
    if (index !== -1) {
      items[index] = { ...items[index], ...params.data };
      return { data: items[index] };
    }
    return { data: params.data };
  },

  delete: async (resource, params) => {
    const items = mockData[resource as Resources];
    const index = items.findIndex(item => item.id === params.id);
    if (index !== -1) {
      const [deletedItem] = items.splice(index, 1);
      return { data: deletedItem };
    }
    return { data: {} };
  },

  deleteMany: async (resource, params) => {
    const items = mockData[resource as Resources];
    const { ids } = params;
    const deletedItems = items.filter(item => ids.includes(item.id));
    mockData[resource as Resources] = items.filter(
      item => !ids.includes(item.id)
    );
    return { data: deletedItems.map(item => item.id) };
  },

  getMany: async (resource, params) => {
    const items = mockData[resource as Resources];
    const { ids } = params;
    const foundItems = items.filter(item => ids.includes(item.id));
    return { data: foundItems };
  },

  getManyReference: async (resource, params) => {
    const items = mockData[resource as Resources];
    const { target, id } = params;
    const filteredItems = items.filter(item => item[target] === id);

    return {
      data: filteredItems,
      total: filteredItems.length,
    };
  },
}; 