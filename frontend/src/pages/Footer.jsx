import React from 'react';
import { Box, Typography, Grid, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f3f3f3',
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto', // Push footer to the bottom of the page
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Customer Services
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <Link href="/contact-us" color="inherit">Contact Us</Link>
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <Link href="/faq" color="inherit">FAQ</Link>
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ marginTop: 1 }}>
            Phone: +1 123-456-7890
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Email: info@easyshopify.com
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Company
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <Link href="/about-us" color="inherit">About Us</Link>
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <Link href="/privacy-policy" color="inherit">Privacy Policy</Link>
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <Link href="/terms-condition" color="inherit">Terms & Conditions</Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Connect With Us
          </Typography>
          <IconButton href="https://www.facebook.com" aria-label="Facebook">
            <Facebook />
          </IconButton>
          <IconButton href="https://www.twitter.com" aria-label="Twitter">
            <Twitter />
          </IconButton>
          <IconButton href="https://www.instagram.com" aria-label="Instagram">
            <Instagram />
          </IconButton>
        </Grid>
      </Grid>
      <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
        © 2024 EasyShopify. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
