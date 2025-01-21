interface User {
  id: number;
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

export const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    // 密码: admin123
    password: '$2a$10$IVrIzHGLvhv47Ny5.Cy5/.tULJyRq4eSvEz4yZ6v.ZgXLYrb3kVXi',
    role: 'admin',
    department: '技术部',
    position: '系统管理员',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    username: 'devops',
    email: 'devops@example.com',
    // 密码: devops123
    password: '$2a$10$8FPr.YhqkIAZxXoHGPZY8.1/5NUHGJHd7.IYKr3YYw5GK1yPZUNX.',
    role: 'devops',
    department: '运维部',
    position: '运维工程师',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    username: 'developer',
    email: 'developer@example.com',
    // 密码: dev123
    password: '$2a$10$WH9qJv.QKPPX0QkIeA/DUOMf8JvGcYZi1/Urv7JxmnKfZnUZKxLLy',
    role: 'developer',
    department: '研发部',
    position: '开发工程师',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  }
]; 