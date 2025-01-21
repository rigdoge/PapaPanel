'use client';

import { useSearchParams } from 'next/navigation';
import { Box, Card, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams?.get('error') ?? null;

  const getErrorMessage = (error: string | null) => {
    if (!error) return '发生未知错误';
    
    switch (error) {
      case 'CredentialsSignin':
        return '用户名或密码错误';
      case 'SessionRequired':
        return '请先登录';
      default:
        return '发生错误,请重试';
    }
  };

  return (
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
        padding: "2rem",
        backgroundColor: "rgba(30, 30, 30, 0.9)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              textShadow: "0 0 10px rgba(255, 0, 0, 0.3)",
              fontWeight: 500,
              letterSpacing: 1,
              mb: 2,
            }}
          >
            登录失败
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              textAlign: "center",
              mb: 4,
            }}
          >
            {getErrorMessage(error)}
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push('/auth/signin')}
            sx={{
              background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
              boxShadow: "0 3px 5px 2px rgba(33, 150, 243, .3)",
            }}
          >
            返回登录
          </Button>
        </Box>
      </Card>
    </Box>
  );
} 