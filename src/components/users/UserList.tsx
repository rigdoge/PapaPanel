import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  BooleanField,
  EditButton,
  DeleteButton,
  TextInput,
  SelectInput,
  BulkDeleteButton,
  BulkExportButton,
  SearchInput,
  FilterButton,
  CreateButton,
  ExportButton,
  TopToolbar,
} from 'react-admin';

const UserFilters = [
  <SearchInput key="search" source="q" alwaysOn placeholder="搜索..." />,
  <TextInput key="username" source="username" label="用户名" />,
  <TextInput key="email" source="email" label="邮箱" />,
  <SelectInput
    key="role"
    source="role"
    label="角色"
    choices={[
      { id: 'admin', name: '管理员' },
      { id: 'devops', name: '运维' },
      { id: 'developer', name: '开发' },
      { id: 'viewer', name: '访客' },
    ]}
  />,
  <SelectInput
    key="status"
    source="is_active"
    label="状态"
    choices={[
      { id: true, name: '启用' },
      { id: false, name: '禁用' },
    ]}
  />,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const BulkActionButtons = () => (
  <>
    <BulkExportButton />
    <BulkDeleteButton />
  </>
);

export const UserList = () => (
  <List 
    filters={UserFilters}
    actions={<ListActions />}
    bulkActionButtons={<BulkActionButtons />}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" label="用户名" />
      <EmailField source="email" label="邮箱" />
      <TextField source="role" label="角色" />
      <BooleanField source="is_active" label="状态" />
      <DateField source="created_at" label="创建时间" showTime />
      <DateField source="last_login" label="最后登录" showTime />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
); 