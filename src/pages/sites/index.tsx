'use client';

import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  DateField,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  Create,
  required,
} from 'react-admin';

export const SiteList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="名称" />
      <TextField source="domain" label="域名" />
      <ReferenceField source="server_id" reference="servers" label="服务器">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="status" label="状态" />
      <DateField source="created_at" label="创建时间" />
      <DateField source="updated_at" label="更新时间" />
    </Datagrid>
  </List>
);

export const SiteEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="名称" validate={[required()]} />
      <TextInput source="domain" label="域名" validate={[required()]} />
      <ReferenceInput source="server_id" reference="servers" label="服务器">
        <TextInput validate={[required()]} />
      </ReferenceInput>
      <TextInput source="status" label="状态" />
    </SimpleForm>
  </Edit>
);

export const SiteCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="名称" validate={[required()]} />
      <TextInput source="domain" label="域名" validate={[required()]} />
      <ReferenceInput source="server_id" reference="servers" label="服务器">
        <TextInput validate={[required()]} />
      </ReferenceInput>
      <TextInput source="status" label="状态" defaultValue="active" />
    </SimpleForm>
  </Create>
); 