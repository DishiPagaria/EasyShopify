import { Divider, Box, Typography, Button, styled } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const Slide = ({ products, title }) => {
    const navigate = useNavigate();

    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                <ViewAllButton variant="contained" onClick={() => { navigate("/Products") }}>
                    View All
                </ViewAllButton>
            </Deal>
            <Divider />

            <StyledCarousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                centerMode={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={10000}
                keyBoardControl={true}
                showDots={false}
                containerClass="carousel-container"
                itemClass="carousel-item-padding"
            >
                {products.map((product, index) => (
                    <Link key={index} to={`/product/view/${product._id}`} style={{ textDecoration: 'none' }}>
                        <ProductCard>
                            <Image src={product.productImage} />
                            <CardContent>
                                <TitleText>{product.productName}</TitleText>
                                <ShopNameText>{product.seller.shopName}</ShopNameText>
                                <PriceContainer>
                                    <OriginalPrice>₹{product.price.mrp}</OriginalPrice>
                                    <DiscountedPrice>₹{product.price.cost}</DiscountedPrice>
                                </PriceContainer>
                                <PriceContainer>

                                <DiscountPercent>{product.price.discountPercent} % off</DiscountPercent>
                                </PriceContainer>
                            </CardContent>
                        </ProductCard>
                    </Link>
                ))}
            </StyledCarousel>
        </Component>
    );
};

export default Slide;

const StyledCarousel = styled(Carousel)(({ theme }) => ({
    '.carousel-container': {
        display: 'flex',
        justifyContent: 'center',
    },
    '.carousel-item-padding': {
        padding: '10px 25px', // Add horizontal padding to create a gap between the items
    },
}));

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const Component = styled(Box)`
    margin-top: 10px;
    background: #FFFFFF;
`;

const Deal = styled(Box)`
    display: flex;    
    padding: 15px 20px;
`;

const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    margin-right: 25px;
`;

const ViewAllButton = styled(Button)`
    margin-left: auto;
    background-color: #4d1c9c;
    border-radius: 2px;
    font-size: 13px;
    &:hover {
      background-color: #7a1ccb;
    }
`;

const ProductCard = styled(Box)`
    width: 250px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    }
`;

const Image = styled('img')`
    width: 100%;
    height: 150px; 
    object-fit: contain; 
    margin: 8px 0px;
`;

const CardContent = styled(Box)`
    padding: 16px;
`;

const TitleText = styled(Typography)`
    font-size: 16px;
    // margin-bottom: 8px;
    color: #212121;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
`;

const PriceContainer = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
`;

const OriginalPrice = styled(Typography)`
    text-decoration: line-through;
    color: #757575;
    margin-right: 5px;
`;

const DiscountedPrice = styled(Typography)`
    color: #212121;
    font-weight: bold;
    text-align: center;
`;

const DiscountPercent = styled(Typography)`
    color: green;
    font-weight: bold;
`;

const ShopNameText = styled(Typography)`
    font-size: 14px;
    color: #757575;
    text-align: center;
    margin-bottom: 8px;
`;
