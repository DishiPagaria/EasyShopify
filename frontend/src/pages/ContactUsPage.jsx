import React from 'react';
import { Container, Typography, TextField, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const ContactUsPage = () => {
  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'monospace',  color: '#4D1C9C', fontWeight: 'bold', textAlign: 'center' }}>
        Contact Us
      </Typography>
      <Divider sx={{ backgroundColor: '#4D1C9C', marginBottom: '1rem' }} />
      <Grid container spacing={3}>
        <Grid xs={12} sm={6}>
          <Typography variant="body1" paragraph>
            Feel free to reach out to us with any questions or feedback.
          </Typography>
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              autoComplete="name"
              disabled
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              disabled
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="message"
              label="Message"
              name="message"
              multiline
              rows={4}
              disabled
            />
            <Button variant="contained" color="primary" fullWidth disabled>
              Send Message
            </Button>
          </form>
        </Grid>

        {/* Static Google Map Image */}
        <Grid xs={12} sm={6}>
          <Box mt={4} mb={4}>
            <img
              src="https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/07/googleMapsTricksHero.jpg"
              alt="Map Placeholder"
              width="100%"
              height="400"
              style={{ border: 0 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>

  );
};

export default ContactUsPage;
