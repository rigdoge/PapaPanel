import { Card, CardContent, Typography, Box } from '@mui/material';
import { useGetList } from 'react-admin';
import { Storage as ServerIcon } from '@mui/icons-material';

const cardStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'background.paper',
    '& .MuiCardContent-root': {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
};

export const ServerStatus = () => {
    const { data, isLoading } = useGetList(
        'servers',
        {
            pagination: { page: 1, perPage: 1000 },
            sort: { field: 'id', order: 'ASC' },
        }
    );

    if (isLoading) {
        return (
            <Card sx={cardStyle}>
                <CardContent>
                    <Typography>加载中...</Typography>
                </CardContent>
            </Card>
        );
    }

    const totalServers = data?.length || 0;
    const activeServers = data?.filter(server => server.status === 'active').length || 0;

    return (
        <Card sx={cardStyle}>
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <ServerIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">服务器状态</Typography>
                </Box>
                <Typography variant="h4" gutterBottom>
                    {activeServers}/{totalServers}
                </Typography>
                <Typography color="textSecondary">
                    活跃服务器
                </Typography>
            </CardContent>
        </Card>
    );
}; 