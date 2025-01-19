'use client';

import { Admin, Resource } from 'react-admin';
import { AppLayout } from './layout/AppLayout';
import { Dashboard } from '../pages/Dashboard';
import { authProvider } from '../lib/providers/authProvider';
import { dataProvider } from '../lib/providers/dataProvider';
import { i18nProvider } from '../lib/providers/i18nProvider';
import { darkTheme, lightTheme } from '../lib/theme';

// 资源
import { ServerList, ServerEdit, ServerCreate } from '../pages/servers';
import { SiteList, SiteEdit, SiteCreate } from '../pages/sites';
import { BackupList, BackupEdit, BackupCreate } from '../pages/backups';
import { MonitoringList, MonitoringEdit } from '../pages/monitoring';
import { UserList } from './users/UserList';
import { UserEdit } from './users/UserEdit';
import { UserCreate } from './users/UserCreate';
import { SettingsList } from './settings/SettingsList';

// 图标
import DnsIcon from '@mui/icons-material/Dns';
import LanguageIcon from '@mui/icons-material/Language';
import BackupIcon from '@mui/icons-material/Backup';
import MonitorIcon from '@mui/icons-material/Monitor';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

export const AdminApp = () => {
  return (
    <Admin
      layout={AppLayout}
      dashboard={Dashboard}
      authProvider={authProvider}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      theme={lightTheme}
      darkTheme={darkTheme}
      defaultTheme="light"
      requireAuth
    >
      <Resource
        name="settings"
        list={SettingsList}
        icon={SettingsIcon}
        options={{ 
          label: '系统设置'
        }}
      />
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        icon={PeopleIcon}
        options={{ 
          label: '用户管理',
          menu: {
            parent: 'settings'
          }
        }}
      />
      <Resource
        name="servers"
        list={ServerList}
        edit={ServerEdit}
        create={ServerCreate}
        icon={DnsIcon}
        options={{ label: '服务器' }}
      />
      <Resource
        name="sites"
        list={SiteList}
        edit={SiteEdit}
        create={SiteCreate}
        icon={LanguageIcon}
        options={{ label: '站点' }}
      />
      <Resource
        name="backups"
        list={BackupList}
        edit={BackupEdit}
        create={BackupCreate}
        icon={BackupIcon}
        options={{ label: '备份' }}
      />
      <Resource
        name="monitoring"
        list={MonitoringList}
        edit={MonitoringEdit}
        icon={MonitorIcon}
        options={{ label: '监控' }}
      />
    </Admin>
  );
};

export default AdminApp; 