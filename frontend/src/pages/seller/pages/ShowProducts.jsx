import React, { useEffect, useState } from 'react';
import { Container, Box, Grid } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { BasicButton, BrownButton, RedButton, IndigoButton } from '../../../utils/buttonStyles';
import { useNavigate } from 'react-router-dom';
import { deleteStuff, getProductsbySeller } from '../../../redux/userHandle';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate.jsx';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from '@mui/icons-material/Upload';
import AlertDialogSlide from '../../../components/AlertDialogSlide';
import Pagination from '@mui/material/Pagination';

const ShowProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, currentRole, loading, sellerProductData, responseSellerProducts } = useSelector(state => state.user);
  const sellerID = currentUser._id;

  const [dialog, setDialog] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    dispatch(getProductsbySeller(currentUser._id));
  }, [dispatch, currentUser._id]);

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteStuff(deleteID, address))
      .then(() => {
        dispatch(getProductsbySeller(currentUser._id));
      });
  };

  const deleteAllProducts = () => {
    deleteHandler(sellerID, "DeleteProducts");
  };

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Product',
      action: () => navigate("/Seller/addproduct")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Products',
      action: () => {
        setDialog("Do you want to delete all products ?");
        setShowDialog(true);
      }
    },
  ];

  const shopcartActions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Product',
      action: () => navigate("/Seller/addproduct")
    },
    {
      icon: <UploadIcon color="success" />, name: 'Upload New Product',
      action: () => navigate("/Seller/uploadproducts")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Products',
      action: () => {
        setDialog("Do you want to delete all products ?");
        setShowDialog(true);
      }
    },
  ];

  const totalPages = Math.ceil(sellerProductData.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sellerProductData.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      {loading ? <div>Loading...</div> :
        <>
          {responseSellerProducts ?
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <IndigoButton onClick={() => navigate("/Seller/addproduct")}>Add Product</IndigoButton>
              <br /><br />
              {currentRole === "Shopcart" &&
                <BrownButton onClick={() => navigate("/Seller/uploadproducts")}>Upload Product</BrownButton>}
            </Box>
            :
            <>
              {Array.isArray(currentProducts) && currentProducts.length > 0 &&
                <ProductGrid container spacing={1}>
                  {currentProducts.map((data, index) => (
                    <Grid item xs={12} sm={4} md={3} key={index}>
                      <ProductContainer>
                        <ProductImage src={data.productImage} />
                        <ProductName>{data.productName}</ProductName>
                        <PriceContainer>
                          <PriceMrp>₹{data.price.mrp}</PriceMrp>
                          <PriceCost>₹{data.price.cost}</PriceCost>
                        </PriceContainer>
                        <PriceDiscount>{data.price.discountPercent}% off</PriceDiscount>
                        <ButtonContainer>
                          <RedButton onClick={() => deleteHandler(data._id, "DeleteProduct")} sx={{ marginRight: '10px' }}>Delete</RedButton>
                          <BasicButton onClick={() => navigate("/Seller/products/product/" + data._id)}>View</BasicButton>
                        </ButtonContainer>
                      </ProductContainer>
                    </Grid>
                  ))}
                </ProductGrid>}

              <Container sx={{ mt: 10, mb: 10, display: "flex", justifyContent: 'center', alignItems: "center" }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="secondary"
                />
              </Container>

              {currentRole === "Shopcart" ?
                <SpeedDialTemplate actions={shopcartActions} />
                :
                <SpeedDialTemplate actions={actions} />}
            </>
          }
        </>
      }
      <AlertDialogSlide dialog={dialog} showDialog={showDialog} setShowDialog={setShowDialog} taskHandler={deleteAllProducts} />
    </>
  )
};

export default ShowProducts;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 1px ;
  margin: 5% 3%;
  // width: 250px;
  height: 400px; /* Fixed height for uniform card size */
  padding: 16px;
  background: white;
`;

const ProductGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px; 
  object-fit: contain; 
  margin-bottom: 8px;
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
  text-align: center;
`;

const PriceMrp = styled.p`
  text-decoration: line-through;
  color: #525050;
  display: inline-block; 
  margin-right: 10px;
`;

const PriceCost = styled.h3`
  display: inline-block; 
`;

const PriceDiscount = styled.p`
  text-align: center;
  color: #4D1C9C;
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;
