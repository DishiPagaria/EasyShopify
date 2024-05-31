import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificProducts } from "../../../redux/userHandle";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, tableCellClasses, TableRow, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        borderRight: `1px solid ${theme.palette.common.white}`, 
        borderBottom: `1px solid ${theme.palette.common.white}`,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        borderRight: `1px solid ${theme.palette.common.white}`,
    },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    borderBottom: '2px solid black', // Add black border to table head
}));

const ViewCustomers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, specificProductData } = useSelector(state => state.user);
    const [customersData, setCustomersData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        dispatch(getSpecificProducts(currentUser._id, "getOrderedProductsBySeller"));
    }, [dispatch, currentUser._id]);

    useEffect(() => {
        if (!specificProductData || !specificProductData.orderedProductsByBuyer) {
            return;
        }
        const customersMap = new Map();

        specificProductData.orderedProductsByBuyer.forEach(product => {
            const { buyer, price } = product;

            if (!customersMap.has(buyer._id)) {
                customersMap.set(buyer._id, {
                    buyer: buyer.name,
                    buyer_id: buyer._id,
                    orders: 1,
                    cost: price.cost 
                });
            } else {
                const customer = customersMap.get(buyer._id);
                customersMap.set(buyer._id, {
                    ...customer,
                    orders: customer.orders + 1,
                    cost: customer.cost + price.cost
                });
            }
        });

        const customersArray = Array.from(customersMap.values()).map(customer => ({
            buyer: customer.buyer,
            buyer_id: customer.buyer_id,
            orders: customer.orders,
            cost: customer.cost
        }));

        setCustomersData(customersArray);
    }, [specificProductData]);

    const columns = [
        { id: 'buyer', label: 'Buyer Name' },
        { id: 'orders', label: 'Orders' },
        { id: 'cost', label: 'Total Cost' },
        { id: 'action', label: 'Action' }
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleViewCustomer = (buyerId) => {
        navigate(`/Seller/orders/customers/${buyerId}`);
    };

    return (
        <Box sx={{ mt: 4, px: 5 }}>
            <Typography variant="h5" gutterBottom>
                Customers List
            </Typography>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <StyledTableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align="left"
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {customersData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <StyledTableCell key={column.id} align="left">
                                                {column.id === 'action' ? (
                                                    <Button variant="contained" onClick={() => handleViewCustomer(row.buyer_id)}>
                                                        View Customer
                                                    </Button>
                                                ) : (
                                                    value
                                                )}
                                            </StyledTableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={customersData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default ViewCustomers;
