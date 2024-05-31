import { useDispatch, useSelector } from "react-redux";
import { getSpecificProducts } from "../../../redux/userHandle";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { LightPurpleButton, IndigoButton } from "../../../utils/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import { useNavigate } from "react-router-dom";

const OutForDeliverySection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentUser, specificProductData, responseSpecificProducts } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSpecificProducts(currentUser._id, "getOrderedProductsBySeller"));
    }, [dispatch, currentUser._id]);

    useEffect(() => {
        console.log(specificProductData); // Log specificProductData here
    }, [specificProductData]);

    const renderProducts = () => {
        if (!specificProductData || !specificProductData.orderedProductsByBuyer) {
            return null;
        }

        const productsColumns = [
            { id: 'sn', label: 'S.N' },
            { id: 'name', label: 'Product Name'},
            { id: 'quantity', label: 'Product Quantity' },
            { id: 'category', label: 'Product Category'},
            { id: 'subcategory', label: 'Product SubCategory'},
            { id: 'price', label: 'Product Price'},
            { id: 'customerName', label: 'Customer Name'}, 
        ];

        const productsRows = specificProductData.orderedProductsByBuyer.map((product, index) => ({
            sn: index + 1,
            name: product.productName,
            quantity: product.quantity,
            category: product.category,
            subcategory: product.subcategory,
            price: `₹${product.price.cost}`,
            customerName: product.buyer.name, 
            customerID: product.buyer._id,
            id: product._id,
            productID: product._id,
        }));

        const ProductsButtonHaver = ({ row }) => (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <LightPurpleButton
                    onClick={() => navigate("/Seller/orders/product/" + row.productID)}
                    sx={{ marginRight: '10px', fontSize: '12px' }}
                >
                    View Product
                </LightPurpleButton>
                <IndigoButton
                    onClick={() => navigate("/Seller/orders/customers/" + row.customerID)}
                    sx={{fontSize: '12px',}}
                >
                    Show Customer
                </IndigoButton>
            </Box>
        );

        return (
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Products List
                </Typography>
                <TableTemplate buttonHaver={ProductsButtonHaver} columns={productsColumns} rows={productsRows} />
            </Box>
        );
    };

    return (
        <Box sx={{ mt: 4 }}>
            {responseSpecificProducts ?
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <IndigoButton
                        variant="contained"
                        onClick={() => navigate("/Seller/addproduct")}
                    >
                        Add Products
                    </IndigoButton>
                </Box>
                :
                renderProducts()
            }
        </Box>
    );
};

export default OutForDeliverySection;
