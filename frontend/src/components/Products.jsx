import React, { useState, useEffect } from 'react';
import { Container, Grid, Pagination } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import { BasicButton } from '../utils/buttonStyles';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import { addStuff } from '../redux/userHandle';

const Products = ({ productData }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const itemsPerPage = 8;

  const { currentRole, responseSearch } = useSelector(state => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000); // Hide the popup after 3 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showPopup]);

  const handleAddToCart = (event, product) => {
    event.stopPropagation();
    dispatch(addToCart(product));
    setMessage("Item added to cart");
    setShowPopup(true);
  };

  const handleUpload = (event, product) => {
    event.stopPropagation();
    console.log(product);
    dispatch(addStuff("ProductCreate", product));
  };

  const messageHandler = (event) => {
    event.stopPropagation();
    setMessage("You have to login or register first")
    setShowPopup(true)
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (responseSearch) {
    return <div>Product not found</div>;
  }


  return (
    <>
      <ProductGrid container spacing={1}>
        {currentItems.map((data, index) => (
          <Grid item xs={12} sm={4} md={3}
            key={index}
            onClick={() => navigate("/product/view/" + data._id)}
            sx={{ cursor: "pointer" }}
          >
            <ProductContainer>
              <ProductImage src={data.productImage} />
              <ProductName>{data.productName}</ProductName>
              <PriceContainer>
                <PriceMrp>₹{data.price.mrp}</PriceMrp>
                <PriceCost>₹{data.price.cost}</PriceCost>
              </PriceContainer>
              <PriceDiscount>{data.price.discountPercent}% off</PriceDiscount>
              <AddToCart>
                {currentRole === "Customer" &&
                  <>
                    <BasicButton
                      onClick={(event) => handleAddToCart(event, data)}
                    >
                      Add To Cart
                    </BasicButton>
                  </>
                }
                {currentRole === "Shopcart" &&
                  <>
                    <BasicButton
                      onClick={(event) => handleUpload(event, data)}
                    >
                      Upload
                    </BasicButton>
                  </>
                }
                {currentRole === null &&
                  <>
                    <BasicButton
                      onClick={messageHandler}
                    >
                      Add To Cart
                    </BasicButton>
                  </>
                }

              </AddToCart>
            </ProductContainer>
          </Grid>
        ))}
      </ProductGrid>

      <Container sx={{ mt: 10, mb: 10, display: "flex", justifyContent: 'center', alignItems: "center" }}>
        <Pagination
          count={Math.ceil(productData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
        />
      </Container>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  )
};

export default Products;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 1px ;
  margin: 5% 5%;
  height: 350px;
  padding: 16px;
  background: white;
}
`;

const ProductGrid = styled(Grid)`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100%; 
  height: 200px; 
  object-fit: contain; 
  // margin-bottom: 8px;
`;

const ProductName = styled.p`
  font-weight: bold;
  text-align: center;
  margin: 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
  width: 100%; 
`;

const PriceContainer = styled.div`
  // margin-top: 8px;
  text-align: center;
`;

const PriceMrp = styled.p`
  text-decoration: line-through;
  color: #525050;
  display: inline-block; 
  margin-right: 10px;
`;

const PriceCost = styled.h3`
  margin-top: 8px;
  text-align: center;
  display: inline-block; 
`;

const PriceDiscount = styled.p`
  // margin-top: 8px;
  text-align: center;
  color: #4D1C9C;
`;

const AddToCart = styled.div`
  margin-top: 16px;
`;