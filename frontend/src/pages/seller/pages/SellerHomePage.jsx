import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificProducts, getProductsbySeller } from "../../../redux/userHandle";
import { Grid } from '@mui/material';
import SalesCard from '../components/SalesCard';
import SalesChart from '../components/SalesChart';

const SellerHomePage = () => {
  const dispatch = useDispatch();
  const { currentUser, specificProductData, sellerProducts, sellerProductData } = useSelector(state => state.user);
  const [totalSales, setTotalSales] = useState(0);
  const [ongoingOrdersCount, setOngoingOrdersCount] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      dispatch(getSpecificProducts(currentUser._id, "getOrderedProductsBySeller"));
      dispatch(getProductsbySeller(currentUser._id));
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (specificProductData && specificProductData.orderedProductsByBuyer) {
      const products = specificProductData.orderedProductsByBuyer;

      const totalSales = products.reduce((acc, product) => acc + product.quantity, 0);
      setTotalSales(totalSales);

      const ongoingOrders = products.filter(product => product.orderStatus === "Processing").length;
      setOngoingOrdersCount(ongoingOrders);

      const earnings = products.reduce((acc, product) => acc + product.price.cost * product.quantity, 0);
      setTotalEarnings(earnings);
    }
  }, [specificProductData]);

  useEffect(() => {
    if (sellerProductData && Array.isArray(sellerProductData)) {
      setTotalProduct(sellerProductData.length);
    }
  }, [sellerProducts]);

  return (
    <Grid container spacing={3} sx={{ padding: "9px" }}>
      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Total Sales" total={`${totalSales}`} color='primary' icon={'ant-design:carry-out-filled'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Earning (₹)" total={`${totalEarnings}`} color="success" icon={'ant-design:Dollar-outlined'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Ongoing Orders" total={`${ongoingOrdersCount}`} color="warning" icon={'material-symbols:data-exploration'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Total Products" total={`${totalProduct}`} color="info" icon={'ant-design:appstore-outlined'} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <SalesChart type="line" />
      </Grid>
      <Grid item xs={12} lg={6}>
        <SalesChart type="bar" />
      </Grid>
    </Grid>
  );
};

export default SellerHomePage;
