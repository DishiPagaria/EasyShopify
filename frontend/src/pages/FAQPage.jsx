import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqData = [
    {
        question: 'How can I create an account?',
        answer: 'To create an account, click on the Sign Up button on the top right corner and fill in your details.'
    },
    {
        question: 'What is the return policy?',
        answer: 'You can return any item within 30 days of purchase. Please make sure the item is in its original condition.'
    },
    {
        question: 'How can I track my order?',
        answer: 'Once your order is shipped, you will receive an email with a tracking number and a link to track your order.'
    },
    {
        question: 'What payment methods are accepted?',
        answer: 'We accept all major credit cards, PayPal, and bank transfers.'
    },
    {
        question: 'How can I contact customer support?',
        answer: 'You can reach our customer support team via the Contact Us page or call us at 123-456-7890.'
    },
    {
        question: 'How do I change my password?',
        answer: 'To change your password, go to your account settings and select the "Change Password" option.'
    },
    {
        question: 'How do I update my personal details?',
        answer: 'You can update your personal details by going to your account settings and editing your profile information.'
    },
    {
        question: 'Can I cancel my order?',
        answer: 'Yes, you can cancel your order within 24 hours of placing it. Please contact customer support for assistance.'
    },
    {
        question: 'How do I apply a discount code?',
        answer: 'You can apply a discount code during the checkout process. Enter the code in the designated field and the discount will be applied to your order.'
    },
    {
        question: 'What should I do if I receive a damaged item?',
        answer: 'If you receive a damaged item, please contact our customer support immediately with your order details and a photo of the damaged item.'
    },
    {
        question: 'How can I subscribe to the newsletter?',
        answer: 'You can subscribe to our newsletter by entering your email address in the subscription box at the bottom of our homepage.'
    },
    {
        question: 'What are your shipping options?',
        answer: 'We offer standard, express, and next-day shipping options. Shipping costs and delivery times vary based on your location and selected shipping method.'
    },
    {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to many countries worldwide. International shipping costs and delivery times will be calculated at checkout.'
    },
    {
        question: 'Can I change my shipping address after placing an order?',
        answer: 'Yes, you can change your shipping address before the order is shipped. Please contact customer support for assistance.'
    },
    {
        question: 'How can I leave a review for a product?',
        answer: 'You can leave a review for a product by going to the product page and clicking on the "Write a Review" button.'
    }
];

const FAQPage = () => {
    return (
        <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'monospace', textAlign: 'center', color: '#4D1C9C', fontWeight: 'bold', }}>
                Frequently Asked Questions
            </Typography>
            <Divider sx={{ backgroundColor: '#4D1C9C', marginBottom: '1rem' }} />
            {faqData.map((faq, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography style={{ color: 'gray' }}>{faq.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
};

export default FAQPage;
