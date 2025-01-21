import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const rolePermissions = {
    admin: ['admin', 'manage_users', 'manage_servers', 'manage_sites', 'manage_backups', 'manage_monitoring'],
    devops: ['manage_servers', 'manage_sites', 'manage_backups', 'manage_monitoring'],
    developer: ['view_servers', 'view_sites', 'view_backups', 'view_monitoring'],
};

export async function GET() {
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
            // 解码 token
            const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
            
            // 检查 token 是否过期
            if (decoded.exp < Date.now()) {
                return NextResponse.json(
                    { message: 'Token expired' },
                    { status: 401 }
                );
            }

            // 获取用户角色的权限
            const permissions = rolePermissions[decoded.role as keyof typeof rolePermissions] || [];

            return NextResponse.json({ permissions });
        } catch (error) {
            return NextResponse.json(
                { message: 'Invalid token' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Permissions error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
} 