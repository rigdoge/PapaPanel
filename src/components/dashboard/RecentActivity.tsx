import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useGetList } from 'react-admin';
import {
    Storage as ServerIcon,
    Web as SiteIcon,
    Backup as BackupIcon,
    MonitorHeart as MonitorIcon,
} from '@mui/icons-material';

interface Activity {
    id: string | number;
    type: string;
    description: string;
    timestamp: string;
}

const getActivityIcon = (type: string) => {
    switch (type) {
        case 'server':
            return <ServerIcon />;
        case 'site':
            return <SiteIcon />;
        case 'backup':
            return <BackupIcon />;
        case 'monitor':
            return <MonitorIcon />;
        default:
            return null;
    }
};

export const RecentActivity = () => {
    const { data, isLoading } = useGetList(
        'activities',
        {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'timestamp', order: 'DESC' },
        }
    );

    if (isLoading) {
        return (
            <Card>
                <CardContent>
                    <Typography>加载中...</Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="h6">最近活动</Typography>
                </Box>
                <List>
                    {data?.map((activity: Activity) => (
                        <ListItem key={activity.id}>
                            <ListItemIcon>
                                {getActivityIcon(activity.type)}
                            </ListItemIcon>
                            <ListItemText
                                primary={activity.description}
                                secondary={new Date(activity.timestamp).toLocaleString()}
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}; 