import { Card, CardContent, Typography, Box } from '@mui/material';
import { useGetList } from 'react-admin';
import { Backup as BackupIcon } from '@mui/icons-material';

export const BackupStatus = () => {
    const { data, isLoading } = useGetList(
        'backups',
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

    const totalBackups = data?.length || 0;
    const successfulBackups = data?.filter(backup => backup.status === 'success').length || 0;

    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <BackupIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">备份状态</Typography>
                </Box>
                <Typography variant="h4" gutterBottom>
                    {successfulBackups}/{totalBackups}
                </Typography>
                <Typography color="textSecondary">
                    成功备份
                </Typography>
            </CardContent>
        </Card>
    );
}; 