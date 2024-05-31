import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography, Box, Card, CardContent, CardMedia, Container } from '@mui/material';
import { format } from 'date-fns';

const ShowCustomers = () => {
    const { specificProductData } = useSelector(state => state.user);
    const { id: customerID } = useParams();
    const [customerProducts, setCustomerProducts] = useState([]);
    const [customerName, setCustomerName] = useState('');

    useEffect(() => {
        if (specificProductData && specificProductData.orderedProductsByBuyer && specificProductData.orderedProductsByBuyer.length > 0) {
            const filteredProducts = specificProductData.orderedProductsByBuyer.filter(product => product.buyer._id === customerID);
            if (filteredProducts.length > 0) {
                setCustomerName(filteredProducts[0].buyer.name); 
            }
            console.log('Filtered Products:', filteredProducts);
            setCustomerProducts(filteredProducts);
        }
    }, [specificProductData, customerID]);

    return (
        <Container sx={{ margin: '2% auto' }}>
            <Typography variant="h5" gutterBottom>
                Products Purchased by : {customerName}
            </Typography>
            {customerProducts.map((product, index) => (
                <Box key={index} display="flex" flexDirection="row" alignItems="center" mb={2}>
                    <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', padding: '1%' }}>
                        <CardMedia
                            component="img"
                            image={product.productImage}
                            alt={product.productName}
                            sx={{ width: 140, height: 140, objectFit: 'contain' }}
                        />
                        <CardContent>
                            <Box ml={2}>
                                <Typography variant="h6" component="div">
                                    {product.productName}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Price: {product.price.cost}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Shipping Date: {product.shippingData.shippingDate}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Address: {product.shippingData.address}, {product.shippingData.city}, {product.shippingData.state}, {product.shippingData.country}, {product.shippingData.pinCode}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Payment Info: {product.paymentInfo.status}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Paid At: {format(new Date(product.paidAt), 'dd-MM-yyyy hh:mm a')}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Container>
    );
};

export default ShowCustomers;
