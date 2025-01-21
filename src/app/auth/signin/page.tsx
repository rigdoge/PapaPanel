'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Box, Card, Typography, TextField, Button, Alert } from "@mui/material";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("登录失败,请稍后重试");
    } finally {
      setLoading(false);
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
          <Box
            component="img"
            src="/logo.png"
            alt="PapaPanel"
            sx={{
              width: 120,
              height: 120,
              marginBottom: 2,
              filter: "drop-shadow(0 0 10px rgba(0, 150, 255, 0.3))",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              textShadow: "0 0 10px rgba(0, 150, 255, 0.3)",
              fontWeight: 500,
              letterSpacing: 1,
            }}
          >
            PapaPanel
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              mt: 1,
              textAlign: "center",
            }}
          >
            LEMP 环境自动化部署和监控管理平台
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            name="username"
            label="用户名"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            sx={{
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
            }}
          />
          
          <TextField
            name="password"
            label="密码"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            sx={{
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
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              mb: 2,
              background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
              boxShadow: "0 3px 5px 2px rgba(33, 150, 243, .3)",
            }}
          >
            {loading ? "登录中..." : "登录"}
          </Button>
        </form>
      </Card>
    </Box>
  );
} 