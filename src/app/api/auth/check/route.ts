import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(request: Request) {
    try {
        const headersList = headers();
        const token = headersList.get('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json(
                { message: 'No token provided' },
                { status: 401 }
            );
        }

        try {
            // 解码并验证 token
            const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
            
            // 检查 token 是否过期
            if (decoded.exp < Date.now()) {
                return NextResponse.json(
                    { message: 'Token expired' },
                    { status: 401 }
                );
            }

            return NextResponse.json({ valid: true });
        } catch (error) {
            return NextResponse.json(
                { message: 'Invalid token' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
} 