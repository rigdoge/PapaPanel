import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Title } from 'react-admin';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import BackupIcon from '@mui/icons-material/Backup';
import MonitorIcon from '@mui/icons-material/Monitor';
import { useNavigate } from 'react-router-dom';

export const SettingsList = () => {
  const navigate = useNavigate();

  const settingsItems = [
    {
      title: '用户管理',
      description: '管理系统用户、角色和权限',
      icon: <PeopleIcon />,
      path: '/users'
    },
    {
      title: '安全设置',
      description: '配置系统安全策略、访问控制和日志',
      icon: <SecurityIcon />,
      path: '/security'
    },
    {
      title: '备份设置',
      description: '配置自动备份策略和恢复选项',
      icon: <BackupIcon />,
      path: '/backups'
    },
    {
      title: '监控设置',
      description: '配置系统监控参数和告警规则',
      icon: <MonitorIcon />,
      path: '/monitoring'
    }
  ];

  return (
    <Card>
      <Title title="系统设置" />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          系统设置
        </Typography>
        <List>
          {settingsItems.map((item, index) => (
            <ListItem 
              key={index} 
              button 
              onClick={() => navigate(item.path)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.title}
                secondary={item.description}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}; 