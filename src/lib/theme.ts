import { defaultTheme, RaThemeOptions } from 'react-admin';

export const darkTheme: RaThemeOptions = {
    ...defaultTheme,
    palette: {
        mode: 'dark',
        primary: {
            main: '#00bcd4',
            light: '#33c9dc',
            dark: '#008394',
            contrastText: '#fff',
        },
        secondary: {
            main: '#7c4dff',
            light: '#9670ff',
            dark: '#5635b2',
            contrastText: '#fff',
        },
        background: {
            default: '#0a192f',
            paper: 'rgba(16, 32, 61, 0.9)',
        },
        text: {
            primary: '#e6f1ff',
            secondary: '#8892b0',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(10, 25, 47, 0.85)',
                    backdropFilter: 'blur(8px)',
                    borderBottom: '1px solid rgba(0, 188, 212, 0.1)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'rgba(10, 25, 47, 0.95)',
                    backdropFilter: 'blur(8px)',
                    borderRight: '1px solid rgba(0, 188, 212, 0.1)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(16, 32, 61, 0.7)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(0, 188, 212, 0.1)',
                    boxShadow: '0 4px 20px rgba(0, 188, 212, 0.1)',
                    '&:hover': {
                        boxShadow: '0 6px 24px rgba(0, 188, 212, 0.2)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    background: 'linear-gradient(45deg, #00bcd4, #7c4dff)',
                    boxShadow: '0 2px 12px rgba(0, 188, 212, 0.3)',
                    '&:hover': {
                        background: 'linear-gradient(45deg, #00acc1, #6c3fff)',
                        boxShadow: '0 4px 16px rgba(0, 188, 212, 0.4)',
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid rgba(0, 188, 212, 0.1)',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(16, 32, 61, 0.6)',
                    '&:hover': {
                        backgroundColor: 'rgba(16, 32, 61, 0.8)',
                    },
                },
            },
        },
        RaLayout: {
            styleOverrides: {
                root: {
                    '& .RaLayout-content': {
                        padding: '1rem',
                    },
                },
            },
        },
    },
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            color: '#e6f1ff',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#e6f1ff',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#e6f1ff',
        },
        body1: {
            color: '#8892b0',
        },
        body2: {
            color: '#8892b0',
        },
    },
    sidebar: {
        width: 240,
        closedWidth: 55,
    },
};

export const lightTheme: RaThemeOptions = {
    ...defaultTheme,
    palette: {
        mode: 'light',
        primary: {
            main: '#2196f3',
            light: '#64b5f6',
            dark: '#1976d2',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#f50057',
            light: '#ff4081',
            dark: '#c51162',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
        },
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#ffffff',
                    backgroundImage: 'none',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    color: 'rgba(0, 0, 0, 0.87)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    borderRadius: 12,
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    background: 'linear-gradient(45deg, #1976d2, #2196f3)',
                    boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
                    '&:hover': {
                        background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                },
            },
        },
        RaLayout: {
            styleOverrides: {
                root: {
                    '& .RaLayout-content': {
                        padding: '1rem',
                    },
                },
            },
        },
    },
    sidebar: {
        width: 240,
        closedWidth: 55,
    },
}; 