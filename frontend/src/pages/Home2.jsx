import * as React from 'react';
import Box from '@mui/system/Box';
import Logo from '../assets/logo.png';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import AuthenticationPage from '../pages/AuthenticationPage';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          display: 'block',
          alignItems: 'center',
          padding: '2%',
          boxShadow:`inset 0 -3em 3em rgb(51 113 180 / 50%), 0 0 0 2px white, 0.3em 0.3em 1em rgb(200 0 0 / 0%)`,
          overflow: 'clip',
        }}
      >
        <Box
          component="img"
          sx={{
            height: 'auto',
            width: '100%',
          }}
          alt="EASYSHOPIFY."
          src={Logo}
        />
        <Box
          sx={{
            p: 3,
            minWidth: { md: 350 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 0.5,
          }}
        >
          <Box
            component="span"
            sx={{ color: '#3F5BA0', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}
          >
            Welcome To EasyShopify
          </Box>

          {/* Seller section */}
          <Box sx={{ mt: 2, display: 'flex', gap:8, flexDirection: 'row', alignItems: 'center' }}>
            <Box sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>Seller</Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" onClick={() => navigate("/Sellerregister")}>Sign Up</Button>
              <Button variant="outlined" onClick={() => navigate("/Sellerlogin")}>Login</Button>
            </Box>
          </Box>

          {/* Customer section */}
          <Box sx={{ mt: 2, display: 'flex', gap:4, flexDirection: 'row', alignItems: 'center' }}>
            <Box sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>Customer</Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" onClick={() => navigate("/Customerregister")}>Sign Up</Button>
              <Button variant="outlined" onClick={() => navigate("/Customerlogin")}>Login</Button>
            </Box>
          </Box>

          {/* Admin section */}
          <Box sx={{ mt: 2, display: 'flex', gap:7, flexDirection: 'row', alignItems: 'center' }}>
            <Box sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>Admin</Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" onClick={() => navigate("/seller-login")}>Login</Button>
            </Box>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}

export default Home;
