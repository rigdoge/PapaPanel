import { AppBar as RaAppBar, AppBarProps } from 'react-admin';
import { Box, Typography } from '@mui/material';

export const AppBar = (props: AppBarProps) => (
    <RaAppBar
        {...props}
        color="primary"
        sx={{
            '& .RaAppBar-toolbar': {
                paddingRight: 2,
            },
        }}
    >
        <Box flex={1} display="flex" alignItems="center">
            <Box 
                display="flex" 
                alignItems="center"
                sx={{
                    flex: 1,
                    '& span': {
                        marginRight: '8px',
                    },
                }}
            >
                <Typography
                    variant="h6"
                    color="inherit"
                    component="span"
                >
                    PapaPanel
                </Typography>
                <Typography
                    variant="h6"
                    color="inherit"
                    id="react-admin-title"
                    sx={{
                        flex: 1,
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        opacity: 0.9,
                    }}
                />
            </Box>
        </Box>
    </RaAppBar>
); 