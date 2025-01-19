'use client';

import {
  List,
  Datagrid,
  TextField,
  DateField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  required,
} from 'react-admin';

export const ServerList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="名称" />
      <TextField source="ip" label="IP地址" />
      <TextField source="status" label="状态" />
      <DateField source="created_at" label="创建时间" />
      <DateField source="updated_at" label="更新时间" />
    </Datagrid>
  </List>
);

export const ServerEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="名称" validate={[required()]} />
      <TextInput source="ip" label="IP地址" validate={[required()]} />
      <TextInput source="status" label="状态" />
    </SimpleForm>
  </Edit>
);

export const ServerCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="名称" validate={[required()]} />
      <TextInput source="ip" label="IP地址" validate={[required()]} />
      <TextInput source="status" label="状态" defaultValue="active" />
    </SimpleForm>
  </Create>
); 