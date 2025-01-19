import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// 模拟用户数据
const mockUsers = [
    {
        id: 1,
        username: 'admin',
        password: 'admin',
        role: 'admin',
        email: 'admin@example.com',
    },
    {
        id: 2,
        username: 'devops',
        password: 'devops',
        role: 'devops',
        email: 'devops@example.com',
    },
    {
        id: 3,
        username: 'developer',
        password: 'developer',
        role: 'developer',
        email: 'developer@example.com',
    },
];

// 生成简单的 token
const generateToken = (user: any) => {
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

        // 查找用户
        const user = mockUsers.find(
            u => u.username === username && u.password === password
        );

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // 生成 token
        const token = generateToken(user);

        // 返回用户信息（不包含密码）
        const { password: _, ...userWithoutPassword } = user;

        // 直接返回 token 和 user，不包装在 success 和 data 中
        return NextResponse.json({
            token,
            user: userWithoutPassword,
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
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