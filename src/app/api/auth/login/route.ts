import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { mockUsers } from '@/lib/mockData';

// 设置为动态路由
export const dynamic = 'force-dynamic';

interface User {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
  is_active: boolean;
  department?: string;
  position?: string;
  phone?: string;
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
    const body = await request.json();
    const { username, password } = body;

    // 从模拟数据中查找用户
    const user = mockUsers.find(u => u.username === username);

    if (!user || !user.is_active) {
      return NextResponse.json(
        { message: '用户名或密码错误' },
        { status: 401 }
      );
    }

    // 验证密码
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: '用户名或密码错误' },
        { status: 401 }
      );
    }

    // 更新最后登录时间
    user.last_login = new Date().toISOString();

    // 生成 token
    const token = generateToken(user);

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      token,
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