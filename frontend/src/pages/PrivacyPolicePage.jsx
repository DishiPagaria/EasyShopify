import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';

const PrivacyPolicyPage = () => {
    return (
        <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
           <Typography variant="h4" gutterBottom sx={{ fontFamily: 'monospace', textAlign: 'center', color: '#4D1C9C' , fontWeight: 'bold',}}>
                Privacy Policy
            </Typography>
            <Divider sx={{ backgroundColor: '#4D1C9C', marginBottom: '1rem' }} /> 
            <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px', borderRadius: '15px', background: '#f0f0f0' }}>
                <Typography variant="body1" paragraph>
                    <strong style={{ fontFamily: 'cursive', fontSize: '1.2rem' }}>At EasyShopify, we value your privacy and are committed to protecting your personal information.</strong> <br /> This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong style={{ fontFamily: 'cursive', fontSize: '1.2rem' }}>Information We Collect:</strong> <br />
                    We collect various types of information when you use our website, including personal data such as your name, email address, shipping address, and payment information. We also collect non-personal information such as your IP address, browser type, and device information.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong style={{ fontFamily: 'cursive', fontSize: '1.2rem' }}>How We Use Your Information:</strong> <br />
                    We use your information to process your orders, communicate with you about your purchases, and improve our website and services. We may also use your information for marketing purposes, such as sending you promotional offers and newsletters.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong style={{ fontFamily: 'cursive', fontSize: '1.2rem' }}>Sharing Your Information:</strong> <br />
                    We may share your information with third-party service providers who assist us in providing our services, such as payment processors and shipping companies. We may also share your information when required by law or to protect our rights and interests.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong style={{ fontFamily: 'cursive', fontSize: '1.2rem' }}>Security:</strong> <br />
                    We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong style={{ fontFamily: 'cursive', fontSize: '1.2rem' }}>Changes to This Policy:</strong> <br />
                    We may update this Privacy Policy from time to time, and any changes will be posted on this page. We encourage you to review this Privacy Policy periodically for any updates.
                </Typography>
                <Typography variant="body1" paragraph>
                    If you have any questions or concerns about our Privacy Policy, please contact us at <strong style={{ fontFamily: 'cursive', fontSize: '1.2rem' }}>privacy@easyshopify.com</strong>.
                </Typography>
            </Paper>
        </Container>
    );
};

export default PrivacyPolicyPage;
