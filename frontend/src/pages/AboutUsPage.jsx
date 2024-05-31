import React from 'react';
import { Container, Typography, Box, Paper, Grid, Divider } from '@mui/material';
import { styled } from '@mui/system';

// Styled Paper component for section containers
const StyledPaper = styled(Paper)({
    padding: '20px',
    marginBottom: '24px',
    textAlign: 'center',
});

// Styled image component with fixed height
const StyledImg = styled('img')({
    width: '100%',
    height: '100%', // Set height to 100% to match the height of the parent container
    objectFit: 'contain', // Ensure the image covers the entire container
    borderRadius: '8px',
});

// Styled box component for customer reviews
const ReviewBox = styled(Box)({
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
});

const AboutUsPage = () => {
    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Box textAlign="center">
            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'monospace', color: '#4D1C9C' , fontWeight: 'bold',}}>
                About EasyShopify
            </Typography>
            <Divider sx={{ backgroundColor: '#4D1C9C', marginBottom: '1rem' }} /> 
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    {/* Set height to match the height of the StyledPaper */}
                    <StyledImg src='https://bcassetcdn.com/social/rm0rm80vlt/preview.png' alt="About Us Image" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3}>
                        <Typography variant="body1" paragraph>
                            EasyShopify is your one-stop destination for all your shopping needs. We aim to provide the best shopping experience to our customers by offering a wide range of products at affordable prices.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Our mission is to simplify the online shopping experience and make it enjoyable for everyone. With a user-friendly interface and secure payment options, you can shop with confidence on EasyShopify.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Whether you're looking for electronics, fashion, home decor, or anything else, EasyShopify has got you covered. We partner with trusted sellers to bring you high-quality products that meet your needs and exceed your expectations.
                        </Typography>
                    </StyledPaper>
                </Grid>
            </Grid>
            <Box style={{ marginTop: '2rem' }}>
                <Typography variant="h5" gutterBottom>
                    Our Team
                </Typography>
                <Grid container spacing={2}>
                    {/* Team members */}
                    {[1, 2, 3].map((index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <StyledPaper elevation={3}>
                                <Box mb={2}>
                                    <StyledImg src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBZeBhS18YIjbXkorE_C-tpEicbleCt4zShbvrBO59AQ&s' alt={`Team Member ${index}`} />
                                </Box>
                                <Typography variant="h6" gutterBottom>
                                    Placeholder Name {index}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Placeholder Role
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Placeholder description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </Typography>
                            </StyledPaper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box style={{ marginTop: '2rem' }}>
                <Typography variant="h5" gutterBottom>
                    Customer Reviews
                </Typography>
                {/* Customer reviews */}
                {[1, 2, 3, 4].map((index) => (
                    <ReviewBox key={index}>
                        <Typography variant="body1" paragraph>
                            <b>Review {index}</b> :  "EasyShopify has made shopping so convenient for me! I love the wide range of products available and the fast delivery times."
                        </Typography>
                    </ReviewBox>
                ))}
            </Box>
        </Container>
    );
};

export default AboutUsPage;
