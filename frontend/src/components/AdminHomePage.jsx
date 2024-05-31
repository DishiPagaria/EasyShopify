import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getCustomers } from "../redux/userHandle";
import { Grid } from '@mui/material';
import SalesCard from "../pages/seller/components/SalesCard";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const { currentUser, specificProductData, sellerProductData } = useSelector(state => state.user);
  const [totalSales, setTotalSales] = useState(0);
  const [ongoingOrdersCount, setOngoingOrdersCount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalSellers, setTotalSellers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    
     
      dispatch(getProducts());
      dispatch(getCustomers());
    
  }, [dispatch,]);

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
      setTotalProducts(sellerProductData.length);
    }
  }, [sellerProductData]);


  useEffect(() => {
    if (totalCustomers) {
      setTotalCustomers(totalCustomers);
    }
  }, [totalCustomers]);

  useEffect(() => {
    if (totalSellers) {
      setTotalSellers(totalSellers);
    }
  }, [totalSellers]);

  useEffect(() => {
    if (totalOrders) {
      setTotalOrders(totalOrders);
    }
  }, [totalOrders]);

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
        <SalesCard title="Total Products" total={`${totalProducts}`} color="info" icon={'ant-design:appstore-outlined'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Total Customers" total={`${totalCustomers}`} color="secondary" icon={'ant-design:usergroup-delete-outlined'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Total Sellers" total={`${totalSellers}`} color="primary" icon={'ant-design:safety-certificate-outlined'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Total Orders" total={`${totalOrders}`} color="success" icon={'ant-design:shoppingcart-outlined'} />
      </Grid>
    </Grid>
  );
};

export default AdminHomePage;
