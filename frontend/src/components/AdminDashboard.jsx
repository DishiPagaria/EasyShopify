import React, { useState } from 'react';
import { CssBaseline, Box, Toolbar, Typography, IconButton, Divider, ListItemButton, ListItemIcon, ListItemText, Grid } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar,Drawer } from '../utils/styles';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AdminBar from './AdminBar';
import AdminHomePage from './AdminHomePage';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const navigate = useNavigate();
    const { currentRole } = useSelector(state => state.user);

    const homeHandler = () => {
        navigate("/");
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute'>
                    <Toolbar sx={{ pr: '24px', backgroundColor: "#4d1c9c" }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <ListIcon />
                        </IconButton>

                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{
                                mr: 2,
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                cursor: "pointer"
                            }}
                            onClick={homeHandler}
                        >
                            <LocalMallIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                            EasyShopify
                        </Typography>

                        {/* <AccountMenu /> */}
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={styles.toolBarStyled}>
                        <IconButton onClick={toggleDrawer}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <AdminBar />
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar />
                    <Routes>
                        <Route path="/admin/dashboard" element={<AdminHomePage />} />
                    </Routes>
                </Box>
            </Box >
        </>
    );
};

export default AdminDashboard;


const styles = {
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
};

