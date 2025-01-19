export interface Server {
    id: number;
    name: string;
    ip: string;
    status: 'active' | 'inactive' | 'maintenance';
    created_at: string;
    updated_at: string;
}

export interface Site {
    id: number;
    name: string;
    domain: string;
    status: 'online' | 'offline' | 'maintenance';
    server_id: number;
    created_at: string;
    updated_at: string;
}

export interface Backup {
    id: number;
    name: string;
    type: 'full' | 'database' | 'files';
    status: 'success' | 'failed' | 'in_progress';
    site_id: number;
    created_at: string;
    updated_at: string;
}

export interface Alert {
    id: number;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    status: 'active' | 'resolved' | 'acknowledged';
    resource_type: 'server' | 'site' | 'backup';
    resource_id: number;
    created_at: string;
    updated_at: string;
}

export interface Activity {
    id: number;
    type: 'server' | 'site' | 'backup' | 'monitor';
    description: string;
    user_id: number;
    timestamp: string;
} 