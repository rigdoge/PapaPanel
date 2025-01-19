import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  BooleanInput,
  PasswordInput,
  required,
  email,
  minLength,
} from 'react-admin';

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="username" label="用户名" validate={[required(), minLength(3)]} />
      <TextInput source="email" label="邮箱" validate={[required(), email()]} />
      <PasswordInput source="password" label="密码" validate={[minLength(6)]} />
      <SelectInput
        source="role"
        label="角色"
        validate={[required()]}
        choices={[
          { id: 'admin', name: '管理员' },
          { id: 'devops', name: '运维' },
          { id: 'developer', name: '开发' },
          { id: 'viewer', name: '访客' },
        ]}
      />
      <BooleanInput source="is_active" label="启用" />
    </SimpleForm>
  </Edit>
); 