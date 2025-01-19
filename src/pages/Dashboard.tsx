'use client';

import { Card, CardContent, Grid } from '@mui/material';
import { Title } from 'react-admin';

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

export const Dashboard = () => (
  <>
    <Title title="仪表盘" />
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={3}>
        <Card sx={cardStyle}>
          <CardContent>
            <h3>服务器状态</h3>
            {/* 服务器状态组件 */}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Card sx={cardStyle}>
          <CardContent>
            <h3>站点状态</h3>
            {/* 站点状态组件 */}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Card sx={cardStyle}>
          <CardContent>
            <h3>备份状态</h3>
            {/* 备份状态组件 */}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Card sx={cardStyle}>
          <CardContent>
            <h3>监控状态</h3>
            {/* 监控状态组件 */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </>
); 