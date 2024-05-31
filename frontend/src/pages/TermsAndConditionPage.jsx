import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const TermsAndConditionsPage = () => {
  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{textAlign: 'center', fontFamily: 'monospace', color: '#4D1C9C', fontWeight: 'bold', }}>
        Terms and Conditions
      </Typography>
      <Divider sx={{ backgroundColor: '#4D1C9C', marginBottom: '1rem' }} />
      <Box my={2}>
        <Typography variant="body1" paragraph>
          These terms and conditions outline the rules and regulations for the use of EasyShopify's Website, located at www.easyshopify.com.
        </Typography>
        <Typography variant="body1" paragraph>
          By accessing this website, we assume you accept these terms and conditions. Do not continue to use EasyShopify if you do not agree to take all of the terms and conditions stated on this page.
        </Typography>
        <Typography variant="body1" paragraph>
          The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions.
        </Typography>
        <Typography variant="body1" paragraph>
          "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves.
        </Typography>
        <Typography variant="body1" paragraph>
          All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands.
        </Typography>
        <Typography variant="body1" paragraph>
          Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
        </Typography>
      </Box>
      <Box bgcolor="#f9f9f9" p={2} mb={2}>
        <Typography variant="h6" gutterBottom>
          Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          We employ the use of cookies. By accessing EasyShopify, you agreed to use cookies in agreement with the EasyShopify's Privacy Policy.
        </Typography>
      </Box>
      {/* Add more sections as needed */}
    </Container>
  );
};

export default TermsAndConditionsPage;
