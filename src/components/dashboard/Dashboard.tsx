import { Card, CardContent, Grid } from '@mui/material';
import { Title } from 'react-admin';
import { ServerStatus } from './ServerStatus';
import { SiteStatus } from './SiteStatus';
import { BackupStatus } from './BackupStatus';
import { MonitoringStatus } from './MonitoringStatus';
import { RecentActivity } from './RecentActivity';

export const Dashboard = () => (
    <Card>
        <Title title="仪表盘" />
        <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={3}>
                    <ServerStatus />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <SiteStatus />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <BackupStatus />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <MonitoringStatus />
                </Grid>
                <Grid item xs={12}>
                    <RecentActivity />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
); 