import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { mockUsers } from '@/lib/mockData';

// 设置为动态路由
export const dynamic = 'force-dynamic';

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

// 生成简单的 token
const generateToken = (user: User) => {
  return Buffer.from(JSON.stringify({
    id: user.id,
    username: user.username,
    role: user.role,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24小时过期
  })).toString('base64');
};

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // 查找用户
    const user = mockUsers.find(u => u.username === username);
    if (!user) {
      return NextResponse.json(
        { error: '用户名或密码错误' },
        { status: 401 }
      );
    }

    // 验证密码
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: '用户名或密码错误' },
        { status: 401 }
      );
    }

    // 检查账户是否有效
    if (!user.is_active) {
      return NextResponse.json(
        { error: '账户已被禁用' },
        { status: 403 }
      );
    }

    // 检查账户是否过期
    if (user.valid_until && new Date(user.valid_until) < new Date()) {
      return NextResponse.json(
        { error: '账户已过期' },
        { status: 403 }
      );
    }

    // 更新最后登录时间
    const updatedUser = {
      ...user,
      last_login: new Date().toISOString()
    };

    // 生成 token
    const token = generateToken(updatedUser);

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      token: token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: '登录失败' },
      { status: 500 }
    );
  }
}

// 处理 OPTIONS 请求
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
} 