import { Menu as RaMenu, MenuProps } from 'react-admin';
import {
    Dashboard as DashboardIcon,
    Storage as StorageIcon,
    Web as WebIcon,
    Backup as BackupIcon,
    MonitorHeart as MonitorIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';

export const Menu = (props: MenuProps) => (
    <RaMenu {...props}>
        <RaMenu.DashboardItem
            primaryText="仪表盘"
            leftIcon={<DashboardIcon />}
        />
        <RaMenu.Item
            to="/servers"
            primaryText="服务器"
            leftIcon={<StorageIcon />}
        />
        <RaMenu.Item
            to="/sites"
            primaryText="站点"
            leftIcon={<WebIcon />}
        />
        <RaMenu.Item
            to="/backups"
            primaryText="备份"
            leftIcon={<BackupIcon />}
        />
        <RaMenu.Item
            to="/monitoring"
            primaryText="监控"
            leftIcon={<MonitorIcon />}
        />
        <RaMenu.Item
            to="/settings"
            primaryText="设置"
            leftIcon={<SettingsIcon />}
        />
    </RaMenu>
); 