import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { bannerData } from '../utils/products';

const Banner = () => {
    const [swipeable, setSwipeable] = useState(false);

    useEffect(() => {
        // Enable swipeability after 0.5 seconds
        const timer = setTimeout(() => {
            setSwipeable(true);
        }, 500);

        // Clean up the timer
        return () => clearTimeout(timer);
    }, []);

    return (
        <StyledCarousel
            swipeable={swipeable}
            draggable={false}
            responsive={responsive}
            centerMode={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={10000}
            keyBoardControl={true}
            showDots={true} // Show dots
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px">

            {bannerData.map((image) => (
                <Image src={image.url} alt={image.alt} key={image._id} />
            ))}
        </StyledCarousel>
    );
};

export default Banner;

const StyledCarousel = styled(Carousel)(({ theme }) => ({
    // Customize carousel styles here
    '.carousel-container': {
        
    },
    '.custom-dot-list-style': {
        // Your dot list styles
    },
}));

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const Image = styled('img')(({ theme }) => ({
    width: '100%',
    height: 230,
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
        objectFit: 'cover',
        width: '100%',
        height: 180,
    },
}));
