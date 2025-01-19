import { Card, CardContent, Typography, Box } from '@mui/material';
import { useGetList } from 'react-admin';
import { MonitorHeart as MonitorIcon } from '@mui/icons-material';

export const MonitoringStatus = () => {
    const { data, isLoading } = useGetList(
        'alerts',
        {
            pagination: { page: 1, perPage: 1000 },
            sort: { field: 'id', order: 'ASC' },
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

    const totalAlerts = data?.length || 0;
    const activeAlerts = data?.filter(alert => alert.status === 'active').length || 0;

    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <MonitorIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">监控状态</Typography>
                </Box>
                <Typography variant="h4" gutterBottom>
                    {activeAlerts}/{totalAlerts}
                </Typography>
                <Typography color="textSecondary">
                    活跃告警
                </Typography>
            </CardContent>
        </Card>
    );
}; 