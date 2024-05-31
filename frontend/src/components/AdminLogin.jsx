import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Paper, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from 'styled-components';
import Popup from '../components/Popup';

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentRole } = useSelector(state => state.user);

    // State variables
    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!email || !password) {
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        const adminCredentials = {
            email: 'admin@easyshopify.com',
            password: 'easyshopify@admin'
        };

        if (email === adminCredentials.email && password === adminCredentials.password) {
            setMessage("Login Successful!");
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                navigate('/admin/dashboard'); // Redirect to AdminDashboard
            }, 1500);
        } else {
            setMessage('Invalid admin credentials');
            setShowPopup(true);
            setLoader(false);
        }
        setLoader(true);
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
    };

    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <StyledTypography>Admin Login</StyledTypography>
                        <Typography variant="h7">Welcome back! Please enter your admin credentials</Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Enter your email"
                                name="email"
                                autoComplete="email"
                                variant="standard"
                                error={emailError}
                                helperText={emailError && 'Email is required'}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                variant="standard"
                                error={passwordError}
                                helperText={passwordError && 'Password is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <LightPurpleButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                            </LightPurpleButton>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://images.pexels.com/photos/1121097/pexels-photo-1121097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
);
};

export default AdminLogin;

const LightPurpleButton = styled.button`
background-color: #7f56da;
color: #fff;
border: none;
padding: 12px 24px;
cursor: pointer;
font-size: 16px;
margin-top: 16px;
width: 100%;
&:hover {
background-color: #6a4fb4;
}
`;

const StyledTypography = styled.h4`
margin: 0;
font-weight: 400;
font-size: 2.125rem;
line-height: 1.235;
letter-spacing: 0.00735em;
color: #2c2143;
margin-bottom: 16px;
`;
