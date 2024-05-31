import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Card, IconButton, Menu, MenuItem, Rating, TextField, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { addToCart, underControl } from '../../../redux/userSlice';
import { getProductDetails, updateStuff } from '../../../redux/userHandle';
import Popup from '../../../components/Popup';
import { generateRandomColor, timeAgo } from '../../../utils/helperFunctions';
import { GreenButton } from '../../../utils/buttonStyles';


const ViewOrder = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const productID = params.id;

    const { currentUser, currentRole, productDetails, loading, status, error, responseReview, responseDetails } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getProductDetails(productID));
    }, [productID, dispatch]);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const [anchorElMenu, setAnchorElMenu] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const handleRatingChange = (event, newRating) => {
        setRating(newRating);
    };

    const deleteHandler = (reviewId) => {
        const fields = { reviewId };

        dispatch(updateStuff(fields, productID, "deleteProductReview"));
        setMessage("Review deleted successfully.");
        setShowPopup(true);
    }

    const reviewer = currentUser && currentUser._id

    const handleSubmit = (event) => {
        event.preventDefault();

        if (rating === 0) {
            setMessage("Please select a rating.");
            setShowPopup(true);
        } else {
            const fields = { rating, comment, reviewer };
            dispatch(updateStuff(fields, productID, "addReview"));
            setRating(0);
            setComment('');
            setMessage("Review submitted successfully.");
            setShowPopup(true);
        }
    };

    useEffect(() => {
        if (status === "updated") {
            dispatch(getProductDetails(productID));
            dispatch(underControl());
        } else if (responseReview) {
            setMessage("You have already submitted a review for this product.");
            setShowPopup(true);
        } else if (error) {
            setMessage("Network Error");
            setShowPopup(true);
        }
    }, [dispatch, responseReview, productID, status, error]);

    const productExists = productDetails && productDetails.orders && productDetails.orders.length > 0;

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {
                        responseDetails ?
                            <div>Product not found</div>
                            :
                            <>
                                <ProductContainer>
                                    <ProductImage src={productDetails && productDetails.productImage} alt={productDetails && productDetails.productName} />
                                    <ProductInfo>
                                        <ProductName>{productDetails && productDetails.productName}</ProductName>
                                        <ShopName>{productDetails && productDetails.seller?.shopName}</ShopName>
                                        {productExists && (
                                            <PriceContainer>
                                                <PriceCost>Total Cost : ₹{productDetails.price.cost}</PriceCost>
                                                <OrderDateTime>
                                                    <b>Order Date:</b> {new Date(productDetails.orders[0].createdAt).toLocaleDateString('en-IN', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: '2-digit',
                                                    })} - {new Date(productDetails.orders[0].createdAt).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </OrderDateTime>
                                                <OrderStatus>
                                                    <b>Order Status: </b> {productDetails.orders[0].orderStatus}
                                                </OrderStatus>
                                            </PriceContainer>
                                        )}
                                        <ProductDetails>
                                            <ProductCategory><b><i>Category </i></b>: {productDetails && productDetails.category}</ProductCategory>
                                            <ProductCategory><b><i>Subcategory </i></b>: {productDetails && productDetails.subcategory}</ProductCategory>
                                        </ProductDetails>
                                        <ProductTagLine>
                                            <TagLineText>{productDetails && productDetails.tagline}</TagLineText>
                                        </ProductTagLine>
                                        {productExists && (
                                            <ShippingDetails>
                                                <b>Shipping Address : </b> {productDetails.orders[0].shippingData.address}, {productDetails.orders[0].shippingData.city}, {productDetails.orders[0].shippingData.state}, {productDetails.orders[0].shippingData.country} - {productDetails.orders[0].shippingData.pinCode}
                                            </ShippingDetails>
                                        )}
                                        <Description>{productDetails && productDetails.description}</Description>
                                    </ProductInfo>
                                </ProductContainer>

                                {
                                    currentRole === "Customer" &&
                                    <>
                                        <form onSubmit={handleSubmit}>
                                            <ReviewWritingContainer>
                                                <Box>
                                                    <Rating
                                                        name="rating"
                                                        value={rating}
                                                        onChange={handleRatingChange}
                                                        size="large"
                                                    />
                                                </Box>
                                                <TextField
                                                    label="Write a Review"
                                                    variant="standard"
                                                    multiline
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    sx={{ width: "90%" }}
                                                    required
                                                />
                                                <Box sx={{ textAlign: 'right', width: '90%' }}>
                                                    <GreenButton type="submit">
                                                        Submit
                                                    </GreenButton>
                                                </Box>
                                            </ReviewWritingContainer>
                                        </form>
                                    </>
                                }
                                <ReviewWritingContainer>
                                    <Typography variant="h4">Reviews</Typography>
                                </ReviewWritingContainer>

                                {productDetails.reviews && productDetails.reviews.length > 0 ? (
                                    <ReviewContainer>
                                        {productDetails.reviews.map((review, index) => (
                                            <ReviewCard key={index}>
                                                <ReviewCardDivision>
                                                    <Avatar sx={{ width: "60px", height: "60px", marginRight: "1rem", backgroundColor: generateRandomColor(review._id) }}>
                                                        {review.reviewer ? String(review.reviewer.name).charAt(0) : ''}
                                                    </Avatar>
                                                    <ReviewDetails>
                                                        <Typography variant="h6">{review.reviewer ? review.reviewer.name : 'Unknown'}</Typography>
                                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>

                                                            <Typography variant="body2">
                                                                {timeAgo(review.date)}
                                                            </Typography>
                                                        </div>
                                                        <Typography variant="subtitle1">Rating: {review.rating}</Typography>
                                                        <Typography variant="body1">{review.comment}</Typography>
                                                    </ReviewDetails>
                                                    {review.reviewer && review.reviewer._id === reviewer &&
                                                        <>
                                                            <IconButton onClick={handleOpenMenu} sx={{ width: "4rem", color: 'inherit', p: 0 }}>
                                                                <MoreVert sx={{ fontSize: "2rem" }} />
                                                            </IconButton>
                                                            <Menu
                                                                id="menu-appbar"
                                                                anchorEl={anchorElMenu}
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'left',
                                                                }}
                                                                keepMounted
                                                                transformOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'left',
                                                                }}
                                                                open={Boolean(anchorElMenu)}
                                                                onClose={handleCloseMenu}
                                                                onClick={handleCloseMenu}
                                                            >
                                                                <MenuItem onClick={() => {
                                                                    handleCloseMenu()
                                                                }}>
                                                                    <Typography textAlign="center">Edit</Typography>
                                                                </MenuItem>
                                                                <MenuItem onClick={() => {
                                                                    deleteHandler(review._id)
                                                                    handleCloseMenu()
                                                                }}>
                                                                    <Typography textAlign="center">Delete</Typography>
                                                                </MenuItem>
                                                            </Menu>
                                                        </>
                                                    }
                                                </ReviewCardDivision>
                                            </ReviewCard>
                                        ))}
                                    </ReviewContainer>
                                )
                                    :
                                    <ReviewWritingContainer>
                                        <Typography variant="h6">No Reviews Found. Add a review.</Typography>
                                    </ReviewWritingContainer>
                                }
                            </>
                    }
                </>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ViewOrder;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2% 10%;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const ProductImage = styled.img`
    max-width: 300px;
    margin-bottom: 20px;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 3%;
`;

const ProductName = styled.h1`
    font-size: 24px;
`;

const ShopName = styled.p`
    font-size: 16px;
    color: gray;
`;

const PriceContainer = styled.div`
    gap: 8px;
    margin-top: 8px;
`;

const PriceCost = styled.h3`
    margin-top: 8px;
`;

const OrderDateTime = styled.p`
    margin-top: 12px;
`;

const OrderStatus = styled.p`
    margin-top: 8px;
`;

const ShippingDetails = styled.div`
    margin-top: 3%;
`;

const Description = styled.p`
    margin-top: 16px;
    color: gray;
`;

const ProductDetails = styled.div`
    margin-top: 12px;
    display: flex;
`;

const ProductCategory = styled.p`
    margin-right: 4%;
`;

const ProductTagLine = styled.span`
    margin-top: 3%;
    margin-botton: 2%;
`;

const TagLineText = styled.span`
    background-color: #7A1CCB; /* Background color */
    color: white;
    padding: 1%;
    border-radius: 25%;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ReviewWritingContainer = styled.div`
    margin: 6rem;
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    flex-direction:column;
`;

const ReviewContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ReviewCard = styled(Card)`
  && {
    background-color: white;
    margin-bottom: 2rem;
    padding: 1rem;
  }
`;

const ReviewCardDivision = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewDetails = styled.div`
  flex: 1;
`;
