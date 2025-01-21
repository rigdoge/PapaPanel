import { 
  DataProvider,
  RaRecord,
  Identifier,
  GetListResult,
  GetOneResult,
  CreateResult,
  UpdateResult,
  DeleteResult,
  UpdateManyResult,
  GetListParams,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteParams,
  UpdateManyParams,
  GetManyParams,
  GetManyReferenceParams,
  DeleteManyParams,
  GetManyResult,
  GetManyReferenceResult,
  DeleteManyResult
} from 'ra-core';
import { mockUsers } from '../mockData';

// 基础记录类型
interface BaseRecord extends RaRecord {
  id: number;
  created_at?: string;
  updated_at?: string;
}

// 用户记录类型
interface UserRecord extends BaseRecord {
  username: string;
  email: string;
  password: string;
  role: string;
  department?: string;
  position?: string;
  phone?: string;
  is_active: boolean;
  valid_until?: string;
  last_login?: string;
}

// 服务器记录类型
interface ServerRecord extends BaseRecord {
  name: string;
  ip: string;
  status: string;
}

// 站点记录类型
interface SiteRecord extends BaseRecord {
  name: string;
  domain: string;
  server_id: number;
  status: string;
}

// 备份记录类型
interface BackupRecord extends BaseRecord {
  name: string;
  site_id: number;
  type: string;
  status: string;
}

// 监控记录类型
interface MonitoringRecord extends BaseRecord {
  server_id: number;
  type: string;
  metric: string;
  value: number;
  status: string;
}

// 资源类型映射
type ResourceMap = {
  users: UserRecord;
  servers: ServerRecord;
  sites: SiteRecord;
  backups: BackupRecord;
  monitoring: MonitoringRecord;
};

type Resources = keyof ResourceMap;

// 模拟数据
const mockData: { [K in Resources]: ResourceMap[K][] } = {
  users: mockUsers as UserRecord[],
  servers: [],
  sites: [],
  backups: [],
  monitoring: [],
};

// 数据提供者实现
export const dataProvider: DataProvider = {
  getList: async <RecordType extends RaRecord = any>(
    resource: string,
    params: GetListParams
  ): Promise<GetListResult<RecordType>> => {
    const items = [...mockData[resource as Resources]];
    let filteredItems = [...items];

    // 过滤
    if (params.filter) {
      filteredItems = filteredItems.filter(item => {
        return Object.keys(params.filter).every(key => {
          if (key === 'q') {
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
      filteredItems = [...filteredItems].sort((a, b) => {
        if (a[field] < b[field]) return order === 'ASC' ? -1 : 1;
        if (a[field] > b[field]) return order === 'ASC' ? 1 : -1;
        return 0;
      });
    }

    // 分页
    const { page, perPage } = params.pagination;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedItems = filteredItems.slice(start, end);

    return {
      data: paginatedItems as unknown as RecordType[],
      total: filteredItems.length,
    };
  },

  getOne: async <RecordType extends RaRecord = any>(
    resource: string,
    params: GetOneParams<RecordType>
  ): Promise<GetOneResult<RecordType>> => {
    const items = mockData[resource as Resources];
    const item = items.find(item => item.id === params.id);
    return { data: (item || {}) as unknown as RecordType };
  },

  create: async <
    RecordType extends Omit<RaRecord, 'id'> = any,
    ResultRecordType extends RaRecord = RecordType & { id: Identifier }
  >(
    resource: string,
    params: CreateParams<RecordType>
  ): Promise<CreateResult<ResultRecordType>> => {
    const items = mockData[resource as Resources];
    const newId = Math.max(...items.map(item => item.id), 0) + 1;
    const now = new Date().toISOString();
    const newItem = {
      ...params.data,
      id: newId,
      created_at: now,
      updated_at: now,
    };
    items.push(newItem as any);
    return { data: newItem as unknown as ResultRecordType };
  },

  update: async <RecordType extends RaRecord = any>(
    resource: string,
    params: UpdateParams<RecordType>
  ): Promise<UpdateResult<RecordType>> => {
    const items = mockData[resource as Resources];
    const index = items.findIndex(item => item.id === params.id);
    if (index !== -1) {
      const updatedItem = {
        ...items[index],
        ...params.data,
        updated_at: new Date().toISOString(),
      };
      items[index] = updatedItem as any;
      return { data: updatedItem as unknown as RecordType };
    }
    return { data: params.data as unknown as RecordType };
  },

  updateMany: async <RecordType extends RaRecord = any>(
    resource: string,
    params: UpdateManyParams<RecordType>
  ): Promise<UpdateManyResult<RecordType>> => {
    const items = mockData[resource as Resources];
    const { ids, data } = params;
    const updatedIds: Identifier[] = [];

    ids.forEach(id => {
      const index = items.findIndex(item => item.id === id);
      if (index !== -1) {
        items[index] = {
          ...items[index],
          ...data,
          updated_at: new Date().toISOString(),
        } as any;
        updatedIds.push(id);
      }
    });

    return { data: updatedIds };
  },

  delete: async <RecordType extends RaRecord = any>(
    resource: string,
    params: DeleteParams<RecordType>
  ): Promise<DeleteResult<RecordType>> => {
    const items = mockData[resource as Resources];
    const index = items.findIndex(item => item.id === params.id);
    if (index !== -1) {
      const [deletedItem] = items.splice(index, 1);
      return { data: deletedItem as unknown as RecordType };
    }
    return { data: {} as unknown as RecordType };
  },

  deleteMany: async <RecordType extends RaRecord = any>(
    resource: string,
    params: DeleteManyParams<RecordType>
  ): Promise<DeleteManyResult<RecordType>> => {
    const items = mockData[resource as Resources];
    const { ids } = params;
    const deletedItems = items.filter(item => ids.includes(item.id));
    mockData[resource as Resources] = items.filter(
      item => !ids.includes(item.id)
    ) as any;
    return { data: deletedItems.map(item => item.id) };
  },

  getMany: async <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult<RecordType>> => {
    const items = mockData[resource as Resources];
    const { ids } = params;
    const foundItems = items.filter(item => ids.includes(item.id));
    return { data: foundItems as unknown as RecordType[] };
  },

  getManyReference: async <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<RecordType>> => {
    const items = mockData[resource as Resources];
    const { target, id } = params;
    const filteredItems = items.filter(item => item[target] === id);

    return {
      data: filteredItems as unknown as RecordType[],
      total: filteredItems.length,
    };
  },
}; 