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
  SelectInput,
  Create,
  required,
} from 'react-admin';

export const BackupList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="名称" />
      <ReferenceField source="site_id" reference="sites" label="站点">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="type" label="类型" />
      <TextField source="status" label="状态" />
      <DateField source="created_at" label="创建时间" />
      <DateField source="updated_at" label="更新时间" />
    </Datagrid>
  </List>
);

export const BackupEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="名称" validate={[required()]} />
      <ReferenceInput source="site_id" reference="sites" label="站点">
        <SelectInput optionText="name" validate={[required()]} />
      </ReferenceInput>
      <SelectInput
        source="type"
        label="类型"
        choices={[
          { id: 'full', name: '完整备份' },
          { id: 'db', name: '数据库' },
          { id: 'files', name: '文件' },
        ]}
        validate={[required()]}
      />
      <TextInput source="status" label="状态" />
    </SimpleForm>
  </Edit>
);

export const BackupCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="名称" validate={[required()]} />
      <ReferenceInput source="site_id" reference="sites" label="站点">
        <SelectInput optionText="name" validate={[required()]} />
      </ReferenceInput>
      <SelectInput
        source="type"
        label="类型"
        choices={[
          { id: 'full', name: '完整备份' },
          { id: 'db', name: '数据库' },
          { id: 'files', name: '文件' },
        ]}
        validate={[required()]}
      />
      <TextInput source="status" label="状态" defaultValue="pending" />
    </SimpleForm>
  </Create>
); 