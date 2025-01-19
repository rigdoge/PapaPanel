import { Login } from 'react-admin';
import { Box, Card, Typography } from '@mui/material';

export const LoginPage = () => (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="#121212"
    >
        <Card sx={{ 
            minWidth: 400,
            padding: '2rem',
            backgroundColor: 'rgba(30, 30, 30, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 4,
                }}
            >
                <Box
                    component="img"
                    src="/logo.png"
                    alt="PapaPanel"
                    sx={{
                        width: 120,
                        height: 120,
                        marginBottom: 2,
                        filter: 'drop-shadow(0 0 10px rgba(0, 150, 255, 0.3))',
                    }}
                />
                <Typography
                    variant="h5"
                    sx={{
                        color: '#fff',
                        textShadow: '0 0 10px rgba(0, 150, 255, 0.3)',
                        fontWeight: 500,
                        letterSpacing: 1,
                    }}
                >
                    PapaPanel
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        mt: 1,
                        textAlign: 'center',
                    }}
                >
                    LEMP 环境自动化部署和监控管理平台
                </Typography>
            </Box>
            <Login
                sx={{
                    '& .MuiCardContent-root': {
                        background: 'transparent',
                        boxShadow: 'none',
                        padding: 0,
                    },
                    '& .MuiTextField-root': {
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.23)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.4)',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1976d2',
                            },
                        },
                    },
                    '& .MuiButton-contained': {
                        background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                        boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                    },
                }}
            />
        </Card>
    </Box>
); 