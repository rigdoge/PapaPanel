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
} from 'react-admin';

const userFilters = [
  <TextInput source="q" label="搜索" alwaysOn />,
  <TextInput source="username" label="用户名" />,
  <TextInput source="email" label="邮箱" />,
  <SelectInput
    source="role"
    label="角色"
    choices={[
      { id: 'admin', name: '管理员' },
      { id: 'devops', name: '运维' },
      { id: 'developer', name: '开发' },
      { id: 'viewer', name: '访客' },
    ]}
  />,
];

export const UserList = () => (
  <List filters={userFilters}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" label="用户名" />
      <EmailField source="email" label="邮箱" />
      <TextField source="role" label="角色" />
      <BooleanField source="is_active" label="状态" />
      <DateField source="created_at" label="创建时间" />
      <DateField source="last_login" label="最后登录" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
); 