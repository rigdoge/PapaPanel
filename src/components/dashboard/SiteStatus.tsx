import { Card, CardContent, Typography, Box } from '@mui/material';
import { useGetList } from 'react-admin';
import { Web as SiteIcon } from '@mui/icons-material';

export const SiteStatus = () => {
    const { data, isLoading } = useGetList(
        'sites',
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

    const totalSites = data?.length || 0;
    const onlineSites = data?.filter(site => site.status === 'online').length || 0;

    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <SiteIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">站点状态</Typography>
                </Box>
                <Typography variant="h4" gutterBottom>
                    {onlineSites}/{totalSites}
                </Typography>
                <Typography color="textSecondary">
                    在线站点
                </Typography>
            </CardContent>
        </Card>
    );
}; 