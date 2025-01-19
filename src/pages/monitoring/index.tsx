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
  NumberInput,
  required,
} from 'react-admin';

export const MonitoringList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="server_id" reference="servers" label="服务器">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="type" label="类型" />
      <TextField source="metric" label="指标" />
      <TextField source="value" label="数值" />
      <TextField source="status" label="状态" />
      <DateField source="created_at" label="创建时间" />
      <DateField source="updated_at" label="更新时间" />
    </Datagrid>
  </List>
);

export const MonitoringEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="server_id" reference="servers" label="服务器">
        <SelectInput optionText="name" validate={[required()]} />
      </ReferenceInput>
      <SelectInput
        source="type"
        label="类型"
        choices={[
          { id: 'cpu', name: 'CPU使用率' },
          { id: 'memory', name: '内存使用率' },
          { id: 'disk', name: '磁盘使用率' },
          { id: 'network', name: '网络流量' },
        ]}
        validate={[required()]}
      />
      <TextInput source="metric" label="指标" validate={[required()]} />
      <NumberInput source="value" label="数值" validate={[required()]} />
      <TextInput source="status" label="状态" />
    </SimpleForm>
  </Edit>
); 