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
  DateTimeInput,
  Toolbar,
  SaveButton,
  DeleteButton,
  useRecordContext,
} from 'react-admin';

const UserEditToolbar = () => {
  return (
    <Toolbar>
      <SaveButton label="保存修改" />
      <DeleteButton label="删除用户" />
    </Toolbar>
  );
};

export const UserEdit = () => (
  <Edit>
    <SimpleForm toolbar={<UserEditToolbar />}>
      <TextInput 
        source="username" 
        label="用户名" 
        validate={[required('用户名不能为空'), minLength(3, '用户名至少3个字符')]} 
      />
      <TextInput 
        source="email" 
        label="邮箱" 
        type="email"
        validate={[required('邮箱不能为空'), email('请输入有效的邮箱地址')]} 
      />
      <PasswordInput 
        source="password" 
        label="密码" 
        validate={[minLength(6, '密码至少6个字符')]} 
      />
      <SelectInput
        source="role"
        label="角色"
        validate={[required('请选择用户角色')]}
        choices={[
          { id: 'admin', name: '管理员' },
          { id: 'devops', name: '运维' },
          { id: 'developer', name: '开发' },
          { id: 'viewer', name: '访客' },
        ]}
      />
      <TextInput 
        source="department" 
        label="部门" 
      />
      <TextInput 
        source="position" 
        label="职位" 
      />
      <TextInput 
        source="phone" 
        label="手机号" 
      />
      <BooleanInput 
        source="is_active" 
        label="启用账号" 
      />
      <DateTimeInput 
        source="valid_until" 
        label="有效期至" 
      />
      <DateTimeInput 
        source="created_at" 
        label="创建时间" 
        disabled 
      />
      <DateTimeInput 
        source="last_login" 
        label="最后登录" 
        disabled 
      />
    </SimpleForm>
  </Edit>
); 