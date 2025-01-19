import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// 这里模拟数据库中的用户
const users = [
    {
        id: 1,
        username: 'admin',
        password: 'admin', // 实际应用中应该使用加密密码
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

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // 验证用户
        const user = users.find(
            (u) => u.username === username && u.password === password
        );

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // 生成 JWT token
        const token = jwt.sign(
            { 
                id: user.id,
                username: user.username,
                role: user.role 
            },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // 返回用户信息和 token（不包含密码）
        const { password: _, ...userWithoutPassword } = user;
        
        return NextResponse.json({
            user: userWithoutPassword,
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 