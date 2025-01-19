'use client';

import { Layout as RaLayout, LayoutProps } from 'react-admin';
import { Box } from '@mui/material';

export const Layout = (props: LayoutProps) => (
  <RaLayout
    {...props}
    sx={{
      '& .RaLayout-content': {
        padding: 2,
      },
    }}
  >
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      {props.children}
    </Box>
  </RaLayout>
); 